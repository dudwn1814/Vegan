import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.css';


class Login extends Component {

  state = {
    id: '',
    password: '',
    auth: ''
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    // axios.get("http://localhost:8080/users/id/"+this.state.id).then(response => {
    //     console.log(response)
    //
    // });

  }

  componentWillMount() {

    axios.get('http://localhost:8080/users').then(response=>{
      this.state.auth = response.data;
    })
  }




  render(){

    const tempStyle={
      display:"inline-block",
      width:"100px",
      height:"100px",
      boder:"1px solid black",
      background:"orange",
      }


    console.log(this.state)
    let name = ""
    for(var i=0; i<this.state.auth.length; i++){
      if(this.state.id===this.state.auth[i].id&&this.state.password===this.state.auth[i].password){
        name = this.state.auth[i].name
        return (

          <form>
            <div>
              <input> 
                placeholder = "Id"
                value = {this.state.id}
                onChange = {this.handleChange}
                name = "id"
              </input>
            </div>
            <div>
              <input
                placeholder = "Password"
                value = {this.state.password}
                onChange = {this.handleChange}
                name= "password"
              />
            </div>
            <div style={tempStyle}>
              <button><Link to= {{
                  pathname: '/',
                  state: name
                }}>SignIn</Link></button>
            </div>
            <div>
              <Link to="/register">SignUp</Link>
            </div>
          </form>
        )
      }
    }

    return (
      <form onSubmit = {this.handleSubmit}>
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
          <button type="submit">SignIn</button>
        </div>
        <div>
          <Link to="/register">SignUp</Link>
        </div>
      </form>
    )
  }
}




export default Login;
