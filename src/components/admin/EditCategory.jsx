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
import client from "../../../apollo-client";
import { showToast } from "../showToast ";
import { EDIT_CATEGORIES } from "@/graphql";
export default function EditCategory({ category, refetch }) {
  const [open, setOpen] = useState(false);
  const [updateDetailLoading, setUpdateDetailLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: category.name,
      description: category.description,
      newName: "",
    },
  });
  const onSubmit = async (data) => {
    setUpdateDetailLoading(true);
    await client
      .mutate({
        mutation: EDIT_CATEGORIES,
        variables: data,
      })
      .then(() => {
        refetch();
        showToast("success", "Category edited successfully!");
        handleClose();
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

  return (
    <div>
      <Button onClick={handleClickOpen}>
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
          {"Edit Product Detail"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid mt-1 ">
                <label htmlFor="address" className="">
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="Name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                <small className="text-red-500">{errors.name?.message}</small>
              </div>
              <div className="grid mt-1">
                <label htmlFor="newName">New Name </label>
                <input
                  type="text"
                  name="newName"
                  placeholder="newName"
                  {...register("newName")}
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
              <div className="flex justify-center container mx-auto col-span-2 mt-5">
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
