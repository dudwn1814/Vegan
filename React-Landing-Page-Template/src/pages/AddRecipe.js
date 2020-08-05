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
        seelater: 0
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
            img: res.data
        })
        axios.post("http://localhost:8080/foodrecipe",this.state)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
      }
   
    render(){
        
        return(
            <Fragment>
            <Navigation dataFromParent={this.props.location.state}/> 
            <div style={{marginTop: '100px', marginLeft: '600px'}}>
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
                    <textarea style={{width:'700px', height:'400px'}}
                        placeholder="요리순서"
                        onChange={this.handleChange}
                        value = {this.state.content}
                        name = "content"
                    />
                </div>
                <input type="file" name="file" onChange={this.onChange}/>
                <button type="button" onClick={this.onClick}>사진 업로드</button>
                <button type="button"><Link to="/recipe">제출 완료!</Link></button>
            </div>
            </Fragment>
            )
    }
}

export default AddRecipe;
