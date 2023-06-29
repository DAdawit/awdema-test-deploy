import Image from "next/image";
import Link from "next/link";
import { IconAddToCart } from "../../Icons/IconAddToCart";
import { ADDTO_CART } from "@/graphql";
import client from "../../../apollo-client";
import { useState } from "react";
import Spinner from "../../Icons/Spinner";
import { showToast } from "../showToast ";

const ResponsiveMainProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);

  const addTocart = async (id) => {
    setLoading(true);

    console.log(id);
    const cartItem = {
      productId: id,
      productColorId: null,
      productModelId: null,
    };

    client
      .mutate({
        mutation: ADDTO_CART,
        variables: cartItem,
      })
      .then((res) => {
        setLoading(false);
        showToast("success", "Product added to cart successfully!");
        // notifySuccess("product added to cart ");
        // console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        showToast("error", err.message);
      });
  };

  return (
    <>
      {/* <ToastContainer /> */}

      <div className="container mx-auto relative ">
        <div className="shadow-lg  opacity-95 hover:opacity-100 min-w-64">
          <Link
            href={`/products/detail/${product.id}`}
            className="flex justify-center"
          >
            <Image
              src={`https://awdma.afroel.com/media/${product.image}`}
              blurDataURL="/gr1.png"
              alt="product image"
              height={400}
              width={400}
              className="w-full  md:w-64 h-56 object-cover brightness-100 "
            />
          </Link>

          <div className="grid">
            <h3 className="font-medium text-lg text-gray-900 tracking-wide font-sans pl-3 mt-2">
              {product.name}
            </h3>
            <h3 className="text-sm font-mono font-medium tracking-wider  text-gray-500 pl-3 truncate">
              {product.description}
            </h3>
            <h3 className=" p-1 font-sans rounded-full opacity-90 bg-gray-200 text-primary font-bold absolute top-2 left-2">
              {product.price} <span className="text-xs">Birr</span>
            </h3>
            <div className="sm:flex justify-center">
              <button
                onClick={() => addTocart(product.id)}
                className="whitespace-nowrap flex items-center  justify-center bg-primary text-white  py-1 px-3 rounded-md mx-2 mb-1 hover:scale-105 transition mt-2 w-full"
              >
                Add To Cart
                <span className=" text-base pl-2">
                  {loading ? <Spinner /> : <IconAddToCart />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveMainProductCard;
