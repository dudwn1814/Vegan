import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/navigation';

class Food extends Component {

    state = {
        food: '',
        ingredients: '',
        img: '',
        content: ''
    }
    componentWillMount() {
        axios.get('http://localhost:8080/foodrecipe/'+this.props.location.state).then(response=>{
            this.setState({
                food: response.data[0].food,
                ingredients: response.data[0].ingredients,
                img: response.data[0].img,
                content: response.data[0].content
            })
            console.log(response.data.food)
            console.log(response.data)
        })
    }

    render(){
        const imgsrc = "img/" + this.state.img
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
                                <button><Link to="/recipe">목록</Link></button>
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
        )
    }
}

export default Food;