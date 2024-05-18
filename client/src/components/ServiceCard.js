import React from "react";

export const ServiceCard = ({ Icon, product }) => {
  return (
    <div className="w-4/5 md:w-1/2 h-[15vh] flex flex-row justify-center items-center border border-gray-300 rounded-md">
      <Icon className="text-secondary" style={{ fontSize: '2rem' }} />
      <p className="ml-2 text-lg font-bold">{product}</p>
    </div>
  );
};
