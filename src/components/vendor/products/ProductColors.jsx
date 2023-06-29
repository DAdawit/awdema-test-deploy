import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconDelete from "@/Icons/IconDelete";
import ProductModelsList from "./ProductModelsList";
import ProductColorsList from "./ProductColorsList";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
export default function ProductColors({
  productcolorSet,
  productModelName,
  productId,
  Image,
  refetch,
}) {
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
      <Button variant="outlined" onClick={handleClickOpen}>
        Colors
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"lg"}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Product Colors"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* <pre>{JSON.stringify(productcolorSet, null, 2)}</pre> */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      N<sup className="underline mt-3">o</sup>
                    </TableCell>
                    <TableCell align="left">Image</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Quantity</TableCell>
                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productcolorSet.map((color, index) => (
                    <ProductColorsList
                      key={color.id}
                      color={color}
                      index={index}
                      productModelName={productModelName}
                      productId={productId}
                      refetch={refetch}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
