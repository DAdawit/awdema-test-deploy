import React from "react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";
const Services = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 px-5 md:px-10 gap-3 mt-5 mb-10">
        <div className="flex flex-col justify-center bg-primary gap-2 rounded-lg py-3 px-2">
          <button className="self-center text-white">
            <LocalShippingOutlinedIcon />
          </button>
          <h1 className="text-center font-bold text-lg text-gray-200 tracking-wider">
            Sustainable Delivery
          </h1>
          <p className="text-center text-sm text-sans tracking-wide font-medium text-gray-200">
            Emphasize your commitment to sustainable products and eco-friendly
            shipping options.
          </p>
        </div>
        <div className="flex flex-col justify-center bg-primary gap-2 rounded-lg py-3 px-2">
          <button className="self-center text-white">
            <StorefrontOutlinedIcon />
          </button>
          <h1 className="text-center font-bold text-lg text-gray-200 tracking-wider">
            Shop green, arrive clean
          </h1>
          <p className="text-center text-sm text-sans tracking-wide font-medium text-gray-200">
            Promote your eco-friendly products and highlight their benefits,
            such as reducing waste, conserving energy,
          </p>
        </div>
        <div className="flex flex-col justify-center bg-primary gap-2 rounded-lg py-3 px-2">
          <button className="self-center text-white">
            <FlashOnOutlinedIcon />
          </button>
          <h1 className="text-center font-bold text-lg text-gray-200 tracking-wider">
            Eco-fast
          </h1>
          <p className="text-center text-sm text-sans tracking-wide font-medium text-gray-200">
            good for you, good for the planet: Position your brand as a provider
            of both convenience and sustainability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
