import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import Spinner from "@/Icons/Spinner";
import IconSend from "@/Icons/IconSend";
import { REST_PASSWORD } from "@/graphql";
import { showToast } from "@/components/showToast ";
import Head from "next/head";
const Register = () => {
  const { push } = useRouter();
  const [passwordError, setPasswordError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "dawit17@gmail.com",
    },
  });

  const [resetPassword, { data, loading, error }] = useMutation(REST_PASSWORD);

  const onSubmit = async (values) => {
    setPasswordError("");
    try {
      await resetPassword({ variables: values }).then((res) => {
        showToast(
          "success",
          "new code sent through you email! change password,code will be expired in 15 min!"
        );
        push("/auth/changePassword");
      });
    } catch (err) {
      showToast("error", err.message);
      console.error("Error adding item:", err);
    }
  };
  return (
    <>
      <Head>
        <title>Forget Password</title>
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
        <div className="min-w-[500] grid items-center justify-center md:shadow-2xl shadow-gray-400 px-5 sm:px-10 md:px-10 mb-16">
          <form className="grid mb-10" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl mt-10 font-medium text-primary  text-center">
              Forgot Password
            </h1>
            <p className="text-lg font-medium text-center text-gray-800 mb-3">
              Please enter your email address to reset your password:
            </p>
            {/* <div className="grid sm:flex gap-2"> */}
            <div className="grid mt-1">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter a valid email Address",
                  },
                })}
              />
              <small className="text-red-500">{errors.email?.message}</small>
              {error && error.message === "email address already exist" ? (
                <small className="text-red-500 pl-2">{error?.message}</small>
              ) : null}{" "}
            </div>
            {/* </div> */}

            <div className="sm:ml-10 sm:mt-3 flex justify-center">
              <button className="bg-primary text-white px-6 py-3  flex justify-center items-center justify-self-center mt-2 hover:-translate-y-px">
                <span className="ml-1">send </span>
                {loading ? (
                  <Spinner />
                ) : (
                  <span className="pl-1">
                    <IconSend />
                  </span>
                )}
              </button>
            </div>
            <div className="flex text-sm gap-1 mt-2">
              <p>
                Return to{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-500 cursor-pointer font-normal underline"
                >
                  Login.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
