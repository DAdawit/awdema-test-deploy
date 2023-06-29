import { useState, useEffect } from "react";
const TotalPrice = ({ cartItems }) => {
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
      <h1 className="text-2xl font-medium text-primary my-2">
        Total Price : {totalPrice} Birr
      </h1>
    </>
  );
};
export default TotalPrice;
