import React, { Component, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        let upload = 'food'+ this.state.food
        console.log(upload)
        axios.post("http://localhost:8080/foodrecipe",this.state)
        axios.post('http://localhost:8080/users/name/uploader/',{name: this.props.location.state, upload: upload})
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
      }
   
    render(){
        
        console.log(this.props.location.state)
        return(
            <div>
                <div>
                    <input
                        placeholder="요리이름"
                        onChange={this.handleChange}
                        value = {this.state.food}
                        name = "food"
                    />
                </div>
                <div>
                    <input
                        placeholder="재료"
                        onChange={this.handleChange}
                        value = {this.state.ingredients}
                        name = "ingredients"
                    />
                </div>
                <div>
                    <textarea
                        placeholder="요리순서"
                        onChange={this.handleChange}
                        value = {this.state.content}
                        name = "content"
                    />
                </div>
                <input type="file" name="file" onChange={this.onChange}/>
                <button type="button" onClick={this.onClick}>사진 업로드</button>
                <button type="button"><Link to={{pathname: "/recipe", state: this.props.location.state}}>제출 완료!</Link></button>
            </div>
            )
    }
}

export default AddRecipe;
