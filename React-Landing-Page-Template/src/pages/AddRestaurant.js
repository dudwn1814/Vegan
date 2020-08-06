import React, { Component, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navigation from '../components/navigation';

class AddRestaurant extends Component {
    
    state = {
        name: '',
        area: '',
        category: '',
        contact: '',
        address: '',
        vegan_level: '',
        detail: [],
        comment: [],
        url : "img/",
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
            url: "img/"+res.data,
            writer: this.props.location.state
        })
        let key = 'restaurant';
        let area = this.state.area;
        let upload = this.state.name
        console.log(upload)
        this.setState({
            detail : [this.state.detail]
        })
        axios.post("http://localhost:8080/restaurant",this.state)
        axios.post('http://localhost:8080/users/name/uploader/',{key: key, name: this.props.location.state, area: area, upload: upload})
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
                        placeholder=" 식당이름"
                        onChange={this.handleChange}
                        value = {this.state.name}
                        name = "name"
                    />
                </div>
                <div>
                    <input  style={{ border: '1px solid black', padding: '3px', outline: 'none', width: '300px', height: '34px', marginBottom: '10px', outline: 'none'}}
                        placeholder=" 지역"
                        onChange={this.handleChange}
                        value = {this.state.area}
                        name = "area"
                    />
                </div>
                <div>
                    <textarea style={{width:'700px', height:'100px', resize: 'none', border: '1px solid black' , outline: 'none'}}
                        placeholder=" 음식점 종류"
                        onChange={this.handleChange}
                        value = {this.state.category}
                        name = "category"
                    />
                </div>
                <div>
                    <textarea style={{width:'700px', height:'100px', resize: 'none', border: '1px solid black' , outline: 'none'}}
                        placeholder=" 전화번호"
                        onChange={this.handleChange}
                        value = {this.state.contact}
                        name = "contact"
                    />
                </div>
                <div>
                    <textarea style={{width:'700px', height:'100px', resize: 'none', border: '1px solid black' , outline: 'none'}}
                        placeholder=" 상세주소"
                        onChange={this.handleChange}
                        value = {this.state.address}
                        name = "address"
                    />
                </div>
                <div>
                    <textarea style={{width:'700px', height:'100px', resize: 'none', border: '1px solid black' , outline: 'none'}}
                        placeholder=" Vegan Level"
                        onChange={this.handleChange}
                        value = {this.state.vegan_level}
                        name = "vegan_level"
                    />
                </div>
                <div>
                    <textarea style={{width:'700px', height:'100px', resize: 'none', border: '1px solid black' , outline: 'none'}}
                        placeholder=" 비고"
                        onChange={this.handleChange}
                        value = {this.state.detail}
                        name = "detail"
                    />
                </div>
                <input type="file" name="file" onChange={this.onChange} style={{marginTop: '10px', backgroundColor: 'white'}}/>
                <button type="button" onClick={this.onClick} style={{marginTop: '10px', color: 'black'}}>사진 업로드</button>
                <button type="button" style={{backgroundColor: '#4CAF50', border: '1px solid #4CAF50', float: 'right', marginRight: '610px', width: '100px',  boxShadow: 'none', fontSize: '15px', borderRadius: '10px', padding: '5px', fontWeight: 'bold', outline: 'none',  marginTop: "10px"}}><a style={{color: 'white'}} href={"/Restaurant?area=&name="+this.props.location.state}>제출</a></button>
            </div>
            </Fragment>
            )
    }
}

export default AddRestaurant;
