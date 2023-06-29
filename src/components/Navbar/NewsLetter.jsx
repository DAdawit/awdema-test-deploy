import IconSend from "@/Icons/IconSend";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../showToast ";
import Spinner from "@/Icons/Spinner";
const NewsLetter = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setTimeout(() => {
      showToast("success", "Thanks, you are subscribed to out newsletter");
      setLoading(false);
      reset();
    }, 1000);
  };
  return (
    <div className="mt-10 container mx-auto px-5 max-w-[550px]">
      <h1 className="text-center text-xl sm:text-3xl font-mono  font-medium py-3 whitespace-nowrap">
        Subscribe for our News Letters
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-2 "
      >
        <input
          type="text"
          className="w-full text-gray-900"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Enter valid email address",
            },
          })}
        />
        <small className="text-red-500">{errors.email?.message}</small>
        <button className="flex justify-center items-center border-2 border-white px-5 py-2 gap-3 ">
          <span>Send</span>
          <span>{loading ? <Spinner /> : <IconSend />}</span>
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
