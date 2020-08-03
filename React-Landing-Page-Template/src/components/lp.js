import React, { Component } from "react";
import Restaurant_item from "./Restaurant_item";

class Listpage extends Component {
  state = {};
  render() {
    const { restaurant_item } = this.props;
    return (
        <div className="portfolio-items">
          
            {restaurant_item &&
            restaurant_item.map((itemdata) => {
                return (
                <Restaurant_item
                    key={JSON.stringify(itemdata._id)}
                    ImageURL={"img/portfolio/01-small.jpg"}
                    RestaurantName={itemdata.name}
                />
                );
            })}
        </div>
    );
  }
}
export default Listpage;