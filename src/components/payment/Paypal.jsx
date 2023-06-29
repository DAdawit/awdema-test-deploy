import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconDelete from "@/Icons/IconDelete";
import IconPaypal from "@/Icons/IconPaypal";
import { CREATE_PAYPAL_LINK } from "@/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import context from "../../../context";
import client from "../../../apollo-client";
import IconLoader from "@/Icons/IconLoader";
import Image from "next/image";
export default function Paypal({ orderId, numberOfProducts, orderName }) {
  const [pay, setPay] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const createPaypalLink = async (orderId) => {
    setError("");
    setLoading(true);
    await client
      .mutate({
        mutation: CREATE_PAYPAL_LINK,
        variables: { orderId: orderId },
      })
      .then((res) => {
        // console.log(res.data);
        window.open(res.data.createPayPalLink.redirectUrl, "_blank");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPay(false);
    setLoading(false);
  };

  const confirmDelete = () => {
    confirm();
    setOpen(false);
  };

  const createLink = (orderId) => {
    setPay(true);
    createPaypalLink(orderId);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <IconPaypal />
        pay with paypal
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"sm"}
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {pay ? (
              <div>
                <h1 className="text-3xl font-medium text-gray-800 mx-16">
                  Createing paypal Link ...
                </h1>
                <div className="flex flex-col justify-center items-center  text-blue-500 text-3xl ">
                  <span className="py-2">
                    <IconPaypal />
                  </span>

                  {loading ? <IconLoader /> : null}
                </div>
                {error ? (
                  <div className="flex justify-evenly items-center container">
                    <small>{error}</small>
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => createPaypalLink(orderId)}
                    >
                      Try again
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-medium text-gray-900">
                  Link to Paypal
                </h1>
                <Button
                  variant="outlined"
                  onClick={() => createLink(orderId)}
                  size="large"
                >
                  <IconPaypal />
                  Ok
                </Button>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={confirmDelete}>Yes</Button> */}
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
