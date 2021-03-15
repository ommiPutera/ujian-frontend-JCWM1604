import React, { Component } from "react";
import { API_URL } from "./../helper/API";
import { currencyFormatter } from "../helper/currency";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AiFillStar } from 'react-icons/ai'
import { GoPrimitiveDot } from 'react-icons/go'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { CartAction } from '../redux/actions'
import Button from '../component/Button';
import swal from 'sweetalert';
import Login from '../component/Login';
import Header from '../component/Header';
import axios from "axios";
import './style/productDetail.css';

class ProductDetail extends Component {
  state = {
    product: {},
    loading: true,
    isLogin: false,
    qty: 1,
    hasil: 0,
    warnaKurang: 'rgb(100, 100, 100)',
    hargaChange: 0,
    stok: 0,
  };

  componentDidMount() {
    var idprod = this.props.match.params.idprod;
    var data = this.props.location.state;
    if (!data) {
      axios
        .get(`${API_URL}/products/${idprod}?_expand=category`)
        .then((res) => {
          this.setState({ product: res.data });
          console.log(res)
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this.setState({ product: data.product, loading: false });
    }
  }

  onQtyClick = (operator) => {
    let hargaTambah = this.state.product.price * (this.state.qty + 1);
    let hargaKurang = hargaTambah - (this.state.product.price * 2);
    if (operator === "tambah") {
      let hasil = this.state.qty + 1
      if (hasil > this.state.product.stock) {
        alert('melebihi stok')
      }
      this.setState({ qty: this.state.qty + 1, warnaKurang: 'green', hargaChange: hargaTambah });
    }
    if (operator === "kurang") {
      this.setState({ hargaChange: hargaKurang })
      this.state.hasil = this.state.qty;
      if (this.state.hasil > 1) {
        this.setState({ qty: this.state.qty - 1 });
      }
      if (this.state.qty - 1 == 1) {
        this.setState({ warnaKurang: 'rgb(100, 100, 100)' })
      }
    }
  };

  onAddToCartClick = () => {
    if (
      this.props.dataUser.role === "admin" ||
      this.props.dataUser.islogin === false
    ) {
      swal({
        title: "Anda belum login",
        icon: "warning",
      })
      this.setState({ isLogin: !this.state.isLogin })
    } else {
      console.log(this.props.dataUser.islogin)
      let id = this.props.dataUser.id;
      let idprod = this.state.product.id;
      let stok = this.state.product.stok;
      console.log(idprod)
      console.log(id)
      axios
        .get(`${API_URL}/users/${id}`)
        .then((res) => {
          var cart = res.data.cart;
          console.log(cart)
          let findIdx = cart.findIndex((val) => val.id == idprod);
          // console.log(findIdx)
          // console.log(id)
          if (findIdx < 0) {
            let data = {
              ...this.state.product,
              qty: this.state.qty,
            };
            cart.push(data);
            axios
              .patch(`${API_URL}/users/${id}`, { cart: cart })
              .then((res1) => {
                console.log(res1.data);
                this.props.CartAction(res1.data.cart);
                swal({
                  title: "berhasil",
                  icon: "success",
                })
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            let qtyakhir = cart[findIdx].qty + this.state.qty; // this.state.qty adalah quantity pertama, this.state.qty adalah quantity terakhir 
            var qtyablebuy = stok - cart[findIdx].qty;
            // console.log(this.state.qty)
            // console.log(cart[findIdx].qty)
            if (qtyablebuy == 0) {
              swal({
                title: "stok telah habis!",
                icon: "warning",
              })
            } else if (qtyakhir > stok) {
              swal({
                title: `barang dicart melebihi stok barang yang bisa dibeli hanya ${qtyablebuy}`,
                icon: "warning",
              })
            } else {
              cart[findIdx].qty = qtyakhir;
              axios
                .patch(`${API_URL}/users/${id}`, { cart: cart })
                .then((res1) => {
                  console.log(res1.data);
                  this.props.CartAction(res1.data.cart);
                  swal({
                    title: "product berhasil ditambahkan ",
                    icon: "success",
                  })
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render(){
    return(
      <div>
        <Header />

        {this.state.isLogin ? (<Login />) : (null)}
        <div className="container">
          <div className="bg-transparent">
            <Breadcrumb className="mt-2 mb-2">
              <BreadcrumbItem>
                <Link to="/" style={{ color: 'rgb(50, 50, 50)', textDecoration: 'none' }}>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to="/kategori" style={{ color: 'rgb(50, 50, 50)', textDecoration: 'none' }}>Kategori</Link>
              </BreadcrumbItem>
              <BreadcrumbItem style={{ color: 'rgb(150, 150, 150)' }} active>{this.state.product.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row mt-3">
            <div className="col-md-5">
              <img
                src={this.state.product.img}
                alt="product"
                width="100%"
              />
            </div>
            <div className="col-md-7 pl-5">
              <div style={{ fontWeight: '700', fontSize: '20px' }}>{this.state.product.name}</div>
              <div className="d-flex pb-1">
                <span style={{ fontSize: '14px' }}>Terjual 0 <GoPrimitiveDot className="mr-2 ml-2" style={{ color: 'rgb(150, 150, 150)', fontSize: '10px' }} /> 4.8 <AiFillStar style={{ color: "green" }} />  </span>
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '32px', color: 'rgb(50, 50, 50)' }}> {currencyFormatter(this.state.qty == 1 ? this.state.product.price : this.state.hargaChange)} </div>
                <h2 style={{ fontSize: '14px', marginTop: '15px', color: 'rgb(100, 100, 100)' }}>Berat: </h2>
                <h2 style={{ fontSize: '14px', color: 'rgb(100, 100, 100)' }}>Stok: {this.state.product.stock}</h2>
                <h2 style={{ fontSize: '14px', color: 'rgb(100, 100, 100)' }}>Kategori: </h2>
                <h2 style={{ fontSize: '17px', fontWeight: '600', marginTop: '20px' }}>Deskripsi Produk</h2>
                <p style={{ fontSize: '14px' }}>{this.state.product.description}</p>
              </div>
              <div className="d-flex">
                <div style={{ fontSize: '25px', cursor: 'pointer', color: this.state.warnaKurang }}>
                  <AiOutlineMinusCircle onClick={() => this.onQtyClick("kurang")} />
                </div>

                <div className="d-flex justify-content-center align-items-center mr-3 ml-3 mt-1" style={{ fontSize: 20 }}>
                  {this.state.qty}
                </div>

                <div style={{ fontSize: '25px', cursor: 'pointer', color: 'green' }}>
                  <AiOutlinePlusCircle onClick={() => this.onQtyClick("tambah")} />
                </div>
                <div style={{ marginTop: '10px', marginLeft: '10px', fontWeight: '600' }}>
                  Stok: {this.state.product.stock}
                </div>
              </div>
              <div className="my-3">
                <Button className="w-50 py-2" onClick={this.onAddToCartClick}>
                  Add to Cart
                </Button>
              </div>
            </div>
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
export default connect(MaptstatetoProps, { CartAction })(ProductDetail);