import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { IconSearch } from "@/Icons/IconSearch";
import { useForm } from "react-hook-form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
      isSearch: true,
      startDate: "",
      endDate: "",
      maxPrice: 1000000,
      minPrice: 0,
      filterSubcategoryName: "",
      filterBy: "",
    },
  });

  const onSubmit = async (data) => {
    // console.log(data);
    show();
    setSearchres(true);
    let datas = { ...data, ...paginateParams };
    setSearchData(datas);
    searchProduct({
      variables: datas,
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <form
          className="flex justify-center w-full container"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* <div className="hidden sm:flex">
            <select id="subcategory" {...register("filterSubcategoryName")}>
              <option value="" disabled selected>
                Categories
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div> */}
          <div className="hidden sm:flex">
            <select id="subcategory" {...register("filterSubcategoryName")}>
              <option value="" disabled selected>
                Min Price
              </option>
              {[
                0, 50, 100, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000,
                500000,
              ].map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
            <select id="subcategory" {...register("filterSubcategoryName")}>
              <option value="" disabled selected>
                Max Price
              </option>
              {[
                0, 50, 100, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000,
                500000,
              ].map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <div className="relative flex items-center text-primary">
              <span className=" text-primary w-5 h-5 absolute ml-3 pointer-events-none">
                <IconSearch />
              </span>
              <input
                type="text"
                name="search"
                placeholder="Search"
                aria-label="Search talk"
                className="w-full w-xl roun pr-3 pl-10 py-2  focus:ring-gray-500 focus:ring-1"
                {...register("search", {
                  required: "search is required",
                })}
              />
            </div>
            <button className="bg-primary text-white px-4 py-2">Search</button>
          </div>
        </form>
        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List> */}
      </Dialog>
    </div>
  );
}
