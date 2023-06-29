import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconMore from "@/Icons/IconMore";
import Tooltip from "@mui/material/Tooltip";

export default function ShopDescription({ description }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
    // if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
    //   // onClose(event, reason); // Call the onClose function passed as a prop
    // }
  };
  const confirmDelete = () => {
    confirm();
    setOpen(false);
  };
  return (
    <div>
      <Tooltip title="show more" placement="top-start">
        <button className="" onClick={handleClickOpen}>
          <span>
            <IconMore />
          </span>
        </button>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"lg"}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"description"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="container mx-auto ">{description}</div>

            {/* <pre>{JSON.stringify(productmodelSet, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(productId, null, 2)}</pre> */}
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
