import React, { Component } from "react";
import Restaurant_item from "./Restaurant_item";
import path from 'path';

class Listpage extends Component {
  state = {};
  render() {
    console.log(this.props.dataFromParent)
    const { restaurant_item } = this.props;
    return (
        <div className="portfolio-items">
          
            {restaurant_item &&
            restaurant_item.map((itemdata) => {

              var url = itemdata.url;
                
                return (
                <Restaurant_item
                    key={JSON.stringify(itemdata._id)}
                    ImageURL={url}
                    Area={itemdata.area}
                    RestaurantName={itemdata.name}
                    User={this.props.dataFromParent}
                />
                );
            })}
        </div>
    );
  }
}
export default Listpage;