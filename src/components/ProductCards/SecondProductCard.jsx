import Image from "next/image";
import Link from "next/link";
import AddToCartMainButton from "../Buttons/AddToCartMainButton";

const SecondProductCard = ({ id }) => {
  return (
    <>
      <div className="hover:shadow-lg bg-white opacity-95 hover:opacity-100 ">
        <div className="flex">
          <Link href={`products/detail/${id}`} className="">
            <Image
              className=""
              src={"/pro" + id + ".png"}
              alt="product image"
              height="80"
              width="150"
            />
          </Link>
          <div className="flex flex-col justify-center px-3">
            <h3 className="font-medium text-lg text-gray-900 tracking-wide font-sans mt-2">
              Samsung Product
            </h3>
            <p className="text-base text-gray-700 truncate font-mono">
              Samsung Authomatic description
            </p>
            <h3 className="flex sm:hidden  text-primary text-base">
              Birr 53000
            </h3>
            <div className="">
              <AddToCartMainButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondProductCard;
