import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { API_URL } from "../helper/API";
import { currencyFormatter } from "../helper/currency";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
  AiFillYoutube
} from 'react-icons/ai';
import {
  Pagination,
  PaginationItem,
} from 'reactstrap';
import axios from 'axios';
import Button from "../component/Button";
import ControlledCarousel from './Carrousel';
import Header from '../component/Header';

class Home extends Component {
  state = {
    data: [],
    page: 1,
    limit: 3,
    categories: [],
    totaldata: 0,
  }

  componentDidMount() {
    axios
    .get(`${API_URL}/products?_expand=category&_page=${this.state.page}&_limit=${this.state.limit}`)
    .then((res) => {
      this.setState({
        data: res.data,
        totaldata: res.headers["x-total-count"],
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  componentDidUpdate(prevprops, prevstate) {
    if (this.state.page !== prevstate.page) {
      axios
        .get(
          `${API_URL}/products?_expand=category&_page=${this.state.page}&_limit=${this.state.limit}`
        )
        .then((res) => {
          this.setState({
            data: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  renderPaging = () => {
    let { limit, totaldata, page } = this.state;
    let berapaPaging = Math.ceil(totaldata / limit);
    console.log(berapaPaging)
    let paging = [];
    for (let i = 0; i < berapaPaging; i++) {
      if (i + 1 === page) {
        paging.push(
          <PaginationItem active className="mb-5 mr-1 ml-1">
            <button
              className="btn d-flex justify-content-center align-items-center"
              style={{
                width: '27px',
                height: '27px',
                backgroundColor: 'rgb(50, 50, 50)',
                borderRadius: '50%',
                fontSize: '13px',
                color: 'white',
              }}
            >{i + 1}</button>
          </PaginationItem>
        );
      } else {
        paging.push(
          <PaginationItem onClick={() => this.setState({ page: (i + 1) })} className="mb-5 ml-1 mr-1">
            <button
              className="btn"
              style={{
                borderRadius: '50%',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >{i + 1}</button>
          </PaginationItem>
        );
      }
    }
    return paging;
  };

  renderProducts = () => {
    return this.state.data.map((val, index) => {
      return (
        <div key={index} className="col-md-4 p-2">
          <Link to={{ pathname: `/product/${val.id}`, state: { product: val } }} style={{ textDecoration: 'none', color: 'black' }}>
            <Card style={{ borderRadius: "10px", border: 'none' }} className="shadow">
              <CardImg
                width="200px"
                height="420px"
                src={val.img}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle tag="p" style={{ fontSize: "28px", marginBottom: "15px", fontWeight: "500" }}>{val.name}</CardTitle>
                <CardSubtitle tag="p" style={{ fontSize: "20px", color: "rgb(50, 50, 50)", fontWeight: "500" }} className="mb-2">
                  {currencyFormatter(val.price)}
                </CardSubtitle>
              </CardBody>
            </Card>
          </Link>
        </div>
      );
    });
  };

  render() {
    return(
      <div>
        <Header />
        <ControlledCarousel />

        <div
          className="row"
          style={{ margin: '100px 80px 0 58px' }}
        >
          <h1 className="col-11 ml-0">Product AMP</h1>
          <Button className="col-1">See all</Button>
        </div>
        
        <div
          className="row"
          style={{ margin: '60px', marginTop: '30px' }}
        > {this.renderProducts()}
        </div>
        <div className="d-flex justify-content-center">
          <Pagination>{this.renderPaging()}</Pagination>
        </div>


        <div className='row mr-0' style={{ marginTop: '160px', backgroundColor: 'rgb(50 , 50, 50)', padding: '50px 60px 70px 60px' }}>
          <div
            className='col-8 row'
            style={{
              fontSize: '14px',
              color: 'white'
            }}>
            <div >
              <ul style={{ listStyleType: 'none', fontWeight: '600', marginRight: '50px' }} >
                <li className='pb-3'>FIND A STORE</li>
                <li className='pb-3'>BECOME A MEMBER</li>
                <li className='pb-3'>SIGN UP FOR EMAIL</li>
                <li className='pb-3'>STUDENT DISCOUNTS</li>
              </ul>
            </div>
            <div>
              <ul style={{ listStyleType: 'none' }}>
                <li className='pb-3' style={{ fontWeight: '600' }}>GET HELP</li>
                <li className='pb-3'>Order Status</li>
                <li className='pb-3'>Delivery</li>
                <li className='pb-3'>Returns</li>
              </ul>
            </div>
            <div>
              <ul style={{ listStyleType: 'none', }}>
                <li className='pb-3' style={{ fontWeight: '600' }}>ABOUT AMP</li>
                <li className='pb-3'>News</li>
                <li className='pb-3'>Careers</li>
                <li className='pb-3'>Investors</li>
              </ul>
            </div>
          </div>
          <div className='col-4' style={{ color: 'white', fontSize: '40px', textAlign: 'end' }}>
            <AiFillFacebook className='mr-4' />
            <AiFillInstagram className='mr-4' />
            <AiFillTwitterSquare className='mr-4' />
            <AiFillYoutube style={{ marginRight: '0px' }} />
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

export default connect(MaptstatetoProps)(Home);