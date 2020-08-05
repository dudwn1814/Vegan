import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/navigation';


class Mypage extends Component {


    render(){
        return (

            <Fragment>
                <Navigation dataFromParent={this.props.location.state}/>
            </Fragment>
        )
    }






}
export default Mypage;
