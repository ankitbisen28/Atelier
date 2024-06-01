import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannerOne from "../assets/Images/banner-1.jpg";
import bannerTwo from "../assets/Images/banner-2.jpg";
import bannerThree from "../assets/Images/banner-3.jpg";
import bannerFour from "../assets/Images/banner-4.jpg";
import { Link } from "react-router-dom";

export const BannerInside = () => {
  const banners = [
    {
      image: bannerOne,
      text: "Post Your first Job",
      buttonText: "Post Now",
      buttonLink: "/postJob",
    },
    {
      image: bannerTwo,
      text: "Apply Your First Job",
      buttonText: "Apply Job",
      buttonLink: "listjobs",
    },
    {
      image: bannerThree,
      text: "Discover our third banner",
      buttonText: "Get Started",
      buttonLink: "#link3",
    },
    {
      image: bannerFour,
      text: "Enjoy our fourth banner",
      buttonText: "Contact Us",
      buttonLink: "#link4",
    },
  ];

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
      className="w-full h-[70vh]"
    >
      {banners.map((banner, i) => (
        <div key={i} className="relative w-full h-[70vh]">
          <img
            className="object-cover w-full h-full"
            alt={`banner-${i + 1}`}
            src={banner.image}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">{banner.text}</h2>
            <Link
              to={banner.buttonLink}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              {banner.buttonText}
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
  );
};
