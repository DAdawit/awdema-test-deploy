import { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/Icons/Spinner";
import IconAdd from "@/Icons/IconAdd";
import { ADD_SHOP_PHONE } from "@/graphql";
import client from "../../../apollo-client";
import { showToast } from "@/components/showToast ";
import { useRouter } from "next/router";
const SellerAddPhoneNumber = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });
  const onSubmit = async (data) => {
    setLoading(true);
    await client
      .mutate({
        mutation: ADD_SHOP_PHONE,
        variables: data,
      })
      .then((res) => {
        reset();
        setLoading(true);
        showToast("success", "Phone Number added successfully!");
        push("/vendor/verifyPhone");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        showToast("error", err.message);
      });
  };
  return (
    <>
      <div className="border-2 shadow-gray-900 p-10 rounded-2xl">
        <form className="grid" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl sm:text-4xl text-primary font-medium mb-3 text-center">
            Add Shope Phone Number
          </h1>

          <div className="grid mt-1 h-min">
            <label htmlFor="email">Phone Number *</label>
            <div className="grid grid-col-2 gap-x-1">
              <input
                type="text"
                placeholder="+251..."
                {...register("phone", {
                  required: "Phone Number is required",
                  maxLength: {
                    value: 13,
                    message: "Phone Number is not valid. +2519 ....",
                  },
                  minLength: {
                    value: 13,
                    message: "Phone Number is not valid, +2519 ....",
                  },
                })}
              />
              <button className="bg-primary text-white px-5 py-2 rounded-lg flex justify-center justify-self-center mt-5 items-center">
                <span className="ml-1">Add Phone</span>
                {loading ? (
                  <Spinner />
                ) : (
                  <span className="ml-1 mr-1">
                    <IconAdd />
                  </span>
                )}
              </button>
            </div>
            <small className="text-red-500">{errors.phone?.message}</small>
            {error.message === "phone number already exist" ? (
              <small className="text-red-500 pl-2">{error?.message}</small>
            ) : null}{" "}
          </div>
        </form>
      </div>
    </>
  );
};

export default SellerAddPhoneNumber;
