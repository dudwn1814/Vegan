import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Gallery from '../components/gallery';
import Navigation from '../components/navigation';

class Restaurant extends Component {

    state = {
        area: "",
        loading: false,
        ItemList: [],
        title: "전국"
    }
    
    loadItem = async () => {
        const query = new URLSearchParams(this.props.location.search);
        this.setState({
            area: query.get('area')
        })
        this.setState({
          title: '전국'
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
        const {title} = this.state;
        const {ItemList} = this.state;
        if (area === '') {
          return (
            <Fragment>
                <Navigation />
                <Gallery itemlist ={ItemList} area = {title} />
            </Fragment>
            
        );
        }
        else {
          return (
            <Fragment>
                <Navigation />
                <Gallery itemlist ={ItemList} area = {area} />
            </Fragment>
            
        );
        }
    }
}

export default Restaurant;