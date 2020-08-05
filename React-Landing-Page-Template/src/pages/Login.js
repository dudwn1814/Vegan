import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import car from './LoginImage2.png'



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

          <div style={{backgroundImage:`url(${car})`,  fontWeight: '400', padding: '200px 200px 390px 200px'}}>
         
        
          <a href="/" style={{fontSize: '50px' ,color: 'white', position: 'absolute', top: '1px', left: '20px'}}>⇦</a>
         
          <div style={{ backgroundColor: '#00000070', width: '450px', margin: 'auto', padding: '20px 100px 55px  55px', borderRadius: '15px', transition: 'all .3s'}}>
          <div style={{textAlign: 'center', fontSize: '20px', marginLeft: '30px'}}>
          <h1 style={{textAlign: 'center', fontSize: '30px', color: 'white', marginTop: '10px', marginBottom: '30px'}}>FOR VEGAN</h1>
          <div style={{textAlign: 'center', fontSize: '18px', color: 'white', marginTop: '10px'}}>로그인</div><hr style={{marginBottom: '40px', color: 'white'}}/>
          </div>
          <div style={{textAlign: 'center', marginTop: '30px', fontSize: '15px', marginLeft: '30px', color: 'blakc'}}>
            <input style={{ border: 'none', borderRadius: '15px', padding: '3px', outline: 'none', width: '228px', height: '34px'}}
              placeholder = "  Id"
              value = {this.state.id}
              onChange = {this.handleChange}
              name = "id"
            />
          </div>
          <div style={{textAlign: 'center', marginTop: '30px', fontSize: '15px', marginLeft: '30px', color: 'blakc'}}>
            <input style={{border: 'none', borderRadius: '15px', padding: '3px', outline: 'none', width: '228px', height: '34px'}}
              placeholder = "  Password"
              value = {this.state.password}
              onChange = {this.handleChange}
              name= "password"
            />
          </div>
          <div style={{textAlign: 'center', marginTop: '50px'}}>
          <button type="submit" style={{marginLeft: '30px', backgroundColor: '#1E7A46',  width: '180px',  boxShadow: 'none', fontSize: '15px', color: 'darkgreen', border: 'none', borderRadius: '10px', padding: '5px', fontWeight: 'bold', outline: 'none',  marginTop: "20px"}}><Link style={{ textDecoration: 'none', color: 'white'}} to= {{
                  pathname: '/',
                  state: name
                }}>로그인</Link></button>
           </div>
           <div style={{textAlign: 'center', marginTop: '20px'}}>     
          <button type="submit" style={{marginLeft: '30px', backgroundColor: '#1E7A46',  width: '180px',  boxShadow: 'none', fontSize: '15px', border: 'none', borderRadius: '10px', padding: '5px', outline: 'none'}}><Link to="/register" style={{color: 'white'}}>회원가입</Link></button>
          </div>
          </div>
          </div>
        </form>

        )
      }
    }

    return (

      <form onSubmit = {this.handleSubmit}>
        <div style={{backgroundImage:`url(${car})`,  fontWeight: '400', padding: '200px 200px 390px 200px'}}>
        
        
        <a href="/" style={{fontSize: '50px' ,color: 'white', position: 'absolute', top: '1px', left: '20px'}}>⇦</a>

        <div style={{ backgroundColor: '#00000070', width: '450px', margin: 'auto', padding: '20px 100px 55px  55px', borderRadius: '15px', transition: 'all .3s'}}>
        <div style={{textAlign: 'center', fontSize: '20px', marginLeft: '30px'}}>
          <h1 style={{textAlign: 'center', fontSize: '30px', color: 'white', marginTop: '10px', marginBottom: '30px'}}>FOR VEGAN</h1>
          <div style={{textAlign: 'center', fontSize: '18px', color: 'white', marginTop: '10px'}}>로그인</div><hr style={{marginBottom: '40px', color: 'white'}}/>
          </div>
          <div style={{textAlign: 'center', marginTop: '30px', fontSize: '15px', marginLeft: '30px', color: 'blakc'}}>
          <input style={{border: 'none', borderRadius: '15px', padding: '3px', outline: 'none', width: '228px', height: '34px'}}
            placeholder = "  Id"
            value = {this.state.id}
            onChange = {this.handleChange}
            name = "id"
          />
        </div>
        <div style={{textAlign: 'center', marginTop: '30px', fontSize: '15px', marginLeft: '30px', color: 'blakc'}}>
          <input style={{border: 'none', borderRadius: '15px', padding: '3px', outline: 'none', width: '228px', height: '34px'}}
            placeholder = "  Password"
            value = {this.state.password}
            onChange = {this.handleChange}
            name= "password"
          />
        </div>
        <div style={{textAlign: 'center', marginTop: '50px'}}>
          <button type="submit" style={{marginLeft: '30px', backgroundColor: '#1E7A46',  width: '180px',  boxShadow: 'none', fontSize: '15px', color: 'white', border: 'none', borderRadius: '10px', padding: '5px', outline: 'none', marginTop: "20px"}}>로그인</button>
        </div>
        <div style={{textAlign: 'center', marginTop: '20px'}}> 
          <button style={{marginLeft: '30px', backgroundColor: '#1E7A46', width: '180px',  boxShadow: 'none', fontSize: '15px', border: 'none', borderRadius: '10px', padding: '5px', outline: 'none'}}><Link style={{ textDecoration: 'none' }} to="/register" style={{color: 'white'}}>회원가입</Link></button>
        </div>
        </div>
        </div>
      </form>
    )
  }
}




export default Login;
