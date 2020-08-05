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
        url: '',
        text: ''
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
    
      handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
      }

    handleSubmit = (e) => {
        const query = new URLSearchParams(this.props.location.search);
        this.setState({
            name: query.get('name'),
            area: query.get('area'),
            text: this.state.text,
        })
        var NAME = query.get('name');
        var AREA = query.get('area');
        console.log(this.state.text);

        axios.get("http://localhost:8080/addcomment?area="+AREA+"&name="+NAME+"&text="+this.state.text)
        .then((response) => {
          var list = [];
          for (var i = 0; i < response.data.length; i++) {
            list.push(response.data[i]);
          }
          this.setState({
            comment: list[0].comment,
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
                            <div style={{width: '800px', marginTop: '40px', fontSize: '15px', color: 'black'}}><span title="카테고리">😋</span> &nbsp;&nbsp;{category}</div><br/>
                            <div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="연락처">📞</span> &nbsp;&nbsp;{contact}</div><br/>
                            <div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="주소">🍽️</span> &nbsp;&nbsp;{address}</div><br/>
                            <div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="추가정보"></span>✔️ &nbsp;&nbsp;{detail}</div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <br/><br/>
                    <h3 style={{marginLeft: '50px', marginBottom: '1px'}}>후기 모음</h3>
                    <hr style={{float: 'left', marginLeft: '50px'}}/>
                    <br/><br/><br/>

                    </div>
                    <tbody>
                        {comment.map(function(comment, i) {
                            console.log({comment})
                            
                            return (<div style={{marginLeft: '400px', background: '#EFF7EB', padding: '15px 15px 0.1px 15px'}}>
                                        <div style={{textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', fontSize: '17px'}}>{comment[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'lighter', fontSize: '13px'}}>{comment[1]}</span></div>
                                        <div>&nbsp;<span style={{verticalAlign: 'super'}}>↳</span> &nbsp;{comment[2]}</div>
                                        <hr style={{width: '800px', background: 'lightgray', marginTop: '10px', marginBottom: '10px'}}/>
                                    </div>)
                        })}

                        <div style={{marginLeft: '400px', background: '#EFF7EB', padding: '15px 15px 0.1px 15px'}}>
                            <div style={{textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', fontSize: '17px'}}>작성자</div>
                            <textarea style={{width: '740px', height: '100px', resize: 'none', outline: 'none'}}
                                placeholder='후기를 남겨주세요'
                                name="text"
                                id="text"
                                value = {this.state.text}
                                onChange={this.handleChange}
                                className="addcomment">
                            </textarea>
                            <button onClick={this.handleSubmit} style ={{marginLeft: '10px', verticalAlign: '40%'}}>작성</button>
                        </div>

                    </tbody>
                </div>
            </Fragment>
        );
    }
}

export default Restaurant_Info;