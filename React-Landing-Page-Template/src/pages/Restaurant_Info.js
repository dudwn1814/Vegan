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
        text: '',
        like: 0,
        seelater: 0,
        isWriter: false,
        isLike: false,
        isLater: false,
        user: '',
    }
    
    loadItem() {
        const query = new URLSearchParams(this.props.location.search);
        this.setState({
            name: query.get('name'),
            area: query.get('area'),
            user: query.get('user'),
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
                url: list[0].url,
                like: list[0].like,
                seelater: list[0].seelater,
              });
            })
            .catch(e => {
              console.error(e);
              this.setState({
                loading: false
              });
            });
            if(query.get('user')!='null'&&query.get('user')!='undefined'){
                axios.get('http://localhost:8080/users/name/'+query.get('user')).then(res =>{
                    
                    if(res.data[0].upload.find(c => c===['restaurant',AREA,NAME])){
                        this.setState({
                            isWriter : true
                        })
                    }
                    if(res.data[0].like.find(c => c===['restaurant',AREA,NAME])){
                        this.setState({
                            isLike : true
                        })
                    }
                    if(res.data[0].seelater.find(c => c===['restaurant',AREA,NAME])){
                        this.setState({
                            isLater : true
                        })
                    }
                })
            }
      }
    
      handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
      }
    onClickLike=()=>{
        const query = new URLSearchParams(this.props.location.search);
        var NAME = query.get('name');
        var AREA = query.get('area');
        var USER = query.get('user');
        let key = 'restaurant';
        let area = AREA;
        let likerestaurant = NAME;
        axios.post('http://localhost:8080/users/like',{key: key, name: USER, area: area, like: likerestaurant})
        this.setState({
            like : this.state.like + 1,
            isLike : true
        })
        axios.post('http://localhost:8080/restaurant/like', {contact: this.state.contact ,like: this.state.like+1})
        
    }
    onClickLater=()=>{
        const query = new URLSearchParams(this.props.location.search);
        var NAME = query.get('name');
        var AREA = query.get('area');
        var USER = query.get('user');
        let key = 'restaurant';
        let area = AREA;
        let laterrestaurant = NAME
        axios.post('http://localhost:8080/users/later',{key:key, name: USER, area:area, later: laterrestaurant})
        this.setState({
            seelater : this.state.seelater + 1,
            isLater : true
        })
        
        axios.post('http://localhost:8080/restaurant/seelater',{contact: this.state.contact, seelater: this.state.seelater+1})
    }

    handleSubmit = (e) => {
        const query = new URLSearchParams(this.props.location.search);
        this.setState({
            name: query.get('name'),
            area: query.get('area'),
            text: this.state.text,
            user: query.get('user'),
        })
        var NAME = query.get('name');
        var AREA = query.get('area');
        var USER = query.get('user');

        axios.get("http://localhost:8080/addcomment?area="+AREA+"&name="+NAME+"&text="+this.state.text+"&user="+USER)
        .then((response) => {
          var list = [];
          for (var i = 0; i < response.data.length; i++) {
            list.push(response.data[i]);
          }
          this.setState({
            comment: list[0].comment,
          });
          document.getElementById("text").value = "";

        })
        .catch(e => {
          console.error(e);
          this.setState({
            loading: false
          });
        });

        
    }

    componentWillMount() {
        this.loadItem();  // loadItem 호출
    }


    render() {
        const {name, category, contact, address, detail, comment, url, user} = this.state;
        var {vegan_level} = this.state;
        const query = new URLSearchParams(this.props.location.search);
        if (vegan_level === '채식지원') {
            vegan_level = '🤍';
        }
        else {
            vegan_level = '💚';
        }
        if(query.get('user')!='null'&&query.get('user')!='undefined'&&!this.state.isWriter&&!this.state.isLater&&!this.state.isLike){
        return (
            
            <Fragment>
                <Navigation dataFromParent={query.get('user')}/>
                <div id="about" style={{margin: '30px'}}>
                    <div className="container">
                    <div>
                        <button onClick={this.onClickLike} style={{backgroundColor: 'white', border: 'none', outline: 'none', marginLeft:'410px'}}>❤️</button>
                        <text>{this.state.like}&nbsp;&nbsp;&nbsp;</text>
                        <button onClick={this.onClickLater} style={{backgroundColor: 'white', border: 'none', outline: 'none'}}>⭐</button>
                        <text>{this.state.seelater}</text>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-6"> <img src={url} className="img-responsive" style={{width: '450px', height: '350px', marginLeft: '50px'}} alt=""/> </div>
                        <div className="col-xs-12 col-md-6">
                        <div className="about-text">
                            <h2 style={{marginTop: '10px'}}>{name} <span style={{fontSize: '30px', verticalAlign: 'middle'}}>{vegan_level}</span></h2>
                            <div className="col-lg-6 col-sm-6 col-xs-12">
                            <div style={{width: '800px', marginTop: '40px', fontSize: '15px', color: 'black'}}><span title="카테고리">😋</span> &nbsp;&nbsp;{category}</div><br/>
                            <div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="연락처">📞</span> &nbsp;&nbsp;{contact}</div><br/>
                            <div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="주소">🍽️</span> &nbsp;&nbsp;{address}</div><br/> 
                            <tdetail>
                                {detail.map(function(detail, i) {
                                    if (detail === "") {
                                    }
                                    else {
                                        return (<div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="추가정보"></span>✔️ &nbsp;&nbsp;{detail}</div>)
                                    }
                                    
                                })}
                            </tdetail>
                                
                                
                                
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
                            
                            return (<div style={{marginLeft: '400px', background: '#EFF7EB', padding: '10px 15px 0.1px 10px'}}>
                                        <div style={{textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', fontSize: '17px'}}>{comment[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'lighter', fontSize: '13px'}}>{comment[1]}</span></div>
                                        <div>&nbsp;<span style={{verticalAlign: 'super'}}>↳</span> &nbsp;{comment[2]}</div>
                                        <hr style={{width: '800px', background: 'lightgray', marginTop: '10px', marginBottom: '10px'}}/>
                                    </div>)
                        })}

                        <div style={{marginLeft: '400px', background: '#EFF7EB', padding: '15px 15px 0.1px 15px'}}>
                            <div style={{textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', fontSize: '17px'}}>{user}</div>
                            <textarea style={{width: '740px', height: '100px', resize: 'none', outline: 'none'}}
                                placeholder='후기를 남겨주세요'
                                name="text"
                                id="text"
                                value = {this.state.text}
                                onChange={this.handleChange}
                                className="addcomment">
                            </textarea>
                            <button onClick={this.handleSubmit} style ={{marginLeft: '10px', verticalAlign: '40%', marginBottom: '10px'}}>작성</button>
                        </div>

                    </tbody>
                </div>
            </Fragment>
        );
        }
        else if(this.state.isWriter){
            return (
                
                <Fragment>
                    <Navigation dataFromParent={query.get('user')}/>
                    <div id="about" style={{margin: '30px'}}>
                        <div className="container">
                        <div>
                            <button style={{backgroundColor: 'white', border: 'none', outline: 'none', marginLeft:'410px'}}>❤️</button>
                            <text>{this.state.like}&nbsp;&nbsp;&nbsp;</text>
                            <button style={{backgroundColor: 'white', border: 'none', outline: 'none'}}>⭐</button>
                            <text>{this.state.seelater}</text>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-6"> <img src={url} className="img-responsive" style={{width: '450px', height: '350px', marginLeft: '50px'}} alt=""/> </div>
                            <div className="col-xs-12 col-md-6">
                            <div className="about-text">
                                <h2 style={{marginTop: '10px'}}>{name} <span style={{fontSize: '30px', verticalAlign: 'middle'}}>{vegan_level}</span></h2>
                                <div className="col-lg-6 col-sm-6 col-xs-12">
                                <div style={{width: '800px', marginTop: '40px', fontSize: '15px', color: 'black'}}><span title="카테고리">😋</span> &nbsp;&nbsp;{category}</div><br/>
                                <div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="연락처">📞</span> &nbsp;&nbsp;{contact}</div><br/>
                                <div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="주소">🍽️</span> &nbsp;&nbsp;{address}</div><br/>
                                <tdetail>
                                    
                                {detail.map(function(detail, i) {
                                    if (detail === "") {
                                    }
                                    else {
                                        return (<div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="추가정보"></span>✔️ &nbsp;&nbsp;{detail}</div>)
                                    }
                                    
                                })}
                            </tdetail>
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
                            
                            return (<div style={{marginLeft: '400px', background: '#EFF7EB', padding: '10px 15px 0.1px 10px'}}>
                                        <div style={{textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', fontSize: '17px'}}>{comment[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'lighter', fontSize: '13px'}}>{comment[1]}</span></div>
                                        <div>&nbsp;<span style={{verticalAlign: 'super'}}>↳</span> &nbsp;{comment[2]}</div>
                                        <hr style={{width: '800px', background: 'lightgray', marginTop: '10px', marginBottom: '10px'}}/>
                                    </div>)
                        })}
    
                            <div style={{marginLeft: '400px', background: '#EFF7EB', padding: '15px 15px 0.1px 15px'}}>
                                <div style={{textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', fontSize: '17px'}}>{user}</div>
                                <textarea style={{width: '740px', height: '100px', resize: 'none', outline: 'none'}}
                                    placeholder='후기를 남겨주세요'
                                    name="text"
                                    id="text"
                                    value = {this.state.text}
                                    onChange={this.handleChange}
                                    className="addcomment">
                                    </textarea>
                                <button type="submit" style ={{marginLeft: '10px', verticalAlign: '40%', marginBottom: '10px'}}>작성</button>
                            </div>
    
                        </tbody>
                    </div>
                </Fragment>
            );
        }
        else if(this.state.isLike&&!this.state.isLater){
            return (
                
                <Fragment>
                    <Navigation dataFromParent={query.get('user')}/>
                    <div id="about" style={{margin: '30px'}}>
                        <div className="container">
                        <div>
                            <button style={{backgroundColor: 'white', border: 'none', outline: 'none', marginLeft:'410px'}}>❤️</button>
                            <text>{this.state.like}&nbsp;&nbsp;&nbsp;</text>
                            <button onClick={this.onClickLater} style={{backgroundColor: 'white', border: 'none', outline: 'none'}}>⭐</button>
                            <text>{this.state.seelater}</text>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-6"> <img src={url} className="img-responsive" style={{width: '450px', height: '350px', marginLeft: '50px'}} alt=""/> </div>
                            <div className="col-xs-12 col-md-6">
                            <div className="about-text">
                                <h2 style={{marginTop: '10px'}}>{name} <span style={{fontSize: '30px', verticalAlign: 'middle'}}>{vegan_level}</span></h2>
                                <div className="col-lg-6 col-sm-6 col-xs-12">
                                <div style={{width: '800px', marginTop: '40px', fontSize: '15px', color: 'black'}}><span title="카테고리">😋</span> &nbsp;&nbsp;{category}</div><br/>
                                <div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="연락처">📞</span> &nbsp;&nbsp;{contact}</div><br/>
                                <div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="주소">🍽️</span> &nbsp;&nbsp;{address}</div><br/>
                                <tdetail>
                                {detail.map(function(detail, i) {
                                    if (detail === "") {
                                    }
                                    else {
                                        return (<div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="추가정보"></span>✔️ &nbsp;&nbsp;{detail}</div>)
                                    }
                                    
                                })}
                            </tdetail>
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
                            
                            return (<div style={{marginLeft: '400px', background: '#EFF7EB', padding: '10px 15px 0.1px 10px'}}>
                                        <div style={{textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', fontSize: '17px'}}>{comment[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'lighter', fontSize: '13px'}}>{comment[1]}</span></div>
                                        <div>&nbsp;<span style={{verticalAlign: 'super'}}>↳</span> &nbsp;{comment[2]}</div>
                                        <hr style={{width: '800px', background: 'lightgray', marginTop: '10px', marginBottom: '10px'}}/>
                                    </div>)
                        })}
    
                            <div style={{marginLeft: '400px', background: '#EFF7EB', padding: '15px 15px 0.1px 15px'}}>
                                <div style={{textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', fontSize: '17px'}}>{user}</div>
                                <textarea style={{width: '740px', height: '100px', resize: 'none', outline: 'none'}}
                                    placeholder='후기를 남겨주세요'
                                    name="text"
                                    id="text"
                                    value = {this.state.text}
                                    onChange={this.handleChange}
                                    className="addcomment">
                                    </textarea>
                                <button type="submit" style ={{marginLeft: '10px', verticalAlign: '40%', marginBottom: '10px'}}>작성</button>
                            </div>
    
                        </tbody>
                    </div>
                </Fragment>
            );
        }
        else if(this.state.isLater&&!this.state.isLike){
            return (
                
                <Fragment>
                    <Navigation dataFromParent={query.get('user')}/>
                    <div id="about" style={{margin: '30px'}}>
                        <div className="container">
                        <div>
                            <button onClick={this.onClickLike} style={{backgroundColor: 'white', border: 'none', outline: 'none', marginLeft:'410px'}}>❤️</button>
                            <text>{this.state.like}&nbsp;&nbsp;&nbsp;</text>
                            <button style={{backgroundColor: 'white', border: 'none', outline: 'none'}}>⭐</button>
                            <text>{this.state.seelater}</text>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-6"> <img src={url} className="img-responsive" style={{width: '450px', height: '350px', marginLeft: '50px'}} alt=""/> </div>
                            <div className="col-xs-12 col-md-6">
                            <div className="about-text">
                                <h2 style={{marginTop: '10px'}}>{name} <span style={{fontSize: '30px', verticalAlign: 'middle'}}>{vegan_level}</span></h2>
                                <div className="col-lg-6 col-sm-6 col-xs-12">
                                <div style={{width: '800px', marginTop: '40px', fontSize: '15px', color: 'black'}}><span title="카테고리">😋</span> &nbsp;&nbsp;{category}</div><br/>
                                <div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="연락처">📞</span> &nbsp;&nbsp;{contact}</div><br/>
                                <div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="주소">🍽️</span> &nbsp;&nbsp;{address}</div><br/>
                                <tdetail>
                                {detail.map(function(detail, i) {
                                    if (detail === "") {
                                    }
                                    else {
                                        return (<div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="추가정보"></span>✔️ &nbsp;&nbsp;{detail}</div>)
                                    }
                                    
                                })}
                            </tdetail>
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
                            
                            return (<div style={{marginLeft: '400px', background: '#EFF7EB', padding: '10px 15px 0.1px 10px'}}>
                                        <div style={{textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', fontSize: '17px'}}>{comment[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'lighter', fontSize: '13px'}}>{comment[1]}</span></div>
                                        <div>&nbsp;<span style={{verticalAlign: 'super'}}>↳</span> &nbsp;{comment[2]}</div>
                                        <hr style={{width: '800px', background: 'lightgray', marginTop: '10px', marginBottom: '10px'}}/>
                                    </div>)
                        })}
                            <div style={{marginLeft: '400px', background: '#EFF7EB', padding: '15px 15px 0.1px 15px'}}>
                                <div style={{textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', fontSize: '17px'}}>{user}</div>
                                <textarea style={{width: '740px', height: '100px', resize: 'none', outline: 'none'}}
                                    placeholder='후기를 남겨주세요'
                                    name="text"
                                    id="text"
                                    value = {this.state.text}
                                    onChange={this.handleChange}
                                    className="addcomment">
                                </textarea>
                                <button type="submit" style ={{marginLeft: '10px', verticalAlign: '40%', marginBottom: '10px'}}>작성</button>
                            </div>
    
                        </tbody>
                    </div>
                </Fragment>
            );
        }
        else{
            return (
                
                <Fragment>
                    <Navigation dataFromParent={query.get('user')}/>
                    <div id="about" style={{margin: '30px'}}>
                        <div className="container">
                        <div>
                            <button style={{backgroundColor: 'white', border: 'none', outline: 'none', marginLeft:'410px'}}>❤️</button>
                            <text>{this.state.like}&nbsp;&nbsp;&nbsp;</text>
                            <button style={{backgroundColor: 'white', border: 'none', outline: 'none'}}>⭐</button>
                            <text>{this.state.seelater}</text>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-6"> <img src={url} className="img-responsive" style={{width: '450px', height: '350px', marginLeft: '50px'}} alt=""/> </div>
                            <div className="col-xs-12 col-md-6">
                            <div className="about-text">
                                <h2 style={{marginTop: '10px'}}>{name} <span style={{fontSize: '30px', verticalAlign: 'middle'}}>{vegan_level}</span></h2>
                                <div className="col-lg-6 col-sm-6 col-xs-12">
                                <div style={{width: '800px', marginTop: '40px', fontSize: '15px', color: 'black'}}><span title="카테고리">😋</span> &nbsp;&nbsp;{category}</div><br/>
                                <div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="연락처">📞</span> &nbsp;&nbsp;{contact}</div><br/>
                                <div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="주소">🍽️</span> &nbsp;&nbsp;{address}</div><br/>
                                <tdetail>
                                {detail.map(function(detail, i) {
                                    if (detail === "") {
                                    }
                                    else {
                                        return (<div style={{width: '800px', fontSize: '15px', color: 'black'}}><span title="추가정보"></span>✔️ &nbsp;&nbsp;{detail}</div>)
                                    }
                                    
                                })}
                            </tdetail>
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
                            
                            return (<div style={{marginLeft: '400px', background: '#EFF7EB', padding: '10px 15px 0.1px 10px'}}>
                                        <div style={{textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', fontSize: '17px'}}>{comment[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'lighter', fontSize: '13px'}}>{comment[1]}</span></div>
                                        <div>&nbsp;<span style={{verticalAlign: 'super'}}>↳</span> &nbsp;{comment[2]}</div>
                                        <hr style={{width: '800px', background: 'lightgray', marginTop: '10px', marginBottom: '10px'}}/>
                                    </div>)
                        })}
    
                            <div style={{marginLeft: '400px', background: '#EFF7EB', padding: '15px 15px 0.1px 15px'}}>
                                {/* <div style={{textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', fontSize: '17px'}}>{user}</div> */}
                                <textarea style={{width: '795px', height: '100px', resize: 'none', outline: 'none', marginBottom: '10px'}}
                                    value = {this.state.text} placeholder='후기는 로그인 후 작성 가능합니다' name="addcomment">
                                    </textarea>
                                    {/* 로그아웃 상태에서는 댓글 작성 불가능 */}
                                {/* <button type="submit" style ={{marginLeft: '10px', verticalAlign: '40%', marginBottom: '10px'}}>작성</button> */}
                            </div>
    
                        </tbody>
                    </div>
                </Fragment>
            );
        }
    }
}

export default Restaurant_Info;