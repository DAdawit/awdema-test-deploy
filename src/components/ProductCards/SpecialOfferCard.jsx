import { IconAddToCart } from "@/Icons/IconAddToCart";
import Image from "next/image";
import Link from "next/link";
const SpecialOfferCard = () => {
  return (
    <>
      <h1 className="text-3xl pt-5 font-bold text-gray-800 text-center font-serif tracking-wider">
        Special Offers
      </h1>
      <div className="grid sm:flex justify-center items-center px-5">
        <div className="self-center mx-auto sm:mx-0">
          <Link href="#">
            <Image
              className="h-72 w-80 object-contain text-center"
              src="/specialOffer2.png"
              alt="product image"
              height={400}
              width={400}
            />
          </Link>
        </div>
        <div className="mt-1">
          <h3 className="text-2xl text-primary font-bold tracking-wider">
            Unique features of latest & Trending Products
          </h3>
          <h3 className="mt-5 text-xl font-sans font-medium text-gray-900 tracking-widest ">
            Wireless Headset
          </h3>
          <p className="max-w-lg mt-3 text-sm font-mono font-bold text-gray-800">
            This wireless headset delivers high-quality sound and is comfortable
            for long gaming sessions. It also has noise-cancelling technology to
            improve your gaming experience.
          </p>
          <div className="flex gap-2 items-center mt-2">
            <button
              // onClick={() => addTocart(product.id)}
              className="whitespace-nowrap font-mono w-max flex items-center justify-center bg-primary text-white text-base py-1 px-3  mx-2 mb-1 hover:scale-105 transition mt-2"
            >
              Add To Cart
              {/* <span className=" text-base pl-2">
              {loading ? <Spinner /> : <IconAddToCart />}
            </span> */}
              <IconAddToCart />
            </button>
            <h1 className="text-lg font-sans font-medium text-primary">
              2500 Birr
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialOfferCard;
