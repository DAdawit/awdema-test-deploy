import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { IconAddToCart } from "@/Icons/IconAddToCart";
import Link from "next/link";
import IconHome from "@/Icons/IconHome";
import IconWishlist from "@/Icons/IconWishList";
import { IconSearch } from "@/Icons/IconSearch";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function BottomNav() {
  return (
    <div className="bg-last h-12  fixed  sm:hidden bottom-0 w-full opacity-90">
      <div className="flex items-center justify-evenly text-white pt-2">
        <Link href="/" className="grid justify-center items-center text-xs">
          <span className="place-self-center">
            <IconHome />
          </span>
          <span>Home</span>
        </Link>
        <Link
          href="/user/cart"
          className="grid justify-center items-center text-xs"
        >
          <span className="place-self-center">
            <IconAddToCart />
          </span>
          <span>Cart</span>
        </Link>
        <Link
          href="/user/wishList"
          className="grid justify-center items-center text-xs"
        >
          <span className="place-self-center">
            <IconWishlist />
          </span>
          <span>WishList</span>
        </Link>
        <Link
          href="/user/allProducts"
          className="grid justify-center items-center text-xs"
        >
          <span className="place-self-center">
            <IconSearch />
          </span>
          <span>Search</span>
        </Link>
      </div>
    </div>
    // <React.Fragment>
    //   <CssBaseline />

    //   <AppBar
    //     position="fixed"
    //     color="secondary"
    //     sx={{ top: "auto", bottom: 0 }}
    //   >
    //     <Toolbar></Toolbar>
    //   </AppBar>
    // </React.Fragment>
  );
}
