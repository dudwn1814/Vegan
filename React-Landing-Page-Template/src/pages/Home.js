import React, { Component } from 'react';
import Navigation from '../components/navigation';
import Header from '../components/header';
import Features from '../components/features';
import About from '../components/about';
import Team from '../components/Team';
import Contact from '../components/contact';
import JsonData from '../data/data.json';
import {Link} from 'react-router-dom';

export class Home extends Component {
  state = {
    landingPageData: {},
  }
  getlandingPageData() {
    this.setState({landingPageData : JsonData})
  }

  componentDidMount() {
    this.getlandingPageData();
  }

  // componentWillMount(){
  //   console.log(this.props.location.state)
  // }
  render() {
    return (
      
      <div>
        
        <Navigation dataFromParent={this.props.location.state}/>
        
        <Header data={this.state.landingPageData.Header} />
        
        <Features data={this.state.landingPageData.Features} />
        <About data={this.state.landingPageData.About} />
 
        <Team data={this.state.landingPageData.Team} />
        <Contact data={this.state.landingPageData.Contact} />

      </div>
    )
  }
}

export default Home;
