import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecipeInfo extends Component {
  static defaultProps = {
    info: {
      name: '이름',
      writer: '이름',
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
    console.log(this.props.info)
    const style = {
      width: '1200px',
      borderBottom: '1px solid black',
      padding: '15px',
      margin: '8px',
      fontSize: '16px',
    };

    const {
      name, writer, id
    } = this.props.info;
    
    console.log(writer)
    const user = this.props.dataFromParent
    return (
      <div style={style}>
        <Link to={{
            pathname: '/food',
            state: {
                user: this.props.dataFromParent,
                food: name
            }
        }}>
            <div>⚫&nbsp;&nbsp;&nbsp;<b>{name}</b>
              <div style={{float: "right" }}>
                {writer}
              </div>
            </div>
          </Link>
      </div>
    );
  }
}

export default RecipeInfo;