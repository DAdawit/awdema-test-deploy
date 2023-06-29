import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/Icons/Spinner";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import IconUpload from "@/Icons/IconUpload";
import { CHANGE_PROFILE_IMAGE } from "@/graphql";
import client from "../../../apollo-client";
import { showToast } from "@/components/showToast ";
import Head from "next/head";
const AddShopeCoverImage = () => {
  const { setSellerInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const notifySuccess = (message) => toast(message);
  const notifyError = (message) => toast.error(message);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("file", data.file[0]);

    await client
      .mutate({
        mutation: CHANGE_PROFILE_IMAGE,
        variables: { file: formData },
      })
      .then(() => {
        showToast("success", "Profile image changed successfully!");
        push("/user/profile");
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Change Profile Image</title>
      </Head>
      <h1 className="text-center text-primary text-2xl mt-3">
        Change profile Image
      </h1>

      <div className="flex justify-center items-center">
        <form
          className="grid w-full justify-center pt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid my-10">
            <Image
              src="/changeProfile.jpg"
              className="w-full h-fit object-contain"
              alt="product image"
              height={150}
              width={250}
            />
            <div className="grid mt-1">
              <input
                type="file"
                name="file"
                {...register("file", {
                  required: "file is required",
                })}
              />
              <small className="text-red-500">{errors.file?.message}</small>
            </div>

            <button className="bg-primary text-white p5-4 py-2 my-5 flex justify-center items-center">
              <span>Upload</span>
              {loading ? (
                <span className="text-white pl-2">
                  <Spinner />
                </span>
              ) : (
                <span className="text-white pl-2">
                  <IconUpload />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddShopeCoverImage;
