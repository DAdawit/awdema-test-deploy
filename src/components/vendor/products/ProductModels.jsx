import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconDelete from "@/Icons/IconDelete";
import ProductModelsList from "./ProductModelsList";
import AddProduct from "../addProduct";
import AddProductModels from "./AddProductModel";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
export default function ProductModels({
  productmodelSet,
  subCat,
  refetch,
  productId,
  Image,
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
        Models
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"lg"}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Product Models"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="container mx-auto flex justify-end py-2">
              <AddProductModels productId={productId} refetch={refetch} />
            </div>
            {productmodelSet.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        N<sup className="underline mt-3">o</sup>
                      </TableCell>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left"> Price</TableCell>
                      <TableCell align="left">Discount</TableCell>
                      <TableCell align="left"> massKg</TableCell>
                      <TableCell align="left"> volume </TableCell>
                      <TableCell align="left"> Colors</TableCell>
                      <TableCell align="left">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productmodelSet.map((model, index) => (
                      <ProductModelsList
                        key={model.id}
                        model={model}
                        index={index}
                        subCat={subCat}
                        refetch={refetch}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : null}
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
