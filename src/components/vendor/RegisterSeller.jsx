"use client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CREATE_SHOPE } from "@/graphql";
import axios from "axios";
import Spinner from "@/Icons/Spinner";
import { useRouter } from "next/router";
import { useEffect } from "react";
import client from "../../../apollo-client";
import { showToast } from "../showToast ";
export default function RegisterSeller({}) {
  const [open, setOpen] = useState(false);
  const { push } = useRouter();
  const router = useRouter();

  const [loading, setLoading] = useState(false); //loading for fetchin user location
  const [createShopeLoading, SetcreateShopeLoading] = useState(false); //showing sppinner when clicking create my shope button
  const [createShopeError, SetcreateShopeError] = useState(""); // for setting error message for when create user a shope
  const [errorInGettingLocation, SeterrorInGettingLocation] = useState(false);
  const [errorMessageInGettingLocation, SeterrorMessageInGettingLocation] =
    useState("");
  const [location, setLocation] = useState({});
  const getLocation = async () => {
    setLoading(true);
    await axios
      .get("https://ipapi.co/json")
      .then((res) => {
        setLocation(res.data);
        setLoading(false);
      })
      .catch((err) => {
        SeterrorInGettingLocation(true);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "dawit12",
      address: "address",
      description: "description",
      locationLat: location.latitude,
      locationLon: location.longitude,
      tinNo: "01252365212",
      domain: "https://dawitdportfolio.netlify.app/",
      isTotUser: false,
    },
  });

  const onSubmit = async (data) => {
    SetcreateShopeLoading(true);
    data.locationLat = location.latitude;
    data.locationLon = location.longitude;

    await client
      .mutate({
        mutation: CREATE_SHOPE,
        variables: data,
      })
      .then((res) => {
        SetcreateShopeLoading(false);
        setTimeout(() => {
          push({
            pathname: "/vendor/addShopeCover",
            query: { newUser: true },
          });
        }, 2000);
      })
      .catch((err) => {
        showToast("error", err.message);
        if (err.message === "user already have shop") {
          SetcreateShopeError("use already have shop");
        }
      })
      .finally(() => {
        SetcreateShopeLoading(false);
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

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
      <button
        href="/vendor/register"
        onClick={handleClickOpen}
        className="gap-x-2 mb-10 bg-primary px-7 py-4 text-white border-2 hover:border-primary hover:bg-white hover:text-primary transition-all"
      >
        Create Shope
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={"sm"}
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Become Seller"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form className="grid pt-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-1 mt-1 ">
                <label htmlFor="address" className="">
                  Name*
                </label>
                <input
                  className="min-w-64"
                  type="text"
                  placeholder="Name"
                  name="address"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                <small className="text-red-500">{errors.name?.message}</small>
              </div>

              <div className="grid mt-1">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.address?.message}
                </small>
              </div>

              <div className="grid mt-1">
                <label htmlFor="domain">Domain</label>
                <input
                  type="text"
                  name="domain"
                  placeholder="personal website link optional"
                  {...register("domain")}
                />
              </div>
              {/* <div className="grid mt-1">
              <label htmlFor="shopVideo">video Link</label>
              <input
                type="text"
                name="shopVideo"
                placeholder="paste a video link here"
                {...register("shopVideo")}
              />
            </div> */}
              <div className="grid mt-1">
                <label htmlFor="tinNo">Tin Number *</label>
                <input
                  type="number"
                  name="tinNo"
                  placeholder="Tin number"
                  {...register("tinNo", {
                    required: "Tin number is required",
                  })}
                />
                <small className="text-red-500">{errors.tinNo?.message}</small>
              </div>
              <div className="grid mt-1 pr-3">
                <label htmlFor="description">Shope Description *</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.description?.message}
                </small>
              </div>
              <div className="grid mt-1">
                <div className="flex items-center gap-x-1">
                  <input
                    type="checkbox"
                    name="isTotUser"
                    id="isTotUser"
                    {...register("isTotUser")}
                  />
                  <label htmlFor="isTotUser">
                    Please check this if you are also a buyer.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="bg-primary mb-10 text-white px-5 py-2  flex justify-center justify-self-center mt-5 items-center"
              >
                <span className="ml-1">Create My Shop</span>
                {createShopeLoading ? <Spinner /> : null}
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
