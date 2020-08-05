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
        isLater: false
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
            console.log(query.get('user'))
            if(query.get('user')!='null'&&query.get('user')!='undefined'){
                axios.get('http://localhost:8080/users/name/'+query.get('user')).then(res =>{
                    
                    if(res.data[0].upload.find(c => c==='restaurant'+AREA+NAME)){
                        this.setState({
                            isWriter : true
                        })
                    }
                    if(res.data[0].like.find(c => c==='restaurant'+AREA+NAME)){
                        this.setState({
                            isLike : true
                        })
                    }
                    if(res.data[0].seelater.find(c => c==='restaurant'+AREA+NAME)){
                        this.setState({
                            isLater : true
                        })
                    }
                    console.log(this.state)
                })
            }
      }
    onClickLike=()=>{
        const query = new URLSearchParams(this.props.location.search);
        var NAME = query.get('name');
        var AREA = query.get('area');
        var USER = query.get('user');
        let likerestaurant = 'restaurant'+ AREA + NAME
        axios.post('http://localhost:8080/users/like',{name: USER, like: likerestaurant})
        this.setState({
            like : this.state.like + 1,
            isLike : true
        })
        console.log(this.state.like)
        axios.post('http://localhost:8080/restaurant/like', {contact: this.state.contact ,like: this.state.like+1})
        
    }
    onClickLater=()=>{
        const query = new URLSearchParams(this.props.location.search);
        var NAME = query.get('name');
        var AREA = query.get('area');
        var USER = query.get('user');
        let laterrestaurant = 'restaurant'+ AREA + NAME
        axios.post('http://localhost:8080/users/later',{name: USER, later: laterrestaurant})
        this.setState({
            seelater : this.state.seelater + 1,
            isLater : true
        })
        
        axios.post('http://localhost:8080/restaurant/seelater',{contact: this.state.contact, seelater: this.state.seelater+1})
    }

    handleSubmit = (e) => {
        // axios.get("http://localhost:8080/addcomment?text="+this.state.text)
        // .then((response) => {
        //   var list = [];
        //   for (var i = 0; i < response.data.length; i++) {
        //     list.push(response.data[i]);
        //   }
        //   this.setState({
        //     comment: list[0].comment,
        //   });
        // })
        // .catch(e => {
        //   console.error(e);
        //   this.setState({
        //     loading: false
        //   });
        // });
    }

    componentWillMount() {
        this.loadItem();  // loadItem 호출
    }

    render() {
        const {name, category, contact, address, detail, comment, url} = this.state;
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
                        <button onClick={this.onClickLike}>Like</button>
                        <text>{this.state.like}</text>
                        <button onClick={this.onClickLater}>SeeLater</button>
                        <text>{this.state.seelater}</text>
                    </div>
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
                            <textarea style={{width: '740px', height: '100px', resize: 'none', outline: 'none'}} placeholder='후기를 남겨주세요' name="addcomment">
                                </textarea>
                            {/* <button type="submit" style ={{marginLeft: '10px', verticalAlign: '40%'}}>작성</button> */}
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
                            <button onClick={this.onClickLike}>Like</button>
                            <text>{this.state.like}</text>
                            <button onClick={this.onClickLater}>SeeLater</button>
                            <text>{this.state.seelater}</text>
                        </div>
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
                                <textarea style={{width: '740px', height: '100px', resize: 'none', outline: 'none'}} placeholder='후기를 남겨주세요' name="addcomment">
                                    </textarea>
                                {/* <button type="submit" style ={{marginLeft: '10px', verticalAlign: '40%'}}>작성</button> */}
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
                            <button>Like</button>
                            <text>{this.state.like}</text>
                            <button onClick={this.onClickLater}>SeeLater</button>
                            <text>{this.state.seelater}</text>
                        </div>
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
                                <textarea style={{width: '740px', height: '100px', resize: 'none', outline: 'none'}} placeholder='후기를 남겨주세요' name="addcomment">
                                    </textarea>
                                {/* <button type="submit" style ={{marginLeft: '10px', verticalAlign: '40%'}}>작성</button> */}
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
                            <button onClick={this.onClickLike}>Like</button>
                            <text>{this.state.like}</text>
                            <button >SeeLater</button>
                            <text>{this.state.seelater}</text>
                        </div>
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
                                <textarea style={{width: '740px', height: '100px', resize: 'none', outline: 'none'}} placeholder='후기를 남겨주세요' name="addcomment">
                                    </textarea>
                                {/* <button type="submit" style ={{marginLeft: '10px', verticalAlign: '40%'}}>작성</button> */}
                            </div>
    
                        </tbody>
                    </div>
                </Fragment>
            );
        }
        else{
            return (
                
                <Fragment>
                    <Navigation/>
                    <div id="about" style={{margin: '30px'}}>
                        <div className="container">
                        <div>
                            <button>Like</button>
                            <text>{this.state.like}</text>
                            <button>SeeLater</button>
                            <text>{this.state.seelater}</text>
                        </div>
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
                                <textarea style={{width: '740px', height: '100px', resize: 'none', outline: 'none'}} placeholder='후기를 남겨주세요' name="addcomment">
                                    </textarea>
                                {/* <button type="submit" style ={{marginLeft: '10px', verticalAlign: '40%'}}>작성</button> */}
                            </div>
    
                        </tbody>
                    </div>
                </Fragment>
            );
        }
    }
}

export default Restaurant_Info;