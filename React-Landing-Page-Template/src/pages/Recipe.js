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
        console.log(this.props.location.state)

        const { information, keyword } = this.state;
        const filteredList = information.filter(
            info => info.name.indexOf(keyword) !== -1
        );
        return(
            <Fragment>
                { <Navigation dataFromParent={this.props.location.state}/>  }
                
                <div style={{marginTop: "100px", marginLeft: '1710px'}}>🔍&nbsp;
                    <input
                        placeholder="검색"
                        onChange={this.handleChange}
                        value = {keyword}
                    />
                </div >
                <div className="section-title" style={{marginBottom: '20px'}}>
                <h2 style= {{textAlign: 'center'}}>레시피</h2>
                <div style={{textAlign: 'center'}}>
                  자유롭게 채식요리 레시피를 공유해주세요
               </div>
                </div>
                <button  style={{float: "right", marginRight: '20px', border: '1px solid black'  ,backgroundColor: '#ffffff', width: '130px', marginLeft: '10px', boxShadow: 'none', fontSize: '15px'}}> 
                    <Link style={{ textDecoration: 'none', color: 'black'}} to={{
                        path : "/recipeadd",
                        state : this.props.location.state}}>Add Recipe</Link>
                </button><br/><br/>
                <div style={{padding: '20px 20px'}}>
                <RecipeList
                    data= {filteredList}
                    dataFromParent = {this.props.location.state}
                    onRemove = {this.handleRemove}
                /></div>

                <button> 
                    <Link to={{
                        pathname : "/recipeadd",
                        state : this.props.location.state}}>Add Recipe</Link>
                </button>
                
            </Fragment>  
        )
    }
}

export default Recipe;
