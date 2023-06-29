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
import { EDIT_PRODUCT_MODEL } from "@/graphql";
import client from "../../../../apollo-client";
import { showToast } from "@/components/showToast ";
export default function EditProductModel({ model, refetch }) {
  const [open, setOpen] = useState(false);
  const [updateModelLoading, setupdateModelLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productModelId: model.id,
      approximateMassKg: model.massKg,
      discount: model.discount,
      heightCm: 0,
      lengthCm: 0,
      modelName: model.name,
      price: model.price,
      quantity: 0,
      widthCm: 0,
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    setupdateModelLoading(true);
    await client
      .mutate({
        mutation: EDIT_PRODUCT_MODEL,
        variables: data,
      })
      .then(() => {
        showToast("success", "Product added to cart successfully!");
        refetch();
        handleClose();
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setupdateModelLoading(false);
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
          {"Edit Product Model"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* <pre>{JSON.stringify(model, null, 2)}</pre> */}
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid mt-1">
                <label htmlFor="address" className="">
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="modelName"
                  {...register("modelName", {
                    required: "modelName is required",
                  })}
                />
                <small className="text-red-500">{errors.name?.message}</small>
              </div>
              <div className="grid mt-1">
                <label htmlFor="price">price *</label>
                <input
                  type="number"
                  name="price"
                  placeholder="price"
                  {...register("price", {
                    required: "price is required",
                  })}
                />
                <small className="text-red-500">{errors.price?.message}</small>
              </div>
              <div className="grid mt-1">
                <label htmlFor="price">discount *</label>
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
                <label htmlFor="approximateMassKg">massKg *</label>
                <input
                  type="number"
                  name="approximateMassKg"
                  placeholder="approximateMassKg"
                  {...register("approximateMassKg", {
                    required: "approximateMassKg is required",
                  })}
                />
                <small className="text-red-500">{errors.massKg?.message}</small>
              </div>
              <div className="flex justify-center container mx-auto col-span-2">
                <button className="flex justify-center items-center bg-primary text-white  py-2 px-4 gap-2 ">
                  <span>update</span>
                  <span>
                    {updateModelLoading ? <Spinner /> : <IconUpdate />}
                  </span>
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
