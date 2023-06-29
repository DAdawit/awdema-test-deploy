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
export default function EditProductDetail({ product, subCat, refetch }) {
  const [open, setOpen] = useState(false);
  const [updateDetailLoading, setUpdateDetailLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product.name,
      price: product.price,
      subcategoryId: product.subcategoryId,
      // quantity: product.totalQuantity,
      tags: product.tags,
      description: product.description,
    },
  });
  const onSubmit = async (data) => {
    setUpdateDetailLoading(true);
    await client
      .mutate({
        mutation: EDIT_PRODUCT,
        variables: data,
      })
      .then(() => {
        refetch();
        showToast("success", "Product added to cart successfully!");
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setUpdateDetailLoading(false);
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
        fullWidth={"lg"}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit Product Detail"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid mt-1 ">
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
                <label htmlFor="price">tags *</label>
                <input
                  type="text"
                  name="price"
                  placeholder="tags"
                  {...register("tags", {
                    required: "tags is required",
                  })}
                />
                <small className="text-red-500">{errors.tags?.message}</small>
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
                <small className="text-red-500">
                  {errors.quantity?.message}
                </small>
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
