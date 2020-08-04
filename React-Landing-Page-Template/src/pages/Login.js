import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';



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

    console.log(this.state)
    let name = ""
    for(var i=0; i<this.state.auth.length; i++){
      if(this.state.id===this.state.auth[i].id&&this.state.password===this.state.auth[i].password){
        console.log(this.state.id);
        name = this.state.auth[i].name
        return (


          <form onSubmit = {this.handleSubmit}>
          <div style={{background: 'url(../../public/img/background.jpg)',  fontWeight: '400', padding: '200px 200px 390px 200px'}}>
          <div style={{ backgroundColor: '#ffffff', width: '450px', margin: 'auto', boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)', padding: '20px 100px 100px 55px', borderRadius: '15px', transition: 'all .3s'}}>
          <div style={{textAlign: 'center', fontSize: '20px', marginLeft: '30px'}}>
            <h1 style={{textAlign: 'center', fontSize: '30px', color: 'black', marginTop: '10px', marginBottom: '100px'}}>FOR VEGAN</h1>
            
            <input
              placeholder = "Id"
              value = {this.state.id}
              onChange = {this.handleChange}
              name = "id"
            />
          </div>
          <div style={{textAlign: 'center', marginTop: '30px', fontSize: '20px', marginLeft: '30px'}}>
            <input
              placeholder = "Password"
              value = {this.state.password}
              onChange = {this.handleChange}
              name= "password"
            />
          </div>
          <div style={{textAlign: 'center', marginTop: '50px'}}>
            <button style={{borderColor: '#72F540', backgroundColor: '#72F540', color: 'black', width: '130px', marginRight: '10px', boxShadow: 'none', fontSize: '15px', marginLeft: '15px'}}><Link to= {{
                  pathname: '/',
                  state: name
                }}>SignIn</Link></button>
            <button style={{borderColor: '#72F540', backgroundColor: '#72F540', width: '130px', marginLeft: '10px', boxShadow: 'none', fontSize: '15px'}}><Link to="/register" style={{color: 'black'}}>SignUp</Link></button>
          </div>
          </div>
          </div>
        </form>
        )
      }
    }

    return (

      <form onSubmit = {this.handleSubmit}>
        <div style={{background: 'url(../../public/img/background.jpg)',  fontWeight: '400', padding: '200px 200px 390px 200px'}}>
        <div style={{ backgroundColor: '#ffffff', width: '450px', margin: 'auto', boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)', padding: '20px 100px 100px 55px', borderRadius: '15px', transition: 'all .3s'}}>
        <div style={{textAlign: 'center', fontSize: '20px', marginLeft: '30px'}}>
          <h1 style={{textAlign: 'center', fontSize: '30px', color: 'black', marginTop: '10px', marginBottom: '100px'}}>FOR VEGAN</h1>
          
          <input
            placeholder = "Id"
            value = {this.state.id}
            onChange = {this.handleChange}
            name = "id"
          />
        </div>
        <div style={{textAlign: 'center', marginTop: '30px', fontSize: '20px', marginLeft: '30px'}}>
          <input
            placeholder = "Password"
            value = {this.state.password}
            onChange = {this.handleChange}
            name= "password"
          />
        </div>
        <div style={{textAlign: 'center', marginTop: '50px'}}>
          <button type="submit" style={{borderColor: '#72F540', backgroundColor: '#72F540', color: 'black', width: '130px', marginRight: '10px', boxShadow: 'none', fontSize: '15px', marginLeft: '15px'}}>SignIn</button>
          <button style={{borderColor: '#72F540', backgroundColor: '#72F540', width: '130px', marginLeft: '10px', boxShadow: 'none', fontSize: '15px'}}><Link to="/register" style={{color: 'black'}}>SignUp</Link></button>
        </div>
        </div>
        </div>
      </form>

    )
  }
}




export default Login;
