import React from 'react';

function Restaurant_item({ImageURL, RestaurantName}) {

    

    return (

        <div className="col-sm-6 col-md-4 col-lg-4">
        <div className="portfolio-item">
        <div className="hover-bg">
            {" "}
            <a
            href="/Restaurant_Info"
            title="Project Title"
            data-lightbox-gallery="gallery1"
            >
            <div className="hover-text">
                <h4>{RestaurantName}</h4>
            </div>
            <img
                src="img/portfolio/01-small.jpg"
                className="img-responsive"
                alt="Project Title"
            />{" "}
            </a>{" "}
        </div>
        </div>
        </div>
    );
  }

export default Restaurant_item;
