import React, { Component, useState, Fragment } from 'react';
import axios from 'axios';
import Navigation from '../components/navigation';
import RecipeList from '../components/RecipeList';
import { Link } from 'react-router-dom';

class Recipe extends Component {
    
    id=0
    state = {
    information: [],
    keyword: ''
    }
    handleChange = (e) => {
        this.setState({
          keyword: e.target.value,
        });
      }
    
    handleRemove = (id) => {
        const { information } = this.state;
        this.setState({
          information: information.filter(info => info.id !== id)
        })
      }
    componentWillMount() {
        axios.get('http://localhost:8080/foodrecipe').then(response=>{
            var recipelist =new Array();
            for(var i=0; i< response.data.length;i++){
                recipelist.push({
                    id : i,
                    name : response.data[i].food
                })
            }
            this.setState({
                information: recipelist
            })
            console.log(recipelist)
    })
    }
   
    render(){
        
        const { information, keyword } = this.state;
        const filteredList = information.filter(
            info => info.name.indexOf(keyword) !== -1
        );
        return(
            <Fragment>
                { <Navigation dataFromParent={this.props.location.state}/>  }
                
                <div style={{marginTop: "100px"}}>
                    <input
                        placeholder="검색"
                        onChange={this.handleChange}
                        value = {keyword}
                    />
                </div>
                <hr />
                <RecipeList
                    data= {filteredList}
                    onRemove = {this.handleRemove}
                />
                <button> 
                    <Link to="/recipeadd">Add Recipe</Link>
                </button>
                
            </Fragment>  
        )
    }
}

export default Recipe;
