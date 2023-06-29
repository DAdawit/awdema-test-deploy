import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql";
import { IconLogin } from "@/Icons/IconLogin";
import { AuthContext } from "@/context/authContext";
import { useState } from "react";
import Spinner from "@/Icons/Spinner";
import IconMenu from "@/Icons/IconMenu";
import { useContext } from "react";
import client from "../../../apollo-client";
import { SELLER_INFO } from "@/graphql";
import { DELIVERER_INFO } from "@/graphql";
import Head from "next/head";
const Login = () => {
  const { push } = useRouter();
  const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // email: "awdmaadmin@gmail.com",
      // password: "123;;;",
      // email: "delivery@gmail.com",
      // password: "pass@123",
      email: "dawit12@gmail.com",
      password: "pass@123",
    },
  });
  // Pa$$w0rd!

  const [login_User, { data, loading, error }] = useMutation(LOGIN_USER);

  return (
    <AuthContext.Consumer>
      {({ setUserData, setUserNull, setSellerInfo, setDelivererInfo }) => {
        // console.log("from login", setUserData);
        const onSubmit = async (data) => {
          try {
            await login_User({ variables: data }).then(async ({ data }) => {
              localStorage.setItem("token", data.tokenAuth.token);
              setUserData(data.tokenAuth.user);
              // fetch seller information is the login user is a seller
              if (data.tokenAuth?.user?.isSeller) {
                await client
                  .query({
                    query: SELLER_INFO,
                  })
                  .then((res) => {
                    setSellerInfo(res.data.isSeller);
                    push("/");
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              } else if (data.tokenAuth?.user?.isDeliverer) {
                await client
                  .query({
                    query: DELIVERER_INFO,
                  })
                  .then((res) => {
                    // console.log(res.data);
                    setDelivererInfo(res.data.isDeliverer);
                    push("/");
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              } else {
                push("/");
              }

              console.log(data.tokenAuth?.user?.isDeliverer);
            });
          } catch (err) {
            setUserNull();
            // console.log(error.message);
          }
        };
        return (
          <>
            <Head>
              <title>Login</title>
            </Head>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <div className="grid md:flex justify-evenly h-screen">
              <div className="bg-orange hidden md:flex md:w-1/3 flex-wrap">
                {/* eslint-disable-next-line */}
                <img
                  src="/customers.jpg"
                  alt="shop banner"
                  className="object-contain h-96 -mt-18 sm:mt-10 sm:pt-20"
                />
              </div>
              <div className=" w-full md:w-96 grid items-center md:shadow-2xl shadow-gray-400 px-5 sm:px-10 md:px-16 mt-16 mb-24">
                <form className="grid " onSubmit={handleSubmit(onSubmit)}>
                  <h1 className="text-2xl font-medium text-primary  text-center">
                    Welcome back!
                  </h1>
                  <p className="text-lg font-medium text-center text-gray-800 mb-3">
                    Please sign in to continue.{" "}
                  </p>

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
                    <small className="text-red-500">
                      {errors.email?.message}
                    </small>
                    <small className="text-red-500">
                      {errors.password?.message}
                    </small>
                  </div>
                  <div className="grid mt-1">
                    <label htmlFor="password">Password *</label>
                    <input
                      type="password"
                      placeholder="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <small className="text-red-500">
                      {errors.password?.message}
                    </small>
                    {!loading && error ? (
                      <small className="text-red-500">{error.message}</small>
                    ) : null}{" "}
                  </div>

                  <button className="bg-primary text-white px-5 py-3 flex justify-center justify-self-center mt-5 items-center hover:-translate-y-px">
                    <span className="ml-1 ">Login</span>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <span className="ml-1 mr-1">
                        <IconLogin />
                        {/* <IconLogin /> */}
                      </span>
                    )}
                  </button>
                  <div className="flex text-sm gap-1 mt-2">
                    <p>
                      Don&apos;t have an account yet?{" "}
                      <Link
                        href="/auth/signup"
                        className="text-blue-500 cursor-pointer font-normal underline"
                      >
                        Sign up now!
                      </Link>
                    </p>
                  </div>
                  <div className="flex text-sm gap-1">
                    <p>
                      Forgot your password?{" "}
                      <Link
                        href="/auth/forgetPassword"
                        className="text-blue-500 cursor-pointer font-normal underline"
                      >
                        Click here.
                      </Link>
                    </p>
                  </div>
                  <div className="text-sm">
                    <p>
                      By logging in, you agree to our{" "}
                      <Link
                        href="/auth/signup"
                        className="text-blue-500 cursor-pointer font-normal underline"
                      >
                        terms, conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/auth/signup"
                        className="text-blue-500 cursor-pointer font-normal underline"
                      >
                        privacy policy.
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </>
        );
      }}
    </AuthContext.Consumer>
  );
};
export default Login;
