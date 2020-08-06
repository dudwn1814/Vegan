import React, { Component } from "react";
import Listpage from './lp';
import axios from 'axios';
import qs from 'querystring';
import Restaurant from '../pages/Restaurant';

export class Gallery extends Component {

  state = {
    keyword: '',
  };


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    
  }

  render() {
    const {itemlist} = this.props;
    const {area} = this.props;
    const {keyword} = this.state;
    console.log(this.props.dataFromParent)
    
    const filteredList = itemlist.filter(
      info => info.name.indexOf(keyword) !== -1
    )
    
    return (
      <div id="portfolio" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>{area}</h2>
            <div style={{margin: '10px'}}>
              채식전문 : 락토오버 이상
            </div>
            <div style={{margin: '10px'}}>
              채식지원 : 채식메뉴를 일부 지원함
            </div> 	🔍&nbsp;
            <input 
              placeholder="    식당 이름을 검색하세요"
              onChange={this.handleChange}
              id="keyword"
              name="keyword"
              value={keyword}
              style = {{marginTop: '10px', borderRadius: '15px', padding: '3px 8px', width: '200px', outline: 'none'}}
            />
          </div>
          <div className="row">
            <Listpage dataFromParent={this.props.dataFromParent} restaurant_item = {filteredList} />
          </div>
        </div>
      </div>
    );
  }

  
}

export default Gallery;
