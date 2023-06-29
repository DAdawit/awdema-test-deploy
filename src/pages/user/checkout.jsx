import { MY_CART } from "@/graphql";
import client from "../../../apollo-client";
import { useQuery } from "@apollo/client";
import CustomLoading from "@/components/customLoading";
import { showToast } from "@/components/showToast ";
import Image from "next/image";
import TotalPrice from "@/components/user/totalPrice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import IconCheckout from "@/Icons/IconCheckout";
import Spinner from "@/Icons/Spinner";
import axios from "axios";
import { ORDER } from "@/graphql";
import Link from "next/link";
import Head from "next/head";
const Checkout = () => {
  const [ordering, setOrdering] = useState(false);
  const [showBackToHomeButton, setBackToHomeButton] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      deliveryMethod: "",
      deliveryAddressCurrentAddress: true,
      locationLat: "",
      locationLon: "",
    },
  });
  const { data, loading, error, refetch } = useQuery(MY_CART, {
    context: {
      headers: {
        authorization: `JWT ${localStorage.getItem("token")}`,
      },
    },
  });

  if (loading) {
    return <CustomLoading message={"Fetching Cart Items"} />;
  }
  const placeOrder = (data) => {
    client
      .mutate({
        mutation: ORDER,
        variables: data,
      })
      .then((res) => {
        // console.log(res);
        setOrdering(false);
        setBackToHomeButton(true);
        showToast("success", "Products ordered successfully!");
      })
      .catch((err) => {
        setOrdering(false);
        // console.log(err.message);
        setBackToHomeButton(true);

        showToast("error", err.message);
      });
  };
  const onSubmit = async (data) => {
    setOrdering(true);
    await axios
      .get("https://ipapi.co/json")
      .then((res) => {
        // console.log(res.data);
        data.locationLat = res.data.latitude;
        data.locationLon = res.data.longitude;
        placeOrder(data);
      })
      .catch((err) => {
        SeterrorInGettingLocation(true);
      });
  };
  return (
    <>
      <Head>
        <title>checkout </title>
      </Head>
      <div className="grid md:flex justify-evenly">
        <div className=" w-full md:w-96 grid items-center md:shadow-md shadow-gray-400 px-5 sm:px-10 md:px-16 mt-16 mb-1 ">
          <section className="flex justify-center bg-white">
            <div className="px-2 sm:px-10 justify-center">
              <h1 className="text-4xl  text-primary font-medium mt-5">
                Order Summary
              </h1>
              {!loading && error ? <div>{error}</div> : null}
              {!loading && data.myCart?.products ? (
                <div>
                  <div>
                    {/* <p>{cartItems.orderItems?.cartItems?.totalPrice}</p> */}
                    <p className="py-5">
                      Check your item and selector shipping for better
                      experience order item
                    </p>
                  </div>
                  <section className=" p-2 w-full">
                    <div className="grid gap-2">
                      {data.myCart?.products.map((item) => (
                        <div
                          key={item.ProductId}
                          className="flex justify-evenly border-dotted  border-b-2"
                        >
                          <div className="flex items-center mr-2">
                            <Image
                              src={`https://awdma.afroel.com${item.image}`}
                              height="80"
                              width="80"
                              alt="pro image"
                              className="rounded-lg object-contain h-20 w-20"
                            />
                          </div>
                          <div className="grid w-40">
                            <h1 className="font-medium "> {item.name}</h1>
                            <p className="truncate">
                              category Name
                              {/* {item.product?.category?.name} */}
                            </p>
                            <p className="truncate pl-5 text-gray-500 font-light text-sm">
                              {item.quantity} *{item.price}
                              {/* {item.product?.category?.name} */}
                            </p>
                          </div>
                          <div className="grid w-40 text-center">
                            <p className="truncate">Total Price</p>
                            <p className="truncate">
                              {item.quantity * item.price} Birr
                            </p>
                          </div>
                          <hr />
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              ) : null}
            </div>
          </section>
        </div>
        <div className="bg-orange md:w-1/3 flex-wrap ">
          <section className=" md:mt-0 mb-10">
            <div className="h-min hidden md:flex ">
              {/* eslint-disable-next-line */}
              <img
                src="/checkout.jpg"
                alt="shop banner"
                className="object-contain h-96 -mt-18 sm:mt-10 sm:pt-20 "
              />
            </div>
            <span className="text-center ">
              <TotalPrice cartItems={data.myCart?.products} />
            </span>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid justify-evenly pt-0  md:pt-3"
            >
              <div className="grid">
                <label htmlFor="deliveryMethod" className="">
                  Delevery for
                </label>
                <select
                  id="deliveryMethod"
                  {...register("deliveryMethod", {
                    required: "This field is required",
                  })}
                >
                  <option value="" disabled selected>
                    Select an option
                  </option>
                  <option value="Same_day">Same_day</option>
                  <option value="Next_day">Next_day</option>
                  <option value="Express">Express</option>
                </select>
                <small className="text-red-500">
                  {errors.deliveryMethod?.message}
                </small>
              </div>
              <div className="grid mt-1">
                <div className="flex items-center gap-x-1">
                  <input
                    type="checkbox"
                    name="deliveryAddressCurrentAddress"
                    {...register("deliveryAddressCurrentAddress")}
                  />
                  <label htmlFor="deliveryAddressCurrentAddress">
                    use Current Address as delivery address
                  </label>
                </div>
              </div>
              <button className="flex justify-center items-center text-sm font-medium h-min gap-x-2 mt-7 px-6 py-3 text-white bg-primary">
                <span>Order Now</span>
                {ordering ? <Spinner /> : <IconCheckout />}
              </button>
            </form>
            {showBackToHomeButton ? (
              <div className="flex justify-center">
                <Link
                  href="/"
                  className="text-primary border-2 border-primay px-4 py-2 border-primary mt-2"
                >
                  {" "}
                  Back to Home{" "}
                </Link>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </>
  );
};

export default Checkout;
