import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Gallery from '../components/gallery';
import Navigation from '../components/navigation';
import qs from 'querystring';

class Restaurant extends Component {

    state = {
        area: "",
        loading: false,
        ItemList: [],
    }
    
    loadItem = async () => {
        const query = new URLSearchParams(this.props.location.search);
        this.setState({
            area: query.get('area')
        })
        var AREA = query.get('area');
        axios.get("http://localhost:8080/loadingitems?area="+AREA)
            .then((response) => {
              var list = [];
              for (var i = 0; i < response.data.length; i++) {
                list.push(response.data[i]);
              }
    
              this.setState({
                loading: true,
                ItemList: list
              });
              // console.log(ItemList);
            })
            .catch(e => {
              console.error(e);
              this.setState({
                loading: false
              });
            });
      }

    

    componentDidMount() {
        this.loadItem();  // loadItem 호출
    }
    render() {
        const {area} = this.state;
        const {ItemList} = this.state;
        return (
            <Fragment>
                <Navigation />
                <Gallery itemlist ={ItemList} area = {area} />
            </Fragment>
            
        );
    }
}

export default Restaurant;