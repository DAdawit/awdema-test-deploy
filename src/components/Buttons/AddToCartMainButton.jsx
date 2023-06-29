import { forwardRef, useImperativeHandle, useRef } from "react";
import Link from "next/link";
import { IconAddToCart } from "../../Icons/IconAddToCart";

export const AddToCartMainButton = (props) => {
  // console.log(props);
  return (
    <>
      <button
        onClick={props.addTocart}
        className=" whitespace-nowrap	w-max flex items-center justify-center bg-primary text-white text-base py-1 px-3 rounded-md mx-2 mb-1 hover:scale-105 transition mt-2"
      >
        Add To Cart
        <span className=" text-base pl-2">
          <IconAddToCart />
        </span>
      </button>
    </>
  );
};

export default AddToCartMainButton;
