import { useState, useEffect } from "react";
import Link from "next/link";
const SmallCheckout = ({ cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems?.map((product) => {
      totalPrice = totalPrice + product.price * product.quantity;
    });
    setTotalPrice(totalPrice);
  };
  useEffect(() => {
    calculateTotalPrice();
  });
  return (
    <>
      <div className="max-w-50 ">
        <div className="container mx-auto px-10 bg-white border-2 border-dotted border-gray-400">
          <h3 className="py-6">Cart Total</h3>
          <hr className="px-20"></hr>
          <div className="flex justify-between mt-10 mb-5 text-primary">
            <h3>Total</h3>
            <h3>{totalPrice} ETB</h3>
          </div>
          <div className="flex justify-center p-3 ">
            <Link
              href="/user/checkout"
              className="border-2 font-medium border-primary px-10 py-3 sm:px-40 lg:px-10 inline-block"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCheckout;
