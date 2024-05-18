import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannerOne from "../assets/Images/banner-1.jpg";
import bannerTwo from "../assets/Images/banner-2.jpg";
import bannerThree from "../assets/Images/banner-3.jpg";
import bannerFour from "../assets/Images/banner-4.jpg";

export const BannerInside = () => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
      className="w-full h-[70vh]"
    >
      {[bannerOne, bannerTwo, bannerThree, bannerFour].map((item, i) => (
        <div key={i} className="w-full h-[70vh]">
          <img
            className="object-cover w-full h-full"
            alt={`banner-${i + 1}`}
            src={item}
          />
        </div>
      ))}
    </Carousel>
  );
};
