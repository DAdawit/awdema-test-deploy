import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SIGNUP_CUSTOMER } from "@/graphql";
import Spinner from "@/Icons/Spinner";
import IconPersonAdd from "@/Icons/IconPersonAdd";
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
      username: "username5",
      firstname: "firstname",
      lastname: "lastname",
      phone: "+251936207517",
      password: "Pa$$w0rd!",
      confirmPassword: "Pa$$w0rd!",
    },
  });

  const [addUser, { data, loading, error }] = useMutation(SIGNUP_CUSTOMER);

  // if (!loading && data) {
  //   const email = data.signupCustomer.newUser?.email;
  //   console.log(data);
  //   push(`/auth/verifyemail/${email}`);
  // }
  const onSubmit = async (values) => {
    setPasswordError("");
    if (values.password !== values.confirmPassword) {
      setPasswordError("password did not match !");
      return false;
    }
    try {
      await addUser({ variables: values }).then((res) => {
        const email = res.data.signupCustomer.newUser?.email;
        console.log(res);
        push(`/auth/verifyemail/${email}`);
      });
      setTitle("");
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="grid md:flex justify-evenly h-auto md:h-screen">
        <div className="bg-orange hidden md:flex md:w-1/2 justify-center">
          {/* eslint-disable-next-line */}
          <img
            src="/customers.jpg"
            alt="shop banner"
            className="object-contain h-96 -mt-18 sm:mt-10 sm:pt-20"
          />
        </div>
        <div className="min-w-[500] grid items-center justify-center md:shadow-2xl shadow-gray-400 px-5 sm:px-10 md:px-10 mb-16">
          <form className="grid mb-10" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl mt-10 font-medium text-primary  text-center">
              Create an account
            </h1>
            <p className="text-lg font-medium text-center text-gray-800 mb-3">
              to start shopping with us.
            </p>
            <div className="grid sm:flex gap-2">
              <div className="grid">
                <label htmlFor="email">Username *</label>
                <input
                  type="text"
                  placeholder="username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.username?.message}
                </small>
                {error && error.message === "username already exist" ? (
                  <small className="text-red-500 pl-2">{error?.message}</small>
                ) : null}{" "}
              </div>
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
            </div>
            <div className="grid sm:flex gap-3">
              <div className="grid">
                <label htmlFor="firstname">First Name *</label>
                <input
                  type="text"
                  id="firstname"
                  placeholder="First Name"
                  {...register("firstname", {
                    required: "First Name is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.firstname?.message}
                </small>
              </div>
              <div className="grid">
                <label htmlFor="lastname">Last Name *</label>
                <input
                  type="text"
                  id="lastname"
                  placeholder="Last Name"
                  {...register("lastname", {
                    required: "Last Name is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.lastname?.message}
                </small>
              </div>
            </div>

            <div className="grid sm:flex gap-3">
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
                {error && error.message === "phone number already exist" ? (
                  <small className="text-red-500 pl-2">{error?.message}</small>
                ) : null}{" "}
              </div>
              <div className="grid">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  placeholder="New password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.password?.message}
                </small>
              </div>
            </div>
            <div className="grid sm:w-min">
              <div className="grid mt-1">
                <label htmlFor="confimrPassword">Confimr Password *</label>
                <input
                  type="password"
                  id="confimrPassword"
                  placeholder="Re-enter your password"
                  {...register("confirmPassword", {
                    required: "Confirm-password is required",
                  })}
                />

                <small className="text-red-500">
                  {errors.confirmPassword?.message}
                </small>
                <small className="text-red-500 pl-2">{passwordError}</small>
              </div>
            </div>
            <div className="sm:ml-10 sm:mt-3 flex justify-center">
              <button className="bg-primary text-white px-6 py-3  flex justify-center items-center justify-self-center mt-2 hover:-translate-y-px">
                <span className="ml-1">Signup </span>
                {loading ? (
                  <Spinner />
                ) : (
                  <span className="pl-1">
                    <IconPersonAdd />
                  </span>
                )}
              </button>
            </div>
            <div className="flex text-sm gap-1 mt-2">
              <p>
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-500 cursor-pointer font-normal underline"
                >
                  Login.
                </Link>
              </p>
            </div>
            <div className="text-sm mb-10 ">
              <p>
                By creating an account, you agree to our <br />
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
};
export default Register;
