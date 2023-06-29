import Spinner from "@/Icons/Spinner";
import { showToast } from "../showToast ";
import { useForm } from "react-hook-form";
import client from "../../../apollo-client";
import { ADD_PRODUCT_MODEL } from "@/graphql";
import { useState } from "react";
const AddProductModel = ({ product, addProductModelColors }) => {
  const [addProductLoading, SetaddProductLoading] = useState(false); //showing sppinner when clicking create my shope button
  const [numModels, setNumModels] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      modelOrSizeName: "",
      price: "",
      color: "",
      quantity: "",
      discount: "",
      widthCm: "",
      heightCm: "",
      lengthCm: "",
      approximateMassKg: "",
      productId: product?.id,
    },
  });

  const onSubmit = async (data) => {
    SetaddProductLoading(true);

    await client
      .mutate({
        mutation: ADD_PRODUCT_MODEL,
        variables: data,
      })
      .then((res) => {
        addProductModelColors(
          res.data?.addProductModel?.product?.productmodelSet
        );
        showToast(
          "success",
          "Product Model successfully, when you finish adding your product models please press Next !"
        );
        setNumModels((prev) => prev + 1);

        SetaddProductLoading(false);
        // handleNext(id);
        reset();
      })
      .catch((err) => {
        SetaddProductLoading(false);
        showToast("error", err.message);
      });
  };
  return (
    <>
      {/* <pre>{JSON.stringify(product?.id, null, 2)}</pre> */}
      <div className="text-center text-3xl font-bold py-5 text-primary">
        Add Product Model
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
              placeholder="Model Name"
              name="modelOrSizeName"
              {...register("modelOrSizeName", {
                required: "Name is required",
              })}
            />
            <small className="text-red-500">
              {errors.modelOrSizeName?.message}
            </small>
          </div>

          <div className="grid mt-1">
            <label htmlFor="price">Price *</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              {...register("price", {
                required: "price is required",
              })}
            />
            <small className="text-red-500">{errors.price?.message}</small>
          </div>

          <div className="grid mt-1">
            <label htmlFor="color">Color *</label>
            <input
              type="text"
              name="color"
              placeholder="Color comma separeted e.g red,blue,black "
              {...register("color", {
                required: "Color is required",
              })}
            />
            <small className="text-red-500">{errors.color?.message}</small>
          </div>

          <div className="grid mt-1">
            <label htmlFor="quantity">Quantity *</label>
            <input
              type="number"
              name="price"
              placeholder="Quantity"
              {...register("quantity", {
                required: "quantity is required",
              })}
            />
            <small className="text-red-500">{errors.quantity?.message}</small>
          </div>

          <div className="grid mt-1">
            <label htmlFor="discount">Discount </label>
            <input
              type="number"
              name="discount"
              placeholder="discount"
              {...register("discount", {
                required: "discount is required",
              })}
            />
            <small className="text-red-500">{errors.discount?.message}</small>
          </div>
          <div className="grid mt-1">
            <label htmlFor="heightCm">Height</label>
            <input
              type="number"
              name="heightCm"
              placeholder="Height in cm"
              {...register("heightCm", {
                required: "Height is required",
              })}
            />
            <small className="text-red-500">{errors.heightCm?.message}</small>
          </div>
          <div className="grid mt-1">
            <label htmlFor="heightCm">Length</label>
            <input
              type="number"
              name="lengthCm"
              placeholder="Length in cm"
              {...register("lengthCm", {
                required: "Length is required",
              })}
            />
            <small className="text-red-500">{errors.lengthCm?.message}</small>
          </div>

          <div className="grid mt-1">
            <label htmlFor="widthCm">Width</label>
            <input
              type="number"
              name="widthCm"
              placeholder="width in Cm "
              {...register("widthCm", {
                required: "Width is required",
              })}
            />
            <small className="text-red-500">{errors.widthCm?.message}</small>
          </div>

          <div className="grid mt-1">
            <label htmlFor="approximateMassKg">Approximate Mass in Kg *</label>
            <input
              type="number"
              name="approximateMassKg"
              placeholder="Model/sizeName"
              {...register("approximateMassKg", {
                required: "Model or Sizename required ",
              })}
            />
            <small className="text-red-500">
              {errors.approximateMassKg?.message}
            </small>
          </div>

          <div className="invissible"></div>

          <div className="sm:col-span-1 flex justify-center">
            <button
              type="submit"
              className="bg-primary mb-10 text-white px-5 py-2  flex justify-center justify-self-center mt-5 items-center"
            >
              <span className="ml-1">Add Model</span>
              {addProductLoading ? <Spinner /> : null}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProductModel;
