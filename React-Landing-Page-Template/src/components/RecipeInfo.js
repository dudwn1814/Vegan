import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecipeInfo extends Component {
  static defaultProps = {
    info: {
      name: '이름',
      id: 0
    }
  }
  
  handleRemove = () =>{
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }
  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing});
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }
  
  render() {
    console.log('render RecipeInfo' + this.props.info.id);
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const {
      name, id
    } = this.props.info;
    const user = this.props.dataFromParent
    return (
      <div style={style}>
        <Link to={{
            pathname: '/food',
            state: {
                user: user,
                food: name
            }
        }}><div><b>{name}</b></div></Link>
      </div>
    );
  }
}

export default RecipeInfo;