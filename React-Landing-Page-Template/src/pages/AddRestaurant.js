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
        url : '',
        like : 0,
        seelater: 0,
        writer: '',
        radiogroup: '',
        img: ''
    }
    onChange = async(e) => {
        this.setState({
            img : e.target.files[0]
        })
    }

    onClick = async () => {
        const formData = new FormData();
        formData.append('file', this.state.img);
        const res = await axios.post("http://192.168.0.89:8080/upload", formData);
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
        axios.post("http://192.168.0.89:8080/restaurant",this.state)
        axios.post('http://192.168.0.89:8080/users/name/uploader/',{key: key, name: this.props.location.state, area: area, upload: upload})
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
      }

    
      handleRadio = (e) => {
        let obj = {}
        obj[e.target.value] = e.target.checked
        this.setState({
            radiogroup: obj,
            vegan_level: e.target.value
        })
      }
  
   
    render(){
        
        console.log(this.state.name!==''&&this.state.area!==''&&this.state.category!==''&&this.state.contact!==''&&this.state.address!==''&&this.state.vegan_level!==''&&this.state.img!=='')
        console.log(this.state)
        if(this.state.name!==''&&this.state.area!==''&&this.state.category!==''&&this.state.contact!==''&&this.state.address!==''&&this.state.vegan_level!==''&&this.state.img!==''){
        return(
            <Fragment>
            <Navigation dataFromParent={this.props.location.state}/> 
            <div style={{marginTop: '100px', marginLeft: '400px'}}>
            <div className="section-title" style={{marginBottom: '20px'}}>
                <h2 style= {{textAlign: 'center', marginRight: '550px', marginBottom:'50px', fontSize: '27px', marginTop: '150px'}}>식당 추가</h2></div>
                <div>
                    <input style={{ border: '1px solid black', padding: '3px', width: '228px', height: '34px', marginBottom: '20px', outline: 'none'}}
                        placeholder=" 식당 이름"
                        onChange={this.handleChange}
                        value = {this.state.name}
                        name = "name"
                    />
                </div>
                <div>
                    {/* <input  style={{ border: '1px solid black', padding: '3px', width: '300px', height: '34px', marginBottom: '10px', outline: 'none'}}
                        placeholder=" 지역"
                        onChange={this.handleChange}
                        value = {this.state.area}
                        name = "area"
                    /> */}
                    <select onChange={this.handleChange}  value = {this.state.area} name = "area" style={{ border: '1px solid black', padding: '3px', height: '34px', marginBottom: '20px', outline: 'none'}}>
                    <option selected value="서울">서울</option>
                    <option value="인천">인천</option>
                    <option value="경기">경기</option>
                    <option value="강원도">강원도</option>
                    <option value="충청북도">충청북도</option>
                    <option value="충청남도">충청남도</option>
                    <option value="전라북도">전라북도</option>
                    <option value="전라남도">전라남도</option>
                    <option value="경상북도">경상북도</option>
                    <option value="경상남도">경상남도</option>
                    <option value="제주">제주</option>
                    </select>

                </div>
                <div>
                    <form>
                        <span>채식지원&nbsp;</span><input type='radio' name='radiogroup' value='채식지원' checked={this.state.radiogroup['채식지원']} onChange={this.handleRadio} checked="checked"></input> 
                        <span>&nbsp;&nbsp;&nbsp;채식전문&nbsp;</span><input type='radio' name='radiogroup' value='채식전문' checked={this.state.radiogroup['채식전문']} onChange={this.handleRadio}></input> 
                    </form>  

                </div>
                <div>
                    <input style={{ border: '1px solid black', padding: '3px', width: '228px', height: '34px', marginBottom: '20px', outline: 'none'}}
                        placeholder=" 음식점 종류"
                        onChange={this.handleChange}
                        value = {this.state.category}
                        name = "category"
                    />
                </div>
                <div>
                <input style={{ border: '1px solid black', padding: '3px', width: '228px', height: '34px', marginBottom: '20px', outline: 'none'}}
                        placeholder=" 전화번호"
                        onChange={this.handleChange}
                        value = {this.state.contact}
                        name = "contact"
                    />
                </div>
                <div>
                <input style={{ border: '1px solid black', padding: '3px', width: '700px', height: '34px', marginBottom: '20px', outline: 'none'}}
                        placeholder=" 상세주소"
                        onChange={this.handleChange}
                        value = {this.state.address}
                        name = "address"
                    />
                </div>
                <div>
                    <textarea style={{border: '1px solid black',width:'700px', height:'100px', resize: 'none', border: '1px solid black', marginBottom: '8x' , outline: 'none'}}
                        placeholder=" 비고"
                        onChange={this.handleChange}
                        value = {this.state.detail}
                        name = "detail"
                    />
                </div>
                <input type="file" name="file" onChange={this.onChange} style={{marginTop: '10px', backgroundColor: 'white', marginBottom: '10px'}}/>
                <button type="button" onClick={this.onClick} style={{marginTop: '10px', color: 'black'}}>사진 업로드</button>
                <button type="button" style={{backgroundColor: '#4CAF50', border: '1px solid #4CAF50', float: 'right', marginRight: '480px', width: '100px',  boxShadow: 'none', fontSize: '15px', borderRadius: '10px', padding: '5px', fontWeight: 'bold', outline: 'none',  marginTop: "10px"}}><a style={{color: 'white'}} href={"/Restaurant?area=&name="+this.props.location.state.name+"&id="+this.props.location.state.id}>제출</a></button>
            </div>
            </Fragment>
            )}
            else{
                return(
                    <Fragment>
                    <Navigation dataFromParent={this.props.location.state}/> 
                    <div style={{marginTop: '100px', marginLeft: '400px'}}>
                    <div className="section-title" style={{marginBottom: '20px'}}>
                        <h2 style= {{textAlign: 'center', marginRight: '550px', marginBottom:'50px', fontSize: '27px', marginTop: '150px'}}>식당 추가</h2></div>
                        <div>
                            <input style={{ border: '1px solid black', padding: '3px', width: '228px', height: '34px', marginBottom: '10px', outline: 'none'}}
                                placeholder=" 식당 이름"
                                onChange={this.handleChange}
                                value = {this.state.name}
                                name = "name"
                            />
                        </div>
                        <div>
                    {/* <input  style={{ border: '1px solid black', padding: '3px', width: '300px', height: '34px', marginBottom: '10px', outline: 'none'}}
                        placeholder=" 지역"
                        onChange={this.handleChange}
                        value = {this.state.area}
                        name = "area"
                    /> */}
                    <select onChange={this.handleChange}  value = {this.state.area} name = "area" style={{ border: '1px solid black', padding: '3px', height: '34px', marginBottom: '20px', outline: 'none'}}>
                    <option selected value="서울">서울</option>
                    <option value="인천">인천</option>
                    <option value="경기">경기</option>
                    <option value="강원도">강원도</option>
                    <option value="충청북도">충청북도</option>
                    <option value="충청남도">충청남도</option>
                    <option value="전라북도">전라북도</option>
                    <option value="전라남도">전라남도</option>
                    <option value="경상북도">경상북도</option>
                    <option value="경상남도">경상남도</option>
                    <option value="제주">제주</option>
                    </select>

                </div>
                        <div>
                            <form>
                                <span>채식지원&nbsp;</span><input type='radio' name='radiogroup' value='채식지원' checked={this.state.radiogroup['채식지원']} onChange={this.handleRadio}></input> 
                                <span>&nbsp;&nbsp;&nbsp;채식전문&nbsp;</span><input type='radio' name='radiogroup' value='채식전문' checked={this.state.radiogroup['채식전문']} onChange={this.handleRadio}></input> 
                            </form>  
        
                        </div>
                        <div>
                            <input style={{ border: '1px solid black', padding: '3px', width: '228px', height: '34px', marginBottom: '10px', outline: 'none'}}
                                placeholder=" 음식점 종류"
                                onChange={this.handleChange}
                                value = {this.state.category}
                                name = "category"
                            />
                        </div>
                        <div>
                        <input style={{ border: '1px solid black', padding: '3px', width: '228px', height: '34px', marginBottom: '10px', outline: 'none'}}
                                placeholder=" 전화번호"
                                onChange={this.handleChange}
                                value = {this.state.contact}
                                name = "contact"
                            />
                        </div>
                        <div>
                        <input style={{ border: '1px solid black', padding: '3px', width: '700px', height: '34px', marginBottom: '10px', outline: 'none'}}
                                placeholder=" 상세주소"
                                onChange={this.handleChange}
                                value = {this.state.address}
                                name = "address"
                            />
                        </div>
                        <div>
                            <textarea style={{border: '1px solid black',width:'700px', height:'100px', resize: 'none', border: '1px solid black', marginBottom: '10px' , outline: 'none'}}
                                placeholder=" 비고"
                                onChange={this.handleChange}
                                value = {this.state.detail}
                                name = "detail"
                            />
                        </div>
                        <input type="file" name="file" onChange={this.onChange} style={{marginTop: '10px', backgroundColor: 'white', marginBottom: '10px'}}/>
                        <button type="button" ostyle={{marginTop: '10px', color: 'black'}}>사진 업로드</button>
                        <button type="button" style={{backgroundColor: '#4CAF50', border: '1px solid #4CAF50', float: 'right', marginRight: '480px', width: '100px',  boxShadow: 'none', fontSize: '15px', borderRadius: '10px', padding: '5px', fontWeight: 'bold', outline: 'none',  marginTop: "10px"}}><a style={{color: 'white'}} href={"/Restaurant?area=&name="+this.props.location.state.name+"&id="+this.props.location.state.id}>제출</a></button>
                    </div>
                    </Fragment>
                    )}
    }
}

export default AddRestaurant;
