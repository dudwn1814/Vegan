import React, { Component, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navigation from '../components/navigation';

class AddRecipe extends Component {
    
    state = {
        food: '',
        ingredients: '',
        img : null,
        content : '',
        like : 0,
        seelater: 0,
        writer: ''
    }
    onChange = async(e) => {
        this.setState({
            img : e.target.files[0]
        })
    }

    onClick = async () => {
        const formData = new FormData();
        formData.append('file', this.state.img);
        const res = await axios.post("http://localhost:8080/upload", formData);
        this.setState({
            img: res.data,
            writer: this.props.location.state
        })
        let key = 'food'
        let upload = this.state.food
        console.log(upload)
        axios.post("http://localhost:8080/foodrecipe",this.state)
        axios.post('http://localhost:8080/users/name/uploader/',{key: key, name: this.props.location.state, upload: upload})
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
      }
   
    render(){
        
        console.log(this.props.location.state)
        return(
            <Fragment>
            <Navigation dataFromParent={this.props.location.state}/> 
            <div style={{marginTop: '100px', marginLeft: '600px'}}>
            <div className="section-title" style={{marginBottom: '20px'}}>
                <h2 style= {{textAlign: 'center', marginRight: '550px', marginBottom:'50px', fontSize: '27px', marginTop: '150px'}}>레시피추가</h2></div>
                <div>
                    <input style={{ border: '1px solid black', padding: '3px', outline: 'none', width: '228px', height: '34px', marginBottom: '10px', outline: 'none'}}
                        placeholder=" 요리이름"
                        onChange={this.handleChange}
                        value = {this.state.food}
                        name = "food"
                    />
                </div>
                <div>
                    <input  style={{ border: '1px solid black', padding: '3px', outline: 'none', width: '300px', height: '34px', marginBottom: '10px', outline: 'none'}}
                        placeholder=" 재료"
                        onChange={this.handleChange}
                        value = {this.state.ingredients}
                        name = "ingredients"
                    />
                </div>
                <div>
                    <textarea style={{width:'700px', height:'400px', resize: 'none', border: '1px solid black' , outline: 'none'}}
                        placeholder=" 요리순서"
                        onChange={this.handleChange}
                        value = {this.state.content}
                        name = "content"
                    />
                </div>
                <input type="file" name="file" onChange={this.onChange} style={{marginTop: '10px', backgroundColor: 'white'}}/>
                <button type="button" onClick={this.onClick} style={{marginTop: '10px', color: 'black'}}>사진 업로드</button>
                <button type="button" style={{backgroundColor: '#4CAF50', border: '1px solid #4CAF50', float: 'right', marginRight: '610px', width: '100px',  boxShadow: 'none', fontSize: '15px', borderRadius: '10px', padding: '5px', fontWeight: 'bold', outline: 'none',  marginTop: "10px"}}><Link style={{color: 'white'}} to={{pathname: "/recipe", state: this.props.location.state}}>제출</Link></button>
            </div>
            </Fragment>
            )
    }
}

export default AddRecipe;
