import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import Spinner from "@/Icons/Spinner";
import IconSend from "@/Icons/IconSend";
import { REST_PASSWORD } from "@/graphql";
import { showToast } from "@/components/showToast ";
import { VERIFY_SHOP_PHONE } from "@/graphql";
import client from "../../../apollo-client";
import Head from "next/head";
const VendorVerifyPhone = () => {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      verificationCode: "AAAAAA",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    client
      .mutate({
        mutation: VERIFY_SHOP_PHONE,
        variables: values,
      })
      .then((res) => {
        showToast("success", "Phone Number verified !");
        setLoading(false);
        push("/user/profile");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
    // try {
    //   await verifyPhoneNumber({ variables: values }).then((res) => {
    //     showToast("success", " !");
    //     push("/");
    //   });
    // } catch (err) {
    //   showToast("error", err.message);
    //   console.error("Error adding item:", err);
    // }
  };
  return (
    <>
      <Head>
        <title>Verify Phone</title>
      </Head>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="grid md:flex justify-evenly h-auto md:h-screen">
        <div className="bg-orange hidden md:flex md:w-1/2 justify-center">
          {/* eslint-disable-next-line */}
          <img
            src="/verifyPhone.jpg"
            alt="shop banner"
            className="object-contain h-96 -mt-18 sm:mt-10 sm:pt-20"
          />
        </div>
        <div className="min-w-[500] max-w-[1000] grid items-center justify-center md:shadow-2xl shadow-gray-400 px-5 sm:px-10 md:px-10 mb-16">
          <form
            className="grid mb-10  max-w-md "
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-4xl mt-10 font-medium text-primary  text-center">
              Verify phone Number
            </h1>
            <p className="text-lg font-medium text-center text-gray-800 mb-3">
              Once you receive the verification code, please enter it in the
              field below and click Verify{" "}
            </p>
            {/* <div className="grid sm:flex gap-2"> */}
            <div className="grid mt-1">
              <label htmlFor="email">Phone Number *</label>
              <input
                type="text"
                placeholder="+251..."
                {...register("phone", {
                  required: "Phone Number is required",
                  maxLength: {
                    value: 13,
                    message: "Phone Number is not valid",
                  },
                  minLength: {
                    value: 13,
                    message: "Phone Number is not valid",
                  },
                })}
              />
              <small className="text-red-500">{errors.phone?.message}</small>
            </div>
            <div className="grid mt-1">
              <label htmlFor="verificationCode">Enter Your OTP *</label>
              <input
                type="text"
                id="verificationCode"
                placeholder="*****"
                {...register("verificationCode", {
                  required: "Verification Code is required",
                })}
              />
              <small className="text-red-500">
                {errors.verificationCode?.message}
              </small>
              {(error && error === "Invalid verification code") ||
              error === "Expired verification code" ? (
                <small className="text-red-500">{error}</small>
              ) : null}
              {/* <small className="text-red-500">{error}</small> */}
            </div>

            <div className="sm:ml-10 sm:mt-3 flex justify-center">
              <button className="bg-primary text-white px-6 py-3  flex justify-center items-center justify-self-center mt-2 hover:-translate-y-px">
                <span className="ml-1 font-medium">Verify </span>
                {loading ? (
                  <Spinner />
                ) : (
                  <span className="pl-1">
                    <IconSend />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default VendorVerifyPhone;
