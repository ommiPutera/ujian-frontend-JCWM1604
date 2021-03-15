import React, { Component } from 'react';
import {
  API_URL,
  currencyFormatter,
  formatDate
} from "../helper";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Header from "../component/Header";
import swal from 'sweetalert';
import axios from "axios";

class Transaction extends Component {
  state = {
    banks: [],
    pilihanId: 0,
    modal: false,
    modalDetail: false,
    bukti: "",
    transaction: [],
    indexdetail: -1,
    products: [],
  };

  async componentDidMount() {
    try {
      var res = await axios.get(`${API_URL}/banks`);
      var res1 = await axios.get(`${API_URL}/transaction?userId=${this.props.dataUser.id}`);
      var res2 = await axios.get(`${API_URL}/products`);
      console.log(res1)
      console.log(this.props.dataUser.id)
      this.setState({
        banks: res.data,
        transaction: res1.data,
        products: res2.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  toggledetail = () => {
    this.setState({ modalDetail: !this.state.modalDetail });
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onDetailClick = (index) => {
    this.setState({ indexdetail: index, modalDetail: true });
  };
  
  rendertotalDetail = () => {
    let total = 0;
    this.state.transaction[this.state.indexdetail].products.forEach((val) => {
      total += val.price * val.qty;
    });
    console.log(total)
    return total;
  };

  renderDetailProduct() {
    var indexdetail = this.state.indexdetail;
    console.log(indexdetail)
    return this.state.transaction[indexdetail].products.map((val, index) => {
      return (
        <tr key={index}>
          <th style={{fontWeight: '500'}}>{val.name}</th>
          <th style={{fontWeight: '500'}}>{currencyFormatter(val.price)}</th>
          <th style={{fontWeight: '500'}}>{val.qty}</th>
          <th style={{fontWeight: '500'}}>{currencyFormatter(val.qty * val.price)}</th>
        </tr>
      )
    })
  };

  renderRadio = () => {
    return this.state.banks.map((val, index) => {
      return (
        <label key={index} className="mx-2">
          <input
            type="radio"
            name="pilihanId"
            onChange={this.onInputChange}
            checked={this.state.pilihanId === val.id}
            value={val.id}
            className="mr-2"
          />
          {val.nama} : {val.norek}
        </label>
      );
    });
  };

  renderHistory = () => {
    return this.state.transaction.map((val, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{formatDate(val.tanggal)}</td>
          <td>{val.status}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.onBatalClick(index)}
              disabled={val.status === "batal"}
            >
              Batal
            </button>
          </td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => this.onDetailClick(index)}
            // disabled={val.status === "batal"}
            >
              Detail
            </button>
          </td>
        </tr>
      );
    });
  };

  onBatalClick = async (index) => {
    let productsAdmin = this.state.products;
    console.log(productsAdmin);
    let producthistory = this.state.transaction[index].products;
    try {
      // edit stok productadmin
      for (let i = 0; i < producthistory.length; i++) {
        for (let j = 0; j < productsAdmin.length; j++) {
          if (producthistory[i].id === productsAdmin[j].id) {
            let stocknew = producthistory[i].qty + productsAdmin[j].stock;
            await axios.patch(`${API_URL}/products/${productsAdmin[j].id}`, {
              stock: stocknew,
            });
          }
        }
      }
      // edit transaksi
      await axios.patch(
        `${API_URL}/transaction/${this.state.transaction[index].id}`,
        {
          status: "batal",
        }
      );
      // refresh data
      var res1 = await axios.get(`${API_URL}/transaction?userId=${this.props.dataUser.id}`);
      swal({
        title: "Produk berhasil dibatalkan",
        icon: "success",
      });
      console.log('masok')
      this.setState({ transaction: res1.data });
    } catch (error) {
      console.log(error);
      toast.error("error server");
    }
  };

  render(){
    return(
      <div>
        {this.state.indexdetail < 0 ? null : (
          <Modal
            size="lg"
            centered
            isOpen={this.state.modalDetail}
            toggle={this.toggledetail}
          >
            <ModalHeader toggle={this.toggledetail}>
              Transaction Detail
            </ModalHeader>
            <ModalBody>
              <Table>
                <thead>
                  <tr>
                    <th>nama</th>
                    <th>harga</th>
                    <th>qty</th>
                    <th>subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderDetailProduct()}
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Total</th>
                    <th>{currencyFormatter(this.rendertotalDetail())}</th>
                  </tr>
                </tbody>
              </Table>
              <input
                type="text"
                className="form-control my-2"
                placeholder="input bukti"
                name="bukti"
                value={this.state.bukti}
                onChange={this.onInputChange}
              />
              <div className="my-2">{this.renderRadio()}</div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-success">Bayar</button>
              <button className="btn btn-primary"  onClick={this.toggledetail}>tutup</button>
            </ModalFooter>
          </Modal>
        )}
        <Header />
        <div className="container mt-5">
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Tanggal</th>
                <th>status</th>
                <th>batal</th>
                <th>detail</th>
              </tr>
            </thead>
            <tbody>{this.renderHistory()}</tbody>
          </Table>
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
export default connect(MaptstatetoProps)(Transaction);