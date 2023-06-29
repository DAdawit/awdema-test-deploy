import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconEdit from "@/Icons/IconEdit";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Spinner from "@/Icons/Spinner";
import IconUpdate from "@/Icons/IconUpdate";
import { EDIT_PRODUCT } from "@/graphql";
import client from "../../../../apollo-client";
import { showToast } from "@/components/showToast ";
import { EDIT_PRODUCT_QUANTITY } from "@/graphql";
export default function EditProductQuantity({
  color,
  refetch,
  productModelName,
  productId,
}) {
  const [open, setOpen] = useState(false);
  const [updateDetailLoading, setUpdateDetailLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      color: color.name,
      productId: productId,
      productModelName: productModelName,
      quantity: color.quantity,
    },
  });
  const onSubmit = async (data) => {
    setUpdateDetailLoading(true);
    await client
      .mutate({
        mutation: EDIT_PRODUCT_QUANTITY,
        variables: data,
      })
      .then(() => {
        refetch();
        showToast("success", "Product quantity updated successfully!");
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setUpdateDetailLoading(false);
        handleClose();
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const confirmDelete = () => {
    confirm();
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleClickOpen} color="warning">
        <IconEdit />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"sm"}
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit product Quantity"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid mt-1">
                <label htmlFor="price">productModelName *</label>
                <input
                  disabled
                  className=""
                  type="text"
                  name="productModelName"
                  placeholder="productModelName"
                  {...register("productModelName", {
                    required: "productModelName is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.productModelName?.message}
                </small>
              </div>
              <div className="grid mt-1 ">
                <label htmlFor="color" className="">
                  Color Name *
                </label>
                <input
                  disabled
                  type="text"
                  placeholder="color"
                  name="color"
                  {...register("color", {
                    required: "color is required",
                  })}
                />
                <small className="text-red-500">{errors.name?.message}</small>
              </div>

              <div className="grid mt-1">
                <label htmlFor="price">quantity *</label>
                <input
                  type="text"
                  name="quantity"
                  placeholder="quantity"
                  {...register("quantity", {
                    required: "quantity is required",
                  })}
                  autoFocus
                />
                <small className="text-red-500">
                  {errors.quantity?.message}
                </small>
              </div>

              <div className="flex justify-center container mx-auto col-span-2">
                <button className="flex justify-center items-center bg-primary text-white  py-2 px-4 gap-2 ">
                  <span>update</span>
                  <span>
                    {updateDetailLoading ? <Spinner /> : <IconUpdate />}
                  </span>
                </button>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus></Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
