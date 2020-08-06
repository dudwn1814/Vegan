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
        seelater: 0,
        isWriter: false,
        isLike: false,
        isLater: false
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
        if(this.props.location.state.user){
            axios.get('http://localhost:8080/users/name/'+this.props.location.state.user).then(res =>{
                console.log(this.state.food)

                if(res.data[0].upload.find(c => c==='food'+this.props.location.state.food)){
                    this.setState({
                        isWriter : true
                    })
                }
                if(res.data[0].like.find(c => c==='food'+this.props.location.state.food)){
                    this.setState({
                        isLike : true
                    })
                }
                if(res.data[0].seelater.find(c => c==='food'+this.props.location.state.food)){
                    this.setState({
                        isLater : true
                    })
                }
                console.log(this.state)
            })
        }
    }

    onClickLike=()=>{
        console.log(this.props.location.state)
        let key = 'food';
        let likefood = this.props.location.state.food
        axios.post('http://localhost:8080/users/like',{key:key, name: this.props.location.state.user, like: likefood})
        this.setState({
            like : this.state.like + 1,
            isLike : true
        })
        console.log(this.state.like)
        axios.post('http://localhost:8080/foodrecipe/like', {img:this.state.img ,like: this.state.like+1})
        
    }
    onClickLater=()=>{
        console.log(this.props.location.state)
        let key = 'food';
        let laterfood = this.props.location.state.food
        axios.post('http://localhost:8080/users/later',{key: key, name: this.props.location.state.user, later: laterfood})
        this.setState({
            seelater : this.state.seelater + 1,
            isLater : true
        })
        
        axios.post('http://localhost:8080/foodrecipe/seelater', {img:this.state.img, seelater: this.state.seelater+1})
    }

    render(){
        const imgsrc = "img/" + this.state.img
        let writerexist = ''
        let thisfood = 'food' + this.state.food
        
        
        console.log(this.props.location.state)
        if(this.props.location.state.user&&!this.state.isWriter&&!this.state.isLater&&!this.state.isLike){
        return(
            <div id="about">
                { <Navigation dataFromParent={this.props.location.state.user}/>  }
                <div className="container" style={{marginTop: "100px"}}>

                <button style={{border: 'none', backgroundColor: 'white'}}><Link style={{fontSize: '25px', fontWeight: 'bold', color:'darkgreen'}} to={{
                        pathname : "/recipe",
                        state : this.props.location.state.user}}>⬅</Link></button>


                    <button style={{backgroundColor: 'white', border: 'none', outline: 'none', marginLeft:'390px'}} onClick={this.onClickLike}>❤️</button>
                    <text>{this.state.like}&nbsp;&nbsp;&nbsp;</text>
                    <button style={{backgroundColor: 'white', border: 'none', outline: 'none'}} onClick={this.onClickLater}>⭐</button>
                    <text>{this.state.seelater}</text>



                    <div className="row">   
                        <div className="col-xs-12 col-md-6"> <img src={imgsrc} className="img-responsive" alt=""/> </div>
                        <div className="col-xs-12 col-md-6">
                        <div className="about-text">
                        <h2 style={{marginBottom: '50px'}}>{this.state.food}</h2>
                            <h4>재료</h4>
                            <div>{this.state.ingredients}</div>
                            <h4 style={{marginTop: '30px'}}>레시피</h4>
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
        else if(this.state.isWriter){
            return(
                <div id="about">
                    { <Navigation dataFromParent={this.props.location.state.user}/>  }
                    <div className="container" style={{marginTop: "100px"}}>

                    <button style={{border: 'none', backgroundColor: 'white', outline: 'none'}}><Link style={{fontSize: '25px', fontWeight: 'bold', color:'darkgreen'}} to={{
                        pathname : "/recipe",
                        state : this.props.location.state.user}}>⬅</Link></button>

                        <button style={{backgroundColor: 'white', border: 'none', outline: 'none', marginLeft:'370px'}}>❤️</button>
                        <text>{this.state.like}&nbsp;&nbsp;&nbsp;</text>
                        <button style={{backgroundColor: 'white', border: 'none', outline: 'none'}}>⭐</button>
                        <text>{this.state.seelater}</text>
        


                        <div className="row">
                            <div className="col-xs-12 col-md-6"> <img style={{width: '500px', height: '380px'}} src={imgsrc} className="img-responsive" alt=""/> </div>
                            <div className="col-xs-12 col-md-6">
                            <div className="about-text">
                            <h2 style={{marginBottom: '50px'}}>{this.state.food}</h2>
                                <h4>재료</h4>
                                <div>{this.state.ingredients}</div>
                                <h4 style={{marginTop: '30px'}}>레시피</h4>
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
                        <button >Like</button>
                        <text>{this.state.like}</text>
                        <button >SeeLater</button>
                        <text>{this.state.seelater}</text>
                    </div>
                    </div>
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
        else if(this.state.isLike&&!this.state.isLater){
            return(
                <div id="about">
                    { <Navigation dataFromParent={this.props.location.state.user}/>  }
                    <div className="container" style={{marginTop: "100px"}}>

                    <button style={{border: 'none', backgroundColor: 'white', outline: 'none'}}><Link style={{fontSize: '25px', fontWeight: 'bold', color:'darkgreen'}} to={{
                        pathname : "/recipe",
                        state : this.props.location.state.user}}>⬅</Link></button>

                        <button style={{backgroundColor: 'white', border: 'none', outline: 'none', marginLeft:'370px'}}>❤️</button>
                        <text>{this.state.like}&nbsp;&nbsp;&nbsp;</text>
                        <button style={{backgroundColor: 'white', border: 'none', outline: 'none'}} onClick={this.onClickLater}>⭐</button>
                        <text>{this.state.seelater}</text>
               

                        <div className="row">
                            <div className="col-xs-12 col-md-6"> <img style={{width: '500px', height: '380px'}} src={imgsrc} className="img-responsive" alt=""/> </div>
                            <div className="col-xs-12 col-md-6">
                            <div className="about-text">
                            <h2 style={{marginBottom: '50px'}}>{this.state.food}</h2>
                                <h4>재료</h4>
                                <div>{this.state.ingredients}</div>
                                <h4 style={{marginTop: '30px'}}>레시피</h4>
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
        else if(this.state.isLater&&!this.state.isLike){
            return(
                <div id="about">
                    { <Navigation dataFromParent={this.props.location.state.user}/>  }
                    <div className="container" style={{marginTop: "100px"}}>

                    <button style={{border: 'none', backgroundColor: 'white', outline: 'none'}}><Link style={{fontSize: '25px', fontWeight: 'bold', color:'darkgreen'}} to={{
                        pathname : "/recipe",
                        state : this.props.location.state.user}}>⬅</Link></button>

                        <button style={{backgroundColor: 'white', border: 'none', outline: 'none', marginLeft:'370px'}} onClick={this.onClickLike}>❤️</button>
                        <text>{this.state.like}&nbsp;&nbsp;&nbsp;</text>
                        <button  style={{backgroundColor: 'white', border: 'none', outline: 'none'}}>⭐</button>
                        <text>{this.state.seelater}</text>
           

                        <div className="row">
                            <div className="col-xs-12 col-md-6"> <img style={{width: '500px', height: '380px'}} src={imgsrc} className="img-responsive" alt=""/> </div>
                            <div className="col-xs-12 col-md-6">
                            <div className="about-text">
                            <h2 style={{marginBottom: '50px'}}>{this.state.food}</h2>
                                <h4>재료</h4>
                                <div>{this.state.ingredients}</div>
                                <h4 style={{marginTop: '30px'}}>레시피</h4>
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
        else{
        return(
            <div id="about">
                { <Navigation dataFromParent={this.props.location.state.user}/>  }
                <div className="container" style={{marginTop: "100px"}}>


                <button style={{border: 'none', backgroundColor: 'white', outline: 'none'}}><Link style={{fontSize: '25px', fontWeight: 'bold', color:'darkgreen'}} to={{
                        pathname : "/recipe",
                        state : this.props.location.state.user}}>⬅</Link></button>

                
                    <button style={{backgroundColor: 'white', border: 'none', outline: 'none', marginLeft:'370px'}}>❤️</button>
                    <text>{this.state.like}&nbsp;&nbsp;&nbsp;</text>
                    <button style={{backgroundColor: 'white', border: 'none', outline: 'none'}}>⭐</button>
                    <text>{this.state.seelater}</text>
                

                    <div className="row">
                        <div className="col-xs-12 col-md-6"> <img style={{width: '500px', height: '380px'}} src={imgsrc} className="img-responsive" alt=""/> </div>
                        <div className="col-xs-12 col-md-6">
                        <div className="about-text">
                            <h2 style={{marginBottom: '50px'}}>{this.state.food}</h2>
                            <h4>재료</h4>
                            <div>{this.state.ingredients}</div>
                            <h4 style={{marginTop: '30px'}}>레시피</h4>
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
                </div>
            </div>
        )
        }
    }
}

export default Food;