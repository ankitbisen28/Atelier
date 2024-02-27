import React from "react";
import Carousel from "react-material-ui-carousel";
import bannerOne from "../assets/Images/banner-1.jpg";
import bannerTwo from "../assets/Images/banner-2.jpg";
import bannerThree from "../assets/Images/banner-3.jpg";
import bannerFour from "../assets/Images/banner-4.jpg";

export const BannerInside = () => {
  return (
    <>
      <Carousel sx={{ height: "70vh", width: "100%", backgroundSize: "cover" }}>
        {[bannerOne, bannerTwo, bannerThree, bannerFour].map((item, i) => (
          <img
            style={{ height: "70vh", width: "100%", backgroundSize: "cover" }}
            key={i}
            alt={item}
            src={item}
          />
        ))}
      </Carousel>
    </>
  );
};
