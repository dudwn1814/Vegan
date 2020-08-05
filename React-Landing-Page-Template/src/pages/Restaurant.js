import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Gallery from '../components/gallery';
import Navigation from '../components/navigation';
import { Link } from 'react-router-dom';

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
    
    componentWillMount() {
        
        this.loadItem();
          // loadItem 호출
    }
    render() {
      const query = new URLSearchParams(this.props.location.search);
        const {area} = this.state;
        const {title} = this.state;
        const {ItemList} = this.state;
        
        if (area === '') {
          return (
            <Fragment >
                <Navigation dataFromParent={query.get('name')}/>
                <button  style={{backgroundColor: '#4CAF50', border: '1px solid #4CAF50', position: 'absolute', right: '370px', top: '200px', width: '130px',  boxShadow: 'none', fontSize: '15px', borderRadius: '10px', padding: '5px', fontWeight: 'bold', outline: 'none',  marginTop: "100px"}}> 
                    <Link style={{ textDecoration: 'none', color: 'white'}} to={{
                         pathname : "/restaurantadd",
                        state : query.get('name')}}>식당 추가</Link>
                </button>
                <Gallery itemlist ={ItemList} area = {title} dataFromParent={query.get('name')}/>
                
            </Fragment>
            
        );
        }
        else {
          return (
            <Fragment>
                <Navigation dataFromParent={query.get('name')}/>
                <button  style={{backgroundColor: '#4CAF50', border: '1px solid #4CAF50', position: 'absolute', right: '370px', top: '200px',  width: '130px',  boxShadow: 'none', fontSize: '15px', borderRadius: '10px', padding: '5px', fontWeight: 'bold', outline: 'none',  marginTop: "100px"}}> 
                    <Link style={{ textDecoration: 'none', color: 'white'}} to={{
                         pathname : "/restaurantadd",
                        state : query.get('name')}}>식당 추가</Link>
                </button>
                <Gallery itemlist ={ItemList} area = {area} dataFromParent={query.get('name')} />
                
            </Fragment>
            
        );
        }
    }
}

export default Restaurant;