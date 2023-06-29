import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/Icons/Spinner";
import client from "../../../apollo-client";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { showToast } from "@/components/showToast ";
import { SELLER_INFO } from "@/graphql";
import IconUpload from "@/Icons/IconUpload";
import Head from "next/head";
import { FETCH_USER_DATA } from "@/graphql";
const AddShopeCoverImage = () => {
  const { setSellerInfo, setUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { query } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [file, setFile] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    let formData = new FormData();

    const query = {
      query: `mutation ($file:Upload!){
    changeShopPicture(file:$file){
        url
    }
}
  `,
      variables: {
        file: null,
      },
    };
    if (file !== undefined) {
      const map = { 0: ["variables.file"] };
      formData.append("operations", JSON.stringify(query));
      formData.append("map", JSON.stringify(map));
      formData.append("0", data.file[0]);
      axios
        .post("https://awdma.afroel.com/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `JWT ${token}`,
          },
        })
        .then(async (res) => {
          setLoading(false);
          showToast("success", "file uploaded successfully!");
          await client
            .query({
              query: SELLER_INFO,
            })
            .then((res) => {
              setSellerInfo(res.data.isSeller);
              push("/user/profile");
            })
            .catch((err) => {
              showToast("error", err.message);
            });
        })
        .catch((err) => showToast("error", err.message));
    }
  };
  const fetchSellerInfo = async () => {
    // fetch seller information
    await client
      .query({
        query: SELLER_INFO,
      })
      .then((res) => {
        console.log("succ");
        setSellerInfo(res.data.isSeller);
      })
      .catch((err) => {
        console.log("succ");
        showToast("error", err.message);
      });

    // fetch userinformation
    await client
      .query({
        query: FETCH_USER_DATA,
      })
      .then((res) => {
        setUserData(res.data.me);
      })
      .catch((err) => showToast("error", err.message));
  };

  useEffect(() => {
    // if (query.newUser) {
    fetchSellerInfo();
    // }
  }, []);

  return (
    <>
      <Head>
        <title>Add Shop CoverImage</title>
      </Head>
      <h1 className="text-center text-primary text-2xl">
        Add Shope Cover Image
      </h1>

      <div className="flex justify-center items-center">
        <form
          className="grid w-full justify-center pt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid my-10">
            <Image
              src="/shopPink.png"
              className="w-full h-fit object-contain"
              alt="product image"
              height={150}
              width={250}
            />
            <div className="grid mt-1">
              <input
                type="file"
                name="shopPicture"
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
