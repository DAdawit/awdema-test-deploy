import { Box, Drawer } from "@mui/material";
import Avatar from "../user/Avatar";
import NavLinks from "./NavLinks";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { SELLER_INFO } from "@/graphql";
import { FETCH_USER_DATA } from "@/graphql";
import checkToken from "@/pages/verifyToken";
import { IconAddToCart } from "@/Icons/IconAddToCart";
import IconWishlist from "@/Icons/IconWishList";
import IconLogout from "@/Icons/IconLogout";
import { IconLogin } from "@/Icons/IconLogin";
import { useRouter } from "next/router";
import { useEffect } from "react";
import client from "../../../apollo-client";
import { DELIVERER_INFO } from "@/graphql";
import { IconSearch } from "@/Icons/IconSearch";
const NavBar = () => {
  const { push } = useRouter();
  const [state, setState] = useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ left: open });
  };

  // importing auth datas in from context
  const {
    auth,
    user,
    setUserData,
    setUserNull,
    loading,
    setSellerInfo,
    removeSellerInfo,
    setDelivererInfo,
    removeDelivererInfo,
  } = useContext(AuthContext);

  async function fetchUserData() {
    // console.log("fetching user data");
    await client
      .query({
        query: FETCH_USER_DATA,
      })
      .then((res) => {
        setUserData(res.data.me);
        const seller = res.data?.me?.isSeller;
        const deliverer = res.data?.me?.isDeliverer;
        // console.log(seller);
        // fetch seller information is the login user is a seller
        if (seller) {
          client
            .query({
              query: SELLER_INFO,
            })
            .then((res) => {
              // set seller info in context
              setSellerInfo(res.data.isSeller);
              // log;
            })
            .catch((err) => {
              console.log(err.message);
            });
        } else if (deliverer) {
          client
            .query({
              query: DELIVERER_INFO,
            })
            .then((res) => {
              // set seller info in context
              setDelivererInfo(res.data.isDeliverer);
              // log;
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  // for chcking token is valid
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const verify_Token = async (token) => {
    if (!token) {
      token = "";
    }
    try {
      await checkToken(token)
        .then(async () => {
          // if token is valid fetching user data
          await fetchUserData().then(() => {});
        })
        .catch(() => {
          setUserNull();
        });
    } catch (error) {
      setUserNull();
      removeSellerInfo();
    }
  };

  useEffect(() => {
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    verify_Token(token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUserNull();
    removeSellerInfo();
    removeDelivererInfo();
    push("/");
  };

  return (
    <>
      {!loading ? (
        <div className="fixed top-0 z-10 bg-white">
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <Box
              sx={{
                width: 250,
              }}
              role="presentation"
              onKeyDown={toggleDrawer("left", false)}
            >
              <div>
                <div className="py-4 px-5 flex justify-center">
                  <Avatar />
                </div>
                <NavLinks toggleDrawer={toggleDrawer("left", false)} />
              </div>
            </Box>
          </Drawer>

          <div className="w-screen overflow-hidden shadow-sm">
            <div className="flex items-center justify-between h-16 px-5  space-x-6">
              {/* <Nav /> */}
              <div className="flex items-center">
                {auth ? (
                  <button onClick={toggleDrawer("left", true)}>
                    <MenuIcon />
                  </button>
                ) : null}

                <div className="w-24 md:w-24 ml-2">
                  <Link href="/">
                    <Image
                      src="/logo.png"
                      width="100"
                      height="80"
                      alt="logo image"
                    />
                  </Link>
                </div>
              </div>

              <div className="justify-center px-2 gap-1 hidden md:flex w-screen  bg-primary h-full items-center text-white">
                <h1 className="text-2xl">FREE DELEVERY </h1>
                <div className="flex items-center gap-3">
                  <h3 className="underline  underline-offset-4 ">
                    {" "}
                    ORDER NOW{" "}
                  </h3>
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </div>
              </div>
              {/* <div className="flex"> */}
              {/* <div className="relative flex items-center text-primary"> */}
              <Link
                href="/allProducts"
                className="hidden sm:flex  justify-center items-center bg-white  text-primary border-2 border-primary hover:border-hoverColor hover:text-hoverColor px-4 py-1  w-max gap-3 rounded-xl hover:scale-105 transition-all"
              >
                <span>
                  <IconSearch />
                </span>
                <span className="whitespace-nowrap">Search ...</span>
              </Link>
              {/* </div> */}
              {/* </div> */}
              {/* <Navbar /> */}

              <div className="flex items-center gap-3 bg-white h-full">
                <span className=" hidden sm:flex ml-1 text-primary">
                  <Link href="/user/cart">
                    <IconAddToCart />
                  </Link>
                </span>
                <span className=" hidden sm:flex ml-1 text-primary">
                  <Link href="/user/wishList">
                    <IconWishlist />
                  </Link>
                </span>
                {auth ? (
                  <div className="flex ">
                    <h1 className="hidden sm:flex h-8 w-8 mr-1  justify-center items-center capitalize rounded-full bg-primary text-white font-medium mt-1">
                      <span>{user.firstName[0]}</span>
                    </h1>
                    <button
                      onClick={() => logout()}
                      className="flex justify-center items-center gap-1 text-sm text-primary border-primary border-2  px-4 py-2 font-medium"
                    >
                      <span className="text-sm -my-1">Logout</span>
                      <IconLogout />
                    </button>
                  </div>
                ) : (
                  <Link href="/auth/login">
                    <button className="flex justify-center items-center gap-1 text-sm text-primary border-primary border-2  px-4 py-2 font-medium">
                      <span className="text-sm -my-1">Login</span>
                      <IconLogin />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NavBar;
