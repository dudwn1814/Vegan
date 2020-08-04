import React, {Component, Fragment} from 'react';
import Navigation from '../components/navigation';
import axios from 'axios';

class Restaurant_Info extends Component {

    state = {
        name: '',
        area: '',
        loading: false,
        category: '',
        contact: '',
        address: '',
        vegan_level: '',
        detail: [],
        comment: [],
        url: ''
    }

    loadItem() {
        const query = new URLSearchParams(this.props.location.search);
        this.setState({
            name: query.get('name'),
            area: query.get('area'),
        })
        var NAME = query.get('name');
        var AREA = query.get('area');

        axios.get("http://localhost:8080/oneitem?area="+AREA+"&name="+NAME)
            .then((response) => {
              var list = [];
              for (var i = 0; i < response.data.length; i++) {
                list.push(response.data[i]);
              }
              this.setState({
                loading: true,
                category: list[0].category,
                contact: list[0].contact,
                address: list[0].address,
                vegan_level: list[0].vegan_level,
                detail: list[0].detail,
                comment: list[0].comment,
                url: list[0].url
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
        const {name, category, contact, address, detail, comment, url} = this.state;
        var {vegan_level} = this.state;

        if (vegan_level === '채식지원') {
            vegan_level = '🤍';
        }
        else {
            vegan_level = '💚';
        }

        return (
            <Fragment>
                <Navigation />
                <div id="about" style={{margin: '30px'}}>
                    <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-6"> <img src={url} className="img-responsive" style={{width: '450px', height: '350px', marginLeft: '50px'}} alt=""/> </div>
                        <div className="col-xs-12 col-md-6">
                        <div className="about-text">
                            <h2 style={{marginTop: '10px'}}>{name} <span style={{fontSize: '30px', verticalAlign: 'middle'}}>{vegan_level}</span></h2>
                            <div className="col-lg-6 col-sm-6 col-xs-12">
                            <div style={{width: '800px', marginTop: '40px', fontSize: '15px', color: 'black'}}>😋 &nbsp;&nbsp;{category}</div><br/>
                            <div style={{width: '800px', fontSize: '15px', color: 'black'}}>📞 &nbsp;&nbsp;{contact}</div><br/>
                            <div style={{width: '800px', fontSize: '15px', color: 'black'}}>🍽️ &nbsp;&nbsp;{address}</div><br/>
                            <div style={{width: '800px', fontSize: '15px', color: 'black'}}>✔️ &nbsp;&nbsp;{detail}</div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <br/><br/>
                    <h3 style={{marginLeft: '50px', marginBottom: '1px'}}>후기 모음</h3>
                    <hr style={{float: 'left', marginLeft: '50px'}}/>
                    <div>{comment}</div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Restaurant_Info;