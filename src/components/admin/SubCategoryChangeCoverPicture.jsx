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
import client from "../../../apollo-client";
import { showToast } from "../showToast ";
import { EDIT_CATEGORIES } from "@/graphql";
import IconUpload from "@/Icons/IconUpload";
import { CHANGE_SUBCATEGORY_COVER_PICTURE } from "@/graphql";
export default function SubCategoriesChangeCoverPicture({
  subCategory,
  refetch,
}) {
  const [open, setOpen] = useState(false);
  const [updateDetailLoading, setUpdateDetailLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subcategoryId: subCategory.id,
      file: "",
    },
  });
  const onSubmit = async (data) => {
    data.subcategoryId = subCategory.id;
    console.log(data);
    let formData = new FormData();

    setUpdateDetailLoading(true);
    await client
      .mutate({
        mutation: CHANGE_SUBCATEGORY_COVER_PICTURE,
        variables: {
          subcategoryId: data.subcategoryId,
          file: data.file[0],
        },
        context: {
          hasUpload: true,
          formData,
        },
      })
      .then(() => {
        refetch();
        showToast("success", "category cover picture changed successfully!");
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setUpdateDetailLoading(false);
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
      <Button onClick={handleClickOpen}>
        Change Cover Picture
        <IconUpload />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"sm"}
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`${subCategory?.name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="flex justify-center flex-col">
              <label htmlFor="newName" className="my-5 font-medium text-center">
                Change Cover Picture
              </label>
              <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center">
                  <input
                    type="file"
                    name="file"
                    placeholder="file"
                    {...register("file", {
                      required: "this is required",
                    })}
                  />
                </div>

                <div className="flex justify-center  col-span-2 mt-5">
                  <button className="flex justify-center items-center bg-primary text-white  py-2 px-4 gap-2 ">
                    <span>update</span>
                    <span>
                      {updateDetailLoading ? <Spinner /> : <IconUpdate />}
                    </span>
                  </button>
                </div>
              </form>
            </div>
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
