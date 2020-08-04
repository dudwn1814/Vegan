import React, { Component } from 'react';
import RecipeInfo from './RecipeInfo';

class RecipeList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined'),
    
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.data !== this.props.data;
  }

  render() {
    console.log('render RecipeList');
    const { data, onRemove} = this.props;
    const list = data.map(
      info => (
        <RecipeInfo
          key= {info.id}
          info={info}
          dataFromParent = {this.props.dataFromParent}
          onRemove={onRemove}
        />)
    );
    return (
      <div>
        {list}
      </div>
    );
  }
}

export default RecipeList;