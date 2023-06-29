import Spinner from "@/Icons/Spinner";
import { showToast } from "../showToast ";
import { useForm } from "react-hook-form";
import { useState } from "react";
import client from "../../../apollo-client";
import { ADD_PRODUCT_COLOR } from "@/graphql";
const AddProductColor = ({
  handleNext,
  productModels,
  addProductModelColors,
  productModelColors,
}) => {
  const [addProductLoading, SetaddProductLoading] = useState(false); //showing sppinner when clicking create my shope button

  const onSubmit = async (data) => {
    SetaddProductLoading(true);

    await client
      .mutate({
        mutation: ADD_PRODUCT_COLOR,
        variables: data,
      })
      .then((res) => {
        addProductModelColors(
          res.data?.addProductColor.product.productmodelSet
        );
        // console.log(res.data?.addProductColor.product.productmodelSet);
        SetaddProductLoading(false);

        showToast(
          "success",
          "Product Color for Product model added successfully, when you finish adding your product Colors please press Next !"
        );
        // handleNext(id);
        reset();
      })
      .catch((err) => {
        SetaddProductLoading(false);
        showToast("error", err.message);
      });
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      color: "",
      quantity: "",
      productModelId: "",
    },
  });

  return (
    <>
      {/* <pre>{JSON.stringify(productModelColors, null, 2)}</pre> */}
      <div className="text-center text-3xl font-bold py-5 text-primary">
        Add Product Color
      </div>

      <div className="bg-white w-full flex  items-center justify-center  ">
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid mt-1">
            <label htmlFor="modelOrSizeName" className="">
              Model Name/Size *
            </label>
            <input
              type="text"
              placeholder="Color Name"
              name="color"
              {...register("color", {
                required: "color is required",
              })}
            />
            <small className="text-red-500">{errors.color?.message}</small>
          </div>

          <div className="grid mt-1">
            <label htmlFor="price">quantity *</label>
            <input
              type="number"
              name="quantity"
              placeholder="quantity"
              {...register("quantity", {
                required: "quantity is required",
              })}
            />
            <small className="text-red-500">{errors.quantity?.message}</small>
          </div>
          <div className="grid mt-1">
            <label htmlFor="productModelId"> Model Name/Size *</label>
            <select
              id="productModelId"
              {...register("productModelId", {
                required: "Product Model is required",
              })}
            >
              <option value="" disabled selected>
                Select an option
              </option>
              {productModelColors.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
            <small className="text-red-500">
              {errors.productModelId?.message}
            </small>
          </div>
          <div className="invisible mt-1"></div>
          <div className="sm:col-span-1 flex justify-start">
            <button
              type="submit"
              className="bg-primary mb-10 text-white px-5 py-2  flex justify-center justify-self-center mt-5 items-center"
            >
              <span className="ml-1">Add Color</span>
              {addProductLoading ? <Spinner /> : null}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProductColor;
