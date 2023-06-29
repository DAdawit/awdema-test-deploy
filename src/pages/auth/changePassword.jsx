import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import Spinner from "@/Icons/Spinner";
import { showToast } from "@/components/showToast ";
import IconUpdate from "@/Icons/IconUpdate";
import client from "../../../apollo-client";
import { CHANGE_PASSWORD_WITH_RESET_CODE } from "@/graphql";
import { RESEND_USER_VERIFICATION_CODE } from "@/graphql";
import Head from "next/head";
const Register = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "AAAAAA",
      email: "dawit12@gmail.com",
      newPassword: "pass@123",
    },
  });

  const resendVerificationCode = async () => {
    await client
      .mutate({
        mutation: RESEND_USER_VERIFICATION_CODE,
      })
      .then(() => {
        showToast("success", "verification code send successfully!");
      })
      .catch((err) => {
        showToast("error", err.message);
      });
  };

  const onSubmit = async (data) => {
    // console.log(data);
    setLoading(true);
    setError("");
    if (data.newPassword1 !== data.newPassword2) {
      setLoading(false);
      return setError("password did not match !");
    }
    await client
      .mutate({
        mutation: CHANGE_PASSWORD_WITH_RESET_CODE,
        variables: data,
      })
      .then(() => {
        setLoading(false);
        reset();
        showToast("success", "password Changed successfully!");
        push("/auth/login");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        showToast("error", err.message);
      });
  };

  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="grid md:flex justify-evenly h-auto md:h-screen">
        <div className="bg-orange hidden md:flex md:w-1/2 justify-center">
          {/* eslint-disable-next-line */}
          <img
            src="/forgetpassword.jpg"
            alt="shop banner"
            className="object-contain h-96 -mt-18 sm:mt-10 sm:pt-20"
          />
        </div>
        <div className="min-w-[500] grid items-center justify-center md:shadow-2xl shadow-gray-400 px-5 sm:px-10 md:px-10 mb-16 my-10">
          <form className="grid" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl sm:text-4xl text-primary font-medium mb-3 text-center font-serif">
              Change Password
            </h1>

            <div className="grid mt-1 ">
              <label htmlFor="code" className="">
                Reset code
              </label>
              <input
                name="code"
                type="text"
                placeholder="*******"
                {...register("code", {
                  required: "reset code is required",
                })}
              />
              <small className="text-red-500">
                {errors.currentPassword?.message}
              </small>
              {error === "incorrect current password" ? (
                <small className="text-red-500">{error}</small>
              ) : null}
            </div>

            <div className="grid mt-1">
              <label htmlFor="name" className="">
                Email *
              </label>
              <input
                type="text"
                autoFocus
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter valid email ",
                  },
                })}
              />
              <small className="text-red-500">{errors.email?.message}</small>
              {/* <small className="text-red-500">{errors.password?.message}</small> */}
            </div>

            <div className="grid mt-1">
              <label htmlFor="newPassword">New Password </label>
              <input
                type="password"
                placeholder="********"
                {...register("newPassword", {
                  required: "Password required!",
                })}
              />
              <small className="text-red-500">
                {errors.newPassword?.message}
              </small>
              {error === "password did not match !" ? (
                <small className="text-red-500">{error}</small>
              ) : null}
            </div>
            <div className="border-1 border-primary px-1 w-max text-primary text-sm mt-2 ">
              didn&apos;t recived the code?{" "}
              <span
                className="hover:scale-110 cursor-pointer underline underline-offset-2"
                onClick={() => resendVerificationCode()}
              >
                resed now{" "}
              </span>
            </div>
            <button className="bg-primary text-white px-5 py-3 flex justify-center justify-self-center mt-5 items-center">
              <span className="ml-1">Change Password</span>
              {loading ? (
                <Spinner />
              ) : (
                <span className="ml-1 mr-1">
                  <IconUpdate />
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
