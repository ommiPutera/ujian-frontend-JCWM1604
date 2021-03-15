import React, { Component } from "react";
import { Table, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { API_URL, currencyFormatter } from "../helper";
import { CartAction } from "../redux/actions";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from "react-router-dom";
// import './style/User_Cart.css'
import withReactContent from "sweetalert2-react-content";
import Header from "../component/Header";
import axios from "axios";
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import Button from '../component/Button';
const Myswal = withReactContent(Swal);

class Cart extends Component {
  state = {
    modal: false,
    stokadmin: [],
    product: [],
  }

  
  componentDidMount() {
    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        this.setState({ product: res.data });
      })
      .catch((err) => {
        console.log(err)
      })
  }

  renderCart = () => {
    return this.props.dataUser.cart.map((val, index) => {
      return (
        <tr key={index} style={{ fontWeight: '500', fontSize: '13px' }}>
          <td width="40px" style={{ verticalAlign: "middle", textAlign: 'center' }} >{index + 1}</td>
          <td width="180px" style={{ verticalAlign: "middle", textAlign: 'center' }}>{val.name}</td>
          <td width="80px" style={{ verticalAlign: "middle", textAlign: 'center' }}>
            <img src={val.img} alt={val.name} width="80px" height="80px" />
          </td>
          <td width="120px" style={{ verticalAlign: "middle", textAlign: 'center' }}>{currencyFormatter(val.price)}</td>
          <td width="160px" style={{ verticalAlign: "middle", paddingLeft: '50px' }}>
            <div className="d-flex row">
              <div style={{ fontSize: '25px', cursor: 'pointer', color: 'red' }} >
                <AiOutlineMinusCircle
                  onClick={() => this.onMinusClick(index)}
                  disabled={val.qty <= 1 ? true : false}
                />
              </div>
              <span className="ml-3 mr-3" style={{ paddingTop: '13px' }}> {val.qty} </span>
              <div style={{ fontSize: '25px', cursor: 'pointer', color: 'green' }}>
                <AiOutlinePlusCircle
                  onClick={() => this.onPlusClick(index)}
                />
              </div>
            </div>
          </td>
          <td width="150px" style={{ verticalAlign: "middle", textAlign: 'center' }}>{currencyFormatter(val.price * val.qty)}</td>
          <td style={{ border: 'none', verticalAlign: "middle", textAlign: 'center' }}>
            <span
              style={{ fontSize: '18px', cursor: 'pointer' }}
              onClick={() => this.onDeleteClick(index)}
            >
              <FiTrash2 />
            </span>
          </td>
        </tr>
      );
    })
  }

  
  rendertotal = () => {
    let total = 0;
    this.props.dataUser.cart.forEach((val) => {
      total += val.price * val.qty;
    });
    return total;
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderRadio = () => {
    return this.state.banks.map((val, index) => {
      return (
        <label key={index} className="mx-2">
          <input
            type="radio"
            name="pilihanId"
            onChange={this.onInputChange}
            checked={this.state.pilihanId == val.id}
            value={val.id}
            className="mr-2"
          />
          {val.nama} : {val.norek}
        </label>
      );
    });
  };

  
  onCheckoutClick = async () => {
    let iduser = this.props.dataUser.id;
    let data = {
      userId: this.props.dataUser.id,
      tanggal: new Date(),
      status: "belum bayar",
      products: this.props.dataUser.cart,
      bankId: 0,
      bukti: "",
    };
    await axios.post(`${API_URL}/transaction`, data).then((res) => {
      console.log(res)
    })

    let cart = this.props.dataUser.cart;
    var Productsadmin = this.state.product;
    console.log(Productsadmin)
    console.log(cart)
    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < Productsadmin.length; j++) {
        if (cart[i].id === Productsadmin[j].id) {
          let stokakhir = Productsadmin[j].stock - cart[i].qty;
          await axios.patch(`${API_URL}/products/${Productsadmin[j].id}`, {
            stok: stokakhir,
          });
        }
      }
    }
    var res1 = await axios.patch(`${API_URL}/users/${iduser}`, { cart: [] });
    this.props.CartAction(res1.data.cart);
    this.setState({ modal: false });
  };

  
  onDeleteClick = (index) => {
    let cart = this.props.dataUser.cart;
    Myswal.fire({
      title: `Are you sure wanna Delete ${cart[index].name} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cart.splice(index, 1);
        let iduser = this.props.dataUser.id;
        axios
          .patch(`${API_URL}/users/${iduser}`, { cart: cart })
          .then((res) => {
            this.props.CartAction(res.data.cart);
            Myswal.fire("Deleted!", "Your Cart has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  onPlusClick = (index) => {
    let cart = this.props.dataUser.cart;
    let idprod = cart[index].id;
    axios
      .get(`${API_URL}/products/${idprod}`)
      .then((res) => {
        let stok = res.data.stock;
        let qty = cart[index].qty;
        let hasil = qty + 1;
        if (hasil > stok) {
          alert("qty melebihi " + stok);
        } else {
          cart[index].qty = hasil;
          let iduser = this.props.dataUser.id;
          axios
            .patch(`${API_URL}/users/${iduser}`, { cart: cart })
            .then((res) => {
              this.props.CartAction(res.data.cart);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onMinusClick = (index) => {
    let cart = this.props.dataUser.cart;
    let hasil = cart[index].qty - 1;
    console.log(hasil)
    console.log(cart)
    if (hasil < 1) {
      alert("delete saja jika qty ingin 0");
    } else {
      cart[index].qty = cart[index].qty - 1;
      let iduser = this.props.dataUser.id;
      axios
        .patch(`${API_URL}/users/${iduser}`, { cart: cart })
        .then((res) => {
          this.props.CartAction(res.data.cart);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  render() {
    return (
      <div>
        <Modal centered isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> Checkout </ModalHeader>
          <ModalBody>
            Are You Sure Wanna Checkout ?
            </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={this.onCheckoutClick}>
              checkout
            </button>
            <button className="btn btn-danger" onClick={this.toggle}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
        <Header />
        <div className="d-flex row" style={{ margin: '60px 60px 0 110px ' }}>
          <div className="col-8" >
            <Table responsive>
              <thead style={{ textAlign: 'center' }}>
                <tr style={{ color: 'rgb(100, 100, 100)', fontSize: '14px' }}>
                  {this.props.dataUser.cart.length ? (
                    <>
                      <th className='thead'>No.</th>
                      <th className='thead'>Nama</th>
                      <th className='thead'>Image</th>
                      <th className='thead'>Harga</th>
                      <th className='thead'>qty</th>
                      <th className='thead'>subtotal</th>
                    </>
                  ) : (
                    <>
                      <h2 style={{ marginTop: '120px' }}>Cart Kosong..</h2>
                      Silahkan tambahkan product terlebih dahulu.
                      <Link to='/' className='ml-1'>
                        Home
                      </Link>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {this.renderCart()}
              </tbody>
            </Table>
          </div>
          <div className="mr-3 ml-4"></div>
          <div className="col-3 shadow" style={{ padding: '30px 40px 30px 40px', borderRadius: '15px' }}>
            <div className="d-flex row" style={{ fontSize: '23px', fontWeight: '700', borderBottom: '1px solid rgb(200, 200, 200)', marginBottom: '20px' }}>
              <p>Shopping summary</p>
            </div>
            <div className='d-flex row pb-5' style={{ fontSize: '15px', color: 'rgb(140, 140, 140)', borderBottom: '1px solid rgb(200, 200, 200)' }}>
              <p className="col-5">Total price</p>
              <p className="col-7" style={{ textAlign: 'end' }}>{currencyFormatter(this.rendertotal())}</p>
            </div>
            <div className='d-flex row mt-3 mb-2' style={{ fontSize: '20px', fontWeight: '700' }}>
              <p className="col-4">Total</p>
              <p className="col-8" style={{ textAlign: 'end' }}>{currencyFormatter(this.rendertotal())}</p>
            </div>
            <Button
              className='col-12'
              onClick={() => this.setState({ modal: true })}
            >Checkout</Button>
          </div>
        </div>
      </div>
    )
  }
}

const MaptstatetoProps = (state) => {
  return {
    dataUser: state.Auth,
  };
};

export default connect(MaptstatetoProps, { CartAction })(Cart);