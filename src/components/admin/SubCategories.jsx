import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SubCategoriesList from "./SubCategoriesList";
import AddSubCategory from "./AddsubCategory";

export default function SubCategories({
  subcategorySet,
  subCat,
  refetch,
  productId,
  categoryName,
}) {
  const [open, setOpen] = React.useState(false);

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
      <Button variant="outlined" onClick={handleClickOpen}>
        View
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"lg"}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Subcategories"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="flex justify-end my-2">
              <AddSubCategory refetch={refetch} categoryName={categoryName} />
            </div>
            <table class="w-full text-sm text-left text-gray-500 ">
              <thead class="text-xs text-gray-800 uppercase bg-gray-200 ">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    <h1>
                      N<sup className="underline mt-3">o</sup>
                    </h1>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    description
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              {subcategorySet.length > 0 ? (
                <tbody>
                  {subcategorySet.map((subCategory, index) => (
                    <SubCategoriesList
                      key={subCategory.id}
                      subCategory={subCategory}
                      index={index}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              ) : (
                <h1>No SubCategories</h1>
              )}
            </table>
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
