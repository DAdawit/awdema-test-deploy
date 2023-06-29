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
import { EDIT_PROFILE } from "@/graphql";

export default function EditProfile() {
  const { user, setUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  let error = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
  const updateUserData = async (data) => {
    setLoading(true);
    await client
      .mutate({
        mutation: EDIT_PROFILE,
        variables: data,
      })
      .then((res) => {
        showToast("success", "user data updated successfully!");
        setUserData(res.data.editProfile.user);
        handleClose();
      })
      .catch((err) => {
        showToast("error", err.message);
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = async (data) => {
    if (data.profilePicture.length !== 0) {
      let formData = new FormData();
      formData.append("username", data.username);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("profilePicture", data.profilePicture[0]);
      updateUserData(formData);
      console.log("there is file");
    } else {
      updateUserData(data);
    }
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
        Edit Profile
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
            <form className="grid" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid mt-1 ">
                <label htmlFor="name" className="">
                  Email
                </label>
                <input
                  type="text"
                  disabled
                  placeholder="Email"
                  {...register("email")}
                />
              </div>
              <div className="grid mt-1">
                <label htmlFor="password">UserName </label>
                <input
                  type="text"
                  disabled
                  placeholder="UserName"
                  {...register("username", {
                    required: "username is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.username?.message}
                </small>
              </div>
              <div className="grid mt-1">
                <label htmlFor="password">Firstname </label>
                <input
                  type="text"
                  placeholder="firstName"
                  {...register("firstName", {
                    required: "firstName is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.firstName?.message}
                </small>
              </div>
              <div className="grid mt-1">
                <label htmlFor="password">Lastname </label>
                <input
                  type="text"
                  placeholder="lastName"
                  {...register("lastName", {
                    required: "lastName is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.lastName?.message}
                </small>
              </div>
              <div className="grid mt-1">
                <label htmlFor="password">Change Profile Picture </label>
                <input
                  type="file"
                  name="shopPicture"
                  {...register("profilePicture")}
                />
              </div>
              <button className="bg-primary text-white px-5 py-2 flex justify-center justify-self-center mt-5 items-center">
                <span className="ml-1">Update</span>
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
