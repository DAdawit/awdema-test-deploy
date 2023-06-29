import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "@/Icons/Spinner";
import IconSend from "@/Icons/IconSend";
import { showToast } from "@/components/showToast ";
import client from "../../../apollo-client";
import { ADD_DELIVERER_PHONE } from "@/graphql";
import IconAdd from "@/Icons/IconAdd";
import Head from "next/head";
const DelivererAddPhoneNumber = () => {
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
        mutation: ADD_DELIVERER_PHONE,
        variables: values,
      })
      .then((res) => {
        showToast("success", "Phone Number added successfully!");
        setLoading(false);
        push("/delivery/verifyPhone");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };
  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Head>
        <title>Deliverer Add PhoneNumber</title>
      </Head>
      <div className="container mx-auto   ">
        <div className="grid justify-center items-center h-screen">
          <div className="bg-orange flex justify-center">
            {/* eslint-disable-next-line */}
            <img
              src="/addContact.jpg"
              alt="shop banner"
              className="object-contain h-72 mt-5"
            />
          </div>
          {/* <div className="md:w-3/5  grid items-center justify-center md:shadow-xl shadow-gray-400 px-5 sm:px-10 md:px-10 mb-16"> */}
          <form
            className="grid mb-10 -mt-24 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-lg font-medium text-center text-gray-800 mb-3"></p>
            {/* <div className="grid sm:flex gap-2"> */}
            <div className="grid mt-1 ">
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
            <div className="">
              <button className="bg-primary text-white px-6 py-3 mt-4 w-full  flex justify-center items-center justify-self-center hover:-translate-y-px">
                <span className="ml-1 font-medium">Add Contact </span>
                {loading ? (
                  <Spinner />
                ) : (
                  <span className="pl-1 font-medium">
                    <IconAdd />
                  </span>
                )}
              </button>
            </div>
          </form>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
export default DelivererAddPhoneNumber;
