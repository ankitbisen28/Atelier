import React from "react";
import cat_one from "../assets/Images/cat-1.jpg";
import cat_two from "../assets/Images/cat-2.jpg";
import cat_three from "../assets/Images/cat-3.jpg";

const cats = [
  { name: "Men's Dresses", img: cat_one },
  { name: "Women's dresses", img: cat_two },
  { name: "Kid's Dresses", img: cat_three },
];

export const ClothCategory = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {cats.map((item, index) => (
        <div
          key={index}
          className="w-[30%] h-[40vh] flex flex-col items-center justify-center"
        >
          <img
            alt="cloths category"
            src={item.img}
            className="w-[300px] h-[250px]"
          />
          <p className="mt-2 text-center">{item.name}</p>
        </div>
      ))}
    </div>
  );
};
