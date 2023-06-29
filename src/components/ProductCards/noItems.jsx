const NoItems = ({ type, message }) => {
  return (
    <>
      {/* {type} */}
      <div className="flex flex-col justify-center items-center h-screen pt-20">
        {/* eslint-disable-next-line */}
        <img
          // src="/noitems.jpg"
          src={type == "cart" || "wishlist" ? `/emptyCart.jpg` : `/noitems.jpg`}
          alt="shop banner"
          className="object-contain h-96"
        />

        <h1 className="text-center mt-16 text-2xl font-bold text-primary h-screen font-serif">
          {message}
        </h1>
      </div>
    </>
  );
};

export default NoItems;
