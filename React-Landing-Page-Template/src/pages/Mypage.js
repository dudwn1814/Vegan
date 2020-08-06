import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/navigation';


class Mypage extends Component {

    state = {
        loading: false,
        my_recipe: [],
        my_restaurant: [],
        like_recipe: [],
        later_recipe: [],
        like_restaurant: [],
        later_restaurant: [],
        name: '',
        pw: ''
    }

    loadItem() {
        this.setState({
            name: this.props.location.state
        })
        var NAME =this.props.location.state;

        axios.get("http://localhost:8080/myitem?name="+NAME)
            .then((response) => {
              var my_recipe_list = [];  // food name만
              var my_restaurant_list = [];  // area + name
              var like_recipe_list = [];
              var later_recipe_list = [];
              var like_restaurant_list = [];
              var later_restaurant_list = [];
            
            console.log(response.data)

              for (var i = 0; i < response.data.length; i++) {
                for (var j = 0; j < response.data[i].upload.length; j++) {
                    if (response.data[i].upload[j][0] == 'food') {
                        my_recipe_list.push(response.data[i].upload[j][1]);
                    }
                    else {
                        my_restaurant_list.push([response.data[i].upload[j][1],response.data[i].upload[j][2]]);
                    }
                }

                for (var j = 0; j < response.data[i].like.length; j++) {
                    if (response.data[i].like[j][0] == 'food') {
                        like_recipe_list.push(response.data[i].like[j][1]);
                    }
                    else {
                        like_restaurant_list.push([response.data[i].like[j][1],response.data[i].upload[j][2]]);
                    }
                }
                
                for (var j = 0; j < response.data[i].seelater.length; j++) {
                    if (response.data[i].seelater[j][0] == 'food') {
                        later_recipe_list.push(response.data[i].seelater[j][1]);
                    }
                    else {
                        later_restaurant_list.push([response.data[i].seelater[j][1],response.data[i].seelater[j][2]]);
                    }
                }
              }
              this.setState({
                loading: true,
                my_recipe: my_recipe_list,
                my_restaurant: my_restaurant_list,
                like_recipe: like_recipe_list,
                later_recipe: later_recipe_list,
                like_restaurant: like_restaurant_list,
                later_restaurant: later_restaurant_list
              });
            })
            .catch(e => {
              console.error(e);
              this.setState({
                loading: false
              });
            });
      }

    componentWillMount() {
    
        this.loadItem();
            // loadItem 호출
    }

    render(){
        const {name} = this.props.location.state;
        const {my_recipe, my_restaurant, like_recipe, later_recipe, like_restaurant, later_restaurant} = this.state;

        console.log('my_recipe: '+my_recipe)
        console.log('my_restaurant: '+my_restaurant)
        console.log('like_recipe: '+like_recipe)
        console.log('later_recipe: '+later_recipe)
        console.log('like_restaurant: '+like_restaurant)
        console.log('later_restaurant: '+later_restaurant)

        return (
            <Fragment>
                <Navigation dataFromParent={this.props.location.state}/>

                <div style={{marginLeft: '15px', fontSize: '20px', marginTop: '120px', color: 'darkgreen', fontWeight: 'bold'}}>내가 올린 레시피</div>
                <hr style={{float: 'left', marginLeft: '15px', width: '1850px', background: 'limegreen'}}/>

                <tbody>
                    {my_recipe.map(function(my_recipe, i) {
                        return (
                            <div>{my_recipe}</div>
                        )
                    })}
                </tbody>
                

                <div style={{marginTop: '10px', marginLeft: '15px', fontSize: '20px', color: 'darkgreen', fontWeight: 'bold'}}>내가 올린 식당</div>
                <hr style={{float: 'left', marginLeft: '15px', width: '1850px', background: 'limegreen'}}/>

                <tbody>
                    {my_restaurant.map(function(my_restaurant, i) {
                        return (
                            <div>{my_restaurant}</div>
                        )
                    })}
                </tbody>

                <div style={{marginTop: '10px', marginLeft: '15px', fontSize: '20px', color: 'darkgreen', fontWeight: 'bold'}}>좋아요한 레시피</div>
                <hr style={{float: 'left', marginLeft: '15px', width: '1850px', background: 'limegreen'}}/>

                <tbody>
                    {like_recipe.map(function(like_recipe, i) {
                        return (
                            <div>{like_recipe}</div>
                        )
                    })}
                </tbody>

                <div style={{marginTop: '10px', marginLeft: '15px', fontSize: '20px', color: 'darkgreen', fontWeight: 'bold'}}>나중에 볼 레시피</div>
                <hr style={{float: 'left', marginLeft: '15px', width: '1850px', background: 'limegreen'}}/>

                <tbody>
                    {later_recipe.map(function(later_recipe, i) {
                        return (
                            <div>{later_recipe}</div>
                        )
                    })}
                </tbody>

                <div style={{marginLeft: '15px', fontSize: '20px', color: 'darkgreen', fontWeight: 'bold'}}>좋아요한 식당</div>
                <hr style={{float: 'left', marginLeft: '15px', width: '1850px', background: 'limegreen'}}/>

                <tbody>
                    {like_restaurant.map(function(like_restaurant, i) {
                        return (
                            <div>{like_restaurant}</div>
                        )
                    })}
                </tbody>

                <div style={{marginLeft: '15px', fontSize: '20px', color: 'darkgreen', fontWeight: 'bold'}}>가고 싶은 식당</div>
                <hr style={{float: 'left', marginLeft: '15px', width: '1850px', background: 'limegreen'}}/>

                <tbody>
                    {later_restaurant.map(function(later_restaurant, i) {
                        return (
                            <div>{later_restaurant}</div>
                        )
                    })}
                </tbody>

            </Fragment>
        );
    }






}
export default Mypage;
