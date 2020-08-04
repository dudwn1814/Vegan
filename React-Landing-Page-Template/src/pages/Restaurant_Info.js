import React, {Component, Fragment} from 'react';
import Navigation from '../components/navigation';
import axios from 'axios';

class Restaurant_Info extends Component {

    state = {
        name: '',
        ItemList: []
    }

    loadItem = async () => {
        const query = new URLSearchParams(this.props.location.search);
        console.log(query);
        this.setState({
            name: query.get('name')
        })
        var NAME = query.get('name');

        axios.get("http://localhost:8080/oneitem?name="+NAME)
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
        const {ItemList} = this.state;
        console.log(ItemList);
        return (
            <Fragment>
                <Navigation />
                <div id="about">
                    <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-6"> <img src="img/about.jpg" className="img-responsive" alt=""/> </div>
                        <div className="col-xs-12 col-md-6">
                        <div className="about-text">
                            <h2>음식이름</h2>
                            <p>{this.props.data ? this.props.data.paragraph : 'loading...'}</p>
                            <h3>이건 뭐꼬</h3>
                            <div className="list-style">
                            <div className="col-lg-6 col-sm-6 col-xs-12">
                                <ul>
                                {this.props.data ? this.props.data.Why.map((d, i) => <li  key={`${d}-${i}`}>{d}</li>) : 'loading'}
                                </ul>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-xs-12">
                                <ul>
                                {this.props.data ? this.props.data.Why2.map((d, i) => <li  key={`${d}-${i}`}> {d}</li>) : 'loading'}

                                </ul>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Restaurant_Info;