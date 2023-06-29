import Image from "next/image";
import Link from "next/link";
import AddToCartMainButton from "../Buttons/AddToCartMainButton";
import Spinner from "../../Icons/Spinner";
import { IconAddToCart } from "../../Icons/IconAddToCart";
import { useState } from "react";
import client from "../../../apollo-client";
import { ADDTO_CART } from "@/graphql";
import { showToast } from "../showToast ";

const MainProductCard = ({ id, product }) => {
  // const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const addTocart = async (id) => {
    setLoading(true);

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
      })
      .catch((err) => {
        setLoading(false);
        showToast("error", err.message);
      });
  };

  return (
    <>
      <div className="container mx-auto px-5">
        <div className="hover:shadow-lg bg-white opacity-95 hover:opacity-100 min-w-min">
          <div className="flex">
            <Link href={`/product/detail/${id}`} className="">
              <Image
                className="rounded-t-lg h-52 sm:w-full w-60 block"
                src={`https://awdma.afroel.com/media/${product.image}`}
                alt="product image"
                height={400}
                width={400}
              />
            </Link>
            <div className="flex flex-col justify-center ">
              <h3 className="flex sm:hidden text-base pl-3">{product.name}</h3>

              <h3 className="flex sm:hidden text-base text-sky-950 pl-3 truncate">
                {product.description}
              </h3>
              <h3 className="flex sm:hidden pl-3 text-btnPrimary text-base">
                Birr {product.price}
              </h3>
              <div className="flex sm:hidden ">
                <button
                  onClick={() => addTocart(product.id)}
                  className=" whitespace-nowrap	 flex items-center justify-center bg-btnPrimary text-white text-base py-1 px-3 rounded-md mx-2 mb-1 hover:scale-105 transition mt-2 w-full"
                >
                  Add To Cart
                  <span className=" text-base pl-2">
                    {loading ? <Spinner /> : <IconAddToCart />}
                  </span>
                </button>{" "}
              </div>
            </div>
          </div>

          <div className="grid">
            <h3 className="hidden sm:flex text-base pl-3">{product.name}</h3>
            <h3 className="hidden sm:flex text-base text-sky-950 pl-3 truncate">
              {product.description}
            </h3>
            <h3 className="pl-3 hidden sm:flex text-btnPrimary text-base">
              Birr {product.price}
            </h3>
            <div className="hidden sm:flex justify-center">
              <button
                onClick={() => addTocart(product.id)}
                className=" whitespace-nowrap	 flex items-center justify-center bg-btnPrimary text-white text-base py-1 px-3 rounded-md mx-2 mb-1 hover:scale-105 transition mt-2 w-full"
              >
                Add To Cart
                <span className=" text-base pl-2">
                  {loading ? <Spinner /> : <IconAddToCart />}
                </span>
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainProductCard;
