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
import client from "../../../apollo-client";
import { showToast } from "../showToast ";
import IconAdd from "@/Icons/IconAdd";
import { CREATE_SUBCATEGORY } from "@/graphql";
export default function AddSubCategory({ categoryName, refetch }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subcategoryName: "",
      description: "",
    },
  });
  const onSubmit = async (data) => {
    data.categoryName = categoryName;
    setLoading(true);
    await client
      .mutate({
        mutation: CREATE_SUBCATEGORY,
        variables: data,
      })
      .then(() => {
        refetch();
        showToast("success", "SubCategory added successfully!");
        handleClose();
        reset();
      })
      .catch((err) => {
        setError(err.message);
        showToast("error", err.message);
      })
      .finally(() => {
        setLoading(false);
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
      <Button onClick={handleClickOpen} variant="outlined">
        Add SubCategory
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
                <label htmlFor="subcategoryName" className="">
                  SubCategory Name *
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="subcategoryName"
                  {...register("subcategoryName", {
                    required: "subcategoryName is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.subcategoryName?.message}
                </small>
                {error ? <small className="text-red-500">{error}</small> : null}
              </div>

              <div className="grid mt-1 ">
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
              <div className="flex justify-center container mx-auto  mt-5">
                <button className="flex justify-center items-center bg-primary text-white  py-2 px-4 gap-2 ">
                  <span>Add SubCategory</span>
                  <span>{loading ? <Spinner /> : <IconAdd />}</span>
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
