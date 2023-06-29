import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/Icons/Spinner";
import IconUpdate from "@/Icons/IconUpdate";
import client from "../../../apollo-client";
import { showToast } from "../showToast ";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { SELLER_INFO } from "@/graphql";
import { EDIT_SHOP } from "@/graphql";
export default function EditShopInfo() {
  const { seller, setSellerInfo } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: seller?.name,
      address: seller?.address,
      description: seller?.description,
      locationLat: seller?.locationLat,
      locationLon: seller?.locationLon,
      tinNo: seller?.tinNo,
      domain: seller?.domain,
      isTotUser: seller?.isTotUser,
    },
  });
  const onSubmit = async (data) => {
    setLoading(true);
    await client
      .mutate({
        mutation: EDIT_SHOP,
        variables: data,
      })
      .then(async (res) => {
        showToast("success", "shop information updated successfully!");
        handleClose();
        setLoading(false);
        await client
          .query({
            query: SELLER_INFO,
          })
          .then((res) => {
            setSellerInfo(res.data.isSeller);
          })
          .catch((err) => {
            showToast("error", err.message);
          });
      })
      .catch((err) => {
        handleClose();
        showToast("error", err.message);
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
        Edit shop Info
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
          {"Edit Shope Information"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form className="grid" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid mt-1 w-full ">
                <label htmlFor="address" className="">
                  Name*
                </label>
                <input
                  className="min-w-64"
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
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.address?.message}
                </small>
              </div>

              <div className="grid mt-1">
                <label htmlFor="domain">Domain</label>
                <input
                  type="text"
                  name="domain"
                  placeholder="personal website link optional"
                  {...register("domain")}
                />
              </div>
              <div className="grid mt-1">
                <label htmlFor="tinNo">Tin Number *</label>
                <input
                  type="number"
                  name="tinNo"
                  placeholder="Tin number"
                  {...register("tinNo", {
                    required: "Tin number is required",
                  })}
                />
                <small className="text-red-500">{errors.tinNo?.message}</small>
              </div>
              <div className="grid mt-1 pr-3">
                <label htmlFor="description">Shope Description *</label>
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

              <button
                type="submit"
                className="bg-primary mb-10 text-white px-6 py-3 flex justify-center justify-self-center mt-5 items-center"
              >
                <span className="ml-1">Edit </span>
                {loading ? <Spinner /> : <IconUpdate />}
              </button>
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
