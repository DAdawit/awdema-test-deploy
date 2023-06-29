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
import { REPORT_PRODUCT } from "@/graphql";
import IconSend from "@/Icons/IconSend";

export default function ReportProductDialog({ productId }) {
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
      reason: "",
      productId: productId,
    },
  });
  const changePassword = async (data) => {
    setLoading(true);

    await client
      .mutate({
        mutation: REPORT_PRODUCT,
        variables: data,
      })
      .then(() => {
        setLoading(false);
        handleClose();
        reset();
        showToast("success", "product reported successfully!");
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
        Report Product
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"sm"}
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Report Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form className="grid" onSubmit={handleSubmit(changePassword)}>
              <div className="grid mt-1 ">
                <label htmlFor="currentPassword" className="">
                  Reason
                </label>
                <textarea
                  name="currentPassword"
                  type="Password"
                  placeholder="Write your Reason"
                  {...register("reason")}
                />
              </div>

              <button className="bg-primary text-white px-5 py-2 flex justify-center justify-self-center mt-5 items-center">
                <span className="ml-1">Send</span>
                {loading ? (
                  <Spinner />
                ) : (
                  <span className="ml-1 mr-1">
                    <IconSend />
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
