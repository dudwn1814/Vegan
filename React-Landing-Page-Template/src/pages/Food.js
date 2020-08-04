import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/navigation';

class Food extends Component {

    state = {
        food: '',
        ingredients: '',
        img: '',
        content: '',
        like: 0,
        seelater: 0
    }
    componentWillMount() {
        axios.get('http://localhost:8080/foodrecipe/'+this.props.location.state.food).then(response=>{
            this.setState({
                food: response.data[0].food,
                ingredients: response.data[0].ingredients,
                img: response.data[0].img,
                content: response.data[0].content,
                like :  response.data[0].like,
                seelater: response.data[0].seelater
            })
            console.log(response.data.food)
            console.log(response.data)
        })
    }

    onClickLike=()=>{
        console.log(this.props.location.state)
        axios.get('http://localhost:8080/users/name/'+this.props.location.state.user).then(res =>{
            let likefood = 'food'+this.state.food
            let user = {
                name: res.data[0].name,
                id: res.data[0].id,
                password: res.data[0].password,
                email: res.data[0].email,
                mypage: {
                    like : res.data[0].mypage.like.concat([likefood]),
                    seelater: res.data[0].mypage.seelater
                }
            }
            axios.post('http://localhost:8080/users/like', user)
            this.setState({
                like : this.state.like+1,
            })
            axios.post('http://localhost:8080/foodrecipe/like',this.state)
        })
        
    }
    onClickLater=()=>{
        console.log(this.props.location.state)
        axios.get('http://localhost:8080/users/name/'+this.props.location.state.user).then(res =>{
            let laterfood = 'food'+this.state.food
            let user = {
                name: res.data[0].name,
                id: res.data[0].id,
                password: res.data[0].password,
                email: res.data[0].email,
                mypage: {
                    like : res.data[0].mypage.like,
                    seelater: res.data[0].mypage.seelater.concat([laterfood])
                }
            }
            axios.post('http://localhost:8080/users/like', user)
            this.setState({
                seelater : this.state.seelater + 1
            })
            axios.post('http://localhost:8080/foodrecipe/like',this.state)
        })
        
    }

    render(){
        const imgsrc = "img/" + this.state.img
        console.log(this.props.location.state)
        if(this.props.location.state.user){
        return(
            <div id="about">
                { <Navigation dataFromParent={this.props.location.state.user}/>  }
                <div className="container" style={{marginTop: "100px"}}>
                    <div className="row">
                        <div className="col-xs-12 col-md-6"> <img src={imgsrc} className="img-responsive" alt=""/> </div>
                        <div className="col-xs-12 col-md-6">
                        <div className="about-text">
                            <h2>{this.state.food}</h2>
                            <p>{this.state.ingredients}</p>
                            <h3>CookingRecipe</h3>
                            <div className="list-style">
                            <div className="col-lg-6 col-sm-6 col-xs-12">
                                <ul>
                                {
                                this.state.content.split('\n').map( line =>{
                                    return(<span>{line}<br /></span>)
                                })
                                }
                                </ul>
                            
                        </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={this.onClickLike}>Like</button>
                    <text>{this.state.like}</text>
                    <button onClick={this.onClickLater}>SeeLater</button>
                    <text>{this.state.seelater}</text>
                </div>
                </div>
                    <button><Link to={{
                        path : "/recipe",
                        state : this.props.location.state.user}}>목록</Link></button>
                </div>
            </div>
            // <div>
            //     <h1>Food: {this.state.food}</h1>
            //     <p>CookingRecipe: {this.state.content}</p>
            //     <p>Food picture</p>
            //     <img src={imgsrc}></img>
            //     <button><Link to="/recipe">목록</Link></button>
            // </div>
        )}
        return(
            <div id="about">
                { <Navigation dataFromParent={this.props.location.state}/>  }
                <div className="container" style={{marginTop: "100px"}}>
                    <div className="row">
                        <div className="col-xs-12 col-md-6"> <img src={imgsrc} className="img-responsive" alt=""/> </div>
                        <div className="col-xs-12 col-md-6">
                        <div className="about-text">
                            <h2>{this.state.food}</h2>
                            <p>{this.state.ingredients}</p>
                            <h3>CookingRecipe</h3>
                            <div className="list-style">
                            <div className="col-lg-6 col-sm-6 col-xs-12">
                                <ul>
                                {
                                this.state.content.split('\n').map( line =>{
                                    return(<span>{line}<br /></span>)
                                })
                                }
                                </ul>
                            
                        </div>
                        </div>
                    </div>
                </div>
                </div>
                    <button><Link to={{
                        path : "/recipe",
                        state : this.props.location.state}}>목록</Link></button>
                </div>
            </div>
        )
    }
}

export default Food;