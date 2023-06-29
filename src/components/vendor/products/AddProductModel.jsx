import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconDelete from "@/Icons/IconDelete";
import ProductModelsList from "./ProductModelsList";
import Spinner from "@/Icons/Spinner";
import { showToast } from "@/components/showToast ";
import { useForm } from "react-hook-form";
import client from "../../../../apollo-client";
import { ADD_PRODUCT_MODEL } from "@/graphql";
import { useState } from "react";
export default function AddProductModels({ refetch, productId }) {
  const [addProductLoading, setAddProductLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productId: productId,
      modelOrSizeName: "",
      price: "",
      color: "",
      quantity: "",
      discount: "",
      widthCm: "",
      heightCm: "",
      lengthCm: "",
      approximateMassKg: "",
    },
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
    // if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
    //   // onClose(event, reason); // Call the onClose function passed as a prop
    // }
  };

  const onSubmit = async (data) => {
    setAddProductLoading(true);
    data.productId = productId;
    await client
      .mutate({
        mutation: ADD_PRODUCT_MODEL,
        variables: data,
      })
      .then(() => {
        showToast("success", "Product Model added successfully !");
        reset();
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setAddProductLoading(false);
        refetch();
        handleClose();
      });
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Model
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"lg"}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add Product Models"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* <pre>{JSON.stringify(productmodelSet, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(productId, null, 2)}</pre> */}

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
                <small className="text-red-500">
                  {errors.quantity?.message}
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
                <small className="text-red-500">
                  {errors.discount?.message}
                </small>
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
                <small className="text-red-500">
                  {errors.heightCm?.message}
                </small>
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
                <small className="text-red-500">
                  {errors.lengthCm?.message}
                </small>
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
                <small className="text-red-500">
                  {errors.widthCm?.message}
                </small>
              </div>

              <div className="grid mt-1">
                <label htmlFor="approximateMassKg">
                  Approximate Mass in Kg *
                </label>
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
