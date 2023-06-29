import Link from "next/link";
import Image from "next/image";
import AddToCartText from "../Buttons/AddToCartText";
import Spinner from "../../Icons/Spinner";
import { useState } from "react";
import client from "../../../apollo-client";
import { ADDTO_CART } from "@/graphql";
import { showToast } from "../showToast ";
const SimpleCard = ({ id, product }) => {
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
      <div className="flex relative">
        <div className=" border bottom-1 shadow-lg bg-white opacity-95 hover:opacity-100">
          <Link href={`/product/detail/${product.id}`} className="m-0">
            <Image
              className="block contain h-32"
              src={`https://awdma.afroel.com/media/${product.image}`}
              blurDataURL="/gr1.png"
              alt="product image"
              width={150}
              height={80}
            />
          </Link>

          <div className="flex justify-center">
            <button
              onClick={() => addTocart(product.id)}
              className=" text-primary flex justify-center items-center"
            >
              Add To Cart
              <span className=" text-base pl-2">
                {loading ? <Spinner /> : null}
              </span>
            </button>
          </div>

          <h3 className="p-1 font-sans rounded-full opacity-90 bg-gray-200 text-primary font-bold absolute top-2 left-2">
            {product.price} <span className="text-xs">Birr</span>
          </h3>

          {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
        </div>
      </div>
    </>
  );
};

export default SimpleCard;
