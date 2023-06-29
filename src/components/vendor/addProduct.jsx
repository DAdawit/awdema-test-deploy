import Spinner from "@/Icons/Spinner";
import { showToast } from "../showToast ";
import { useForm } from "react-hook-form";
import { ADD_PRODUCT } from "@/graphql";
import { useState } from "react";
import client from "../../../apollo-client";
const AddProduct = ({
  subCat,
  handleNext,
  addProductModelColors,
  productDetailInserted,
  setProductDetail,
}) => {
  const notifyError = (message) => toast.error(message);
  const [addProductLoading, SetaddProductLoading] = useState(false); //showing sppinner when clicking create my shope button

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      quantity: "",
      discount: "",
      tags: "",
      description: "",
      approximateMassKg: "",
      color: "",
      heightCm: "",
      lengthCm: "",
      modelOrSizeName: "",
      subcategoryId: "",
      widthCm: "",
    },
  });
  const onSubmit = async (data) => {
    SetaddProductLoading(true);

    await client
      .mutate({
        mutation: ADD_PRODUCT,
        variables: data,
      })
      .then(async (res) => {
        // to privent user to step from steping to add product model
        await productDetailInserted();
        // set product color and model for adding product image at final
        addProductModelColors(res.data?.addProduct.product.productmodelSet);
        const product = res.data.addProduct.product;
        setProductDetail(product);
        // passing saved product for add product model in parrent component in handle next
        showToast("success", "Product Added successfully");
      })
      .then(() => {
        SetaddProductLoading(false);
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        handleNext();
      });
  };

  return (
    <>
      {/* <pre>{JSON.stringify(subCat, null, 2)}</pre> */}

      <div className="text-center text-3xl font-bold py-5 text-primary">
        Add Product Details
      </div>

      <div className="bg-white w-full flex  items-center justify-center  ">
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid mt-1">
            <label htmlFor="address" className="">
              Product Name *
            </label>
            <input
              type="text"
              placeholder="Name"
              name="address"
              {...register("name", {
                required: "Name is required",
              })}
            />
            <small className="text-red-500">{errors.name?.message}</small>
          </div>

          <div className="grid mt-1">
            <label htmlFor="subcategory">Select SubCategory *</label>
            <select
              id="subcategory"
              {...register("subcategoryId", {
                required: "Subcategory is required",
              })}
            >
              <option value="" disabled selected>
                Select an option
              </option>
              {subCat.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <small className="text-red-500">
              {errors.subcategoryId?.message}
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
            <label htmlFor="color">Color</label>
            <input
              type="text"
              name="color"
              placeholder="Color comma separeted e.g red,blue,black "
              {...register("color", {
                required: "Color is required",
              })}
            />
            <small className="text-red-500">{errors.tinNo?.message}</small>
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
            <label htmlFor="lengthCm">Length </label>
            <input
              type="number"
              name="lengthCm"
              placeholder="Length in Cm"
              {...register("lengthCm", {
                required: "Length is required",
              })}
            />
            <small className="text-red-500">{errors.lengthCm?.message}</small>
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
          <div className="grid mt-1">
            <label htmlFor="modelOrSizeName">Model Or Sizename *</label>
            <input
              type="text"
              name="modelOrSizeName"
              placeholder="Model/sizeName"
              {...register("modelOrSizeName", {
                required: "Model or Sizename required ",
              })}
            />
            <small className="text-red-500">
              {errors.modelOrSizeName?.message}
            </small>
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
          </div>
          <div className="grid mt-1">
            <label htmlFor="tags">Tags *</label>
            <input
              type="text"
              name="Tags"
              placeholder="Tags"
              {...register("tags")}
            />
          </div>
          <div className="grid mt-1 col-span-2">
            <label htmlFor="description">Product Description *</label>
            <textarea
              name="description"
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            <small className="text-red-500">
              {errors.description?.message}
            </small>
          </div>
          <div className="hidden"></div>

          <div className="sm:col-span-1 flex justify-center">
            <button
              type="submit"
              className="bg-primary mb-10 text-white px-5 py-2  flex justify-center justify-self-center mt-5 items-center"
            >
              <span className="ml-1">Add Product</span>
              {addProductLoading ? <Spinner /> : null}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
