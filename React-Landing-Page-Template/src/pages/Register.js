import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";

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
        <div style={{backgroundColor: '#72F540',  fontWeight: '400', padding: '200px 200px 390px 200px'}}>
        <div style={{ backgroundColor: '#ffffff', width: '450px', margin: 'auto', boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)', padding: '20px 100px 100px 55px', borderRadius: '15px', transition: 'all .3s'}}>
        <div div style={{textAlign: 'center', marginTop: '30px', fontSize: '20px', marginLeft: '30px'}}>
          <input
            placeholder = "Name"
            value = {this.state.name}
            onChange = {this.handleChange}
            name = "name"
          />
        </div>
        <div div style={{textAlign: 'center', marginTop: '30px', fontSize: '20px', marginLeft: '30px'}}>
          <input
            placeholder = "Id"
            value = {this.state.id}
            onChange = {this.handleChange}
            name = "id"
          />
        </div>
        <div div style={{textAlign: 'center', marginTop: '30px', fontSize: '20px', marginLeft: '30px'}}>
          <input
            placeholder = "Password"
            value = {this.state.password}
            onChange = {this.handleChange}
            name= "password"
          />
        </div>
        <div div style={{textAlign: 'center', marginTop: '30px', fontSize: '20px', marginLeft: '30px'}}>
          <input
            placeholder = "Email"
            value = {this.state.email}
            onChange = {this.handleChange}
            name= "email"
          />
        </div>
        <div>
          <button type="submit" style={{borderColor: '#72F540', backgroundColor: '#72F540', color: 'black', width: '130px', marginRight: '10px', boxShadow: 'none', fontSize: '15px', marginLeft: '15px'}}>Register</button>
          <Link to='/login'><button type="button" style={{borderColor: '#72F540', backgroundColor: '#72F540', color: 'black', width: '130px', marginRight: '10px', boxShadow: 'none', fontSize: '15px', marginLeft: '15px'}}>돌아가기</button></Link>
        </div>
        </div>
        </div>
      </form>
    )
  }
}

export default Register;
