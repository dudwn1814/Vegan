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
                    name : response.data[i].food,
                    writer : response.data[i].writer
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
                
                <div style={{marginTop: "100px", marginLeft: '1710px', outline: 'none'}}>🔍&nbsp;
                    <input
                        placeholder="검색"
                        onChange={this.handleChange}
                        value = {keyword}
                    />
                </div >
                <div className="section-title" style={{marginBottom: '20px'}}>
                <h2 style= {{textAlign: 'center'}}>레시피</h2>
                <div style={{textAlign: 'center', marginBottom: '70px'}}>
                  자유롭게 채식요리 레시피를 공유해주세요
               </div>
                </div>

                <div style={{padding: '20px 20px'}}>
                <RecipeList
                    data= {filteredList}
                    dataFromParent = {this.props.location.state}
                    onRemove = {this.handleRemove}
                /></div>
                <button  style={{backgroundColor: '#4CAF50', border: '1px solid #4CAF50', float: 'right', marginRight: '175px', width: '130px',  boxShadow: 'none', fontSize: '15px', borderRadius: '10px', padding: '5px', fontWeight: 'bold', outline: 'none',  marginTop: "20px"}}> 
                    <Link style={{ textDecoration: 'none', color: 'white'}} to={{
                         pathname : "/recipeadd",
                        state : this.props.location.state}}>Add Recipe</Link>
                </button>

                
            </Fragment>  
        )
    }
}

export default Recipe;
