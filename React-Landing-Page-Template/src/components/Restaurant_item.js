import React from 'react';

function Restaurant_item({ImageURL, Area, RestaurantName, User}) {
    console.log(User)
    var url = "/Restaurant_Info?area="+Area+"&name="+RestaurantName+"&user="+User;

    return (

        <div className="col-sm-6 col-md-4 col-lg-4">
        <div className="portfolio-item">
        <div className="hover-bg">
            {" "}
            <a
            href={url}
            title="Project Title"
            data-lightbox-gallery="gallery1"
            >
            <div className="hover-text">
                <h4>{RestaurantName}</h4>
            </div>
            <img
                src={ImageURL}
                className="img-responsive"
                alt="Project Title"
                style={{width: '400px', height: '280px'}}
            />{" "}
            </a>{" "}
        </div>
        </div>
        </div>
    );
  }

export default Restaurant_item;
