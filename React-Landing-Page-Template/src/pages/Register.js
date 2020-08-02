import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  state = {
    name: '',
    id: '',
    password: '',
    email: ''
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
      email: ''
    })
    // axios.get("http://localhost:8080/hello")
    // .then(response => {
    // })
    // .catch(error => {
    // })
  }

  render(){
    return (
      <form onSubmit={this.handleClick}>
        <div>
          <input
            placeholder = "Name"
            value = {this.state.name}
            onChange = {this.handleChange}
            name = "name"
          />
        </div>
        <div>
          <input
            placeholder = "Id"
            value = {this.state.id}
            onChange = {this.handleChange}
            name = "id"
          />
        </div>
        <div>
          <input
            placeholder = "Password"
            value = {this.state.password}
            onChange = {this.handleChange}
            name= "password"
          />
        </div>
        <div>
          <input
            placeholder = "Email"
            value = {this.state.email}
            onChange = {this.handleChange}
            name= "email"
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    )
  }
}

export default Register;
