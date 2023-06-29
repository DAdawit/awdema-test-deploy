import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
export default function SellerProfile() {
  const { seller } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined">
        Seller Information
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"lg"}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Shop Information"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="inline-block w-full  p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white ">
              {/* <pre>{JSON.stringify(seller, null, 2)}</pre> */}

              <section className="container mx-auto w-3/4 text-gray-800 p-5 grid sm:flex gap-2">
                <div className="w-3/3 sm:w-1/3">
                  <Image
                    className="w-full h-36 object-contain"
                    src={
                      seller?.shopPicture
                        ? `https://awdma.afroel.com/media/${seller?.shopPicture}`
                        : "/avatar.png"
                    }
                    alt="product image"
                    height={300}
                    width={300}
                  />
                </div>
                <div className="w-3/3 sm:w-2/3">
                  <h1 className="text-2xl text-primary font-medium capitalize">
                    {seller?.name}
                  </h1>
                  {/* <p>{seller.description}</p> */}
                  <p className="text-gray-800 font-medium">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. In
                    architecto nemo accusamus voluptas veniam natus, amet id
                    beatae! Architecto corporis quam explicabo ullam dicta sequi
                    voluptatum sit doloremque fugiat eligendi.
                  </p>
                  <div className="grid mt-2 font-medium">
                    <p>Address : {seller?.address}</p>
                    <p>Tin Number : {seller?.tinNo}</p>
                    <p>
                      Personal websiteLink :{" "}
                      <Link
                        href={`${seller?.domain}`}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        {seller?.domain}
                      </Link>
                    </p>
                  </div>
                </div>
              </section>
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
