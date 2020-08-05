import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import car from './LoginImage2.png'

class Register extends Component {
  state = {
    name: '',
    id: '',
    password: '',
    email: '',
    mypage: {
      like : new Array(),
      seelater: new Array()
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleClick = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:8080/users', this.state).then(response => {
        console.log(response)

    });

    this.setState({
      name: '',
      id: '',
      password: '',
      email: '',
      mypage: {
        like : new Array(),
        seelater: new Array()
      }});
      this.goBack();
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render(){
    return (
      <form onSubmit={this.handleClick}>
       <div style={{backgroundImage:`url(${car})`,  fontWeight: '400', padding: '200px 200px 390px 200px'}}>
          
        
       <a href="/" style={{fontSize: '50px' ,color: 'white', position: 'absolute', top: '1px', left: '20px'}}>⇦</a>
          
          <div style={{ backgroundColor: '#00000070', width: '450px', margin: 'auto', padding: '30px 100px 55px 55px', borderRadius: '15px', transition: 'all .3s'}}>
          <div style={{textAlign: 'center', fontSize: '20px', marginLeft: '30px'}}>
          <h1 style={{textAlign: 'center', fontSize: '30px', color: 'white', marginTop: '10px', marginBottom: '30px'}}>FOR VEGAN</h1>
          <div style={{textAlign: 'center', fontSize: '18px', color: 'white', marginTop: '10px'}}>회원가입</div><hr style={{marginBottom: '40px', color: 'white'}}/>
          
        </div>
          <div div style={{textAlign: 'center', marginTop: '30px', fontSize: '15px', marginLeft: '30px'}}>
          <input style={{border: 'none', borderRadius: '15px', padding: '3px', outline: 'none', width: '228px', height: '34px'}}
            placeholder = "  Name"
            value = {this.state.name}
            onChange = {this.handleChange}
            name = "name"
          />
        </div>
        <div div style={{textAlign: 'center', marginTop: '30px', fontSize: '15px', marginLeft: '30px'}}>
        <input style={{ border: 'none', borderRadius: '15px', padding: '3px', outline: 'none', width: '228px', height: '34px'}}
            placeholder = "  Id"
            value = {this.state.id}
            onChange = {this.handleChange}
            name = "id"
          />
        </div>
        <div div style={{textAlign: 'center', marginTop: '30px', fontSize: '15px', marginLeft: '30px'}}>
        <input style={{border: 'none', borderRadius: '15px', padding: '3px', outline: 'none', width: '228px', height: '34px'}}
            placeholder = "  Password"
            value = {this.state.password}
            onChange = {this.handleChange}
            name= "password"
          />
        </div>
        <div div style={{textAlign: 'center', marginTop: '30px', fontSize: '15px', marginLeft: '30px'}}>
        <input style={{border: 'none', borderRadius: '15px', padding: '3px', outline: 'none', width: '228px', height: '34px'}}
            placeholder = "  Email"
            value = {this.state.email}
            onChange = {this.handleChange}
            name= "email"
          />
        </div>
        <div style={{textAlign: 'center', marginTop: '50px'}}>
        <button type="submit" style={{backgroundColor: '#1E7A46',  width: '120px', boxShadow: 'none', fontSize: '15px', marginLeft: '25px', color: 'white', border: 'none', borderRadius: '10px', padding: '5px',outline: 'none', marginTop: "20px"}}>가입하기</button>
        </div>
        </div>
        </div>
      </form>
    )
  }
}

export default Register;
