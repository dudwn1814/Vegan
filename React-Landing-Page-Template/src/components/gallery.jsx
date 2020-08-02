import React, { Component } from "react";
import Listpage from './lp';
import axios from 'axios';
import qs from 'querystring';
import Restaurant from '../pages/Restaurant';

export class Gallery extends Component {

  state = {
  };

  render() {
    const { itemlist} = this.props;
    const { area} = this.props;
    return (
      <div id="portfolio" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>{area}</h2>
            <p>
              채식전문의 경우 락토오버 이상이며, 채식지원의 경우 채식메뉴를 일부 지원해준다는 의미입니다.
            </p>
          </div>
          <div className="row">

              <Listpage restaurant_item = {itemlist} />

          </div>
        </div>
      </div>
    );
  }

  
}

export default Gallery;
