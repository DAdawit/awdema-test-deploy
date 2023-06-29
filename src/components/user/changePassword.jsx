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
import { CHANGE_PASSWORD } from "@/graphql";
export default function ChangePassword() {
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
      currentPassword: "",
      newPassword1: "",
      newPassword2: "",
    },
  });
  const changePassword = async (data) => {
    setLoading(true);
    setError("");
    if (data.newPassword1 !== data.newPassword2) {
      setLoading(false);
      return setError("password did not match !");
    }
    await client
      .mutate({
        mutation: CHANGE_PASSWORD,
        variables: data,
      })
      .then(() => {
        setLoading(false);
        handleClose();
        reset();
        showToast("success", "password Changed successfully!");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        showToast("error", err.message);
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
        Change password
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"sm"}
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Change password"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form className="grid" onSubmit={handleSubmit(changePassword)}>
              <div className="grid mt-1 ">
                <label htmlFor="currentPassword" className="">
                  Current Password
                </label>
                <input
                  name="currentPassword"
                  type="Password"
                  placeholder="Current Password"
                  {...register("currentPassword")}
                />
              </div>
              <div className="grid mt-1">
                <label htmlFor="newPassword1">New Password </label>
                <input
                  name="newPassword1"
                  type="password"
                  placeholder="Enter new password"
                  {...register("newPassword1", {
                    required: "Password is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.newPassword1?.message}
                </small>
              </div>
              <div className="grid mt-1">
                <label htmlFor="newPassword2">Confirm Password </label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  {...register("newPassword2", {
                    required: "Confirm Password !",
                  })}
                />
                <small className="text-red-500">
                  {errors.newPassword2?.message}
                </small>
                {error ? <small className="text-red-500">{error}</small> : null}
              </div>
              <button className="bg-primary text-white px-5 py-2 flex justify-center justify-self-center mt-5 items-center">
                <span className="ml-1">Change Password</span>
                {loading ? (
                  <Spinner />
                ) : (
                  <span className="ml-1 mr-1">
                    <IconUpdate />
                  </span>
                )}
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
