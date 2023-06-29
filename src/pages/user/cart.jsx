import { MY_CART } from "@/graphql";
import client from "../../../apollo-client";
import { useQuery } from "@apollo/client";
import CustomLoading from "@/components/customLoading";
import CartList from "@/components/ProductCards/CartList";
import { CHANGE_CART_QUANTITY } from "@/graphql";
import { showToast } from "@/components/showToast ";
import SmallCheckout from "@/components/user/Checkout";
import NoItems from "@/components/ProductCards/noItems";
import context from "../../../context";
import AlertDialog from "@/components/ProductCards/ConfirmDialog";
import { CLEAR_CART } from "@/graphql";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Head from "next/head";
const Cart = () => {
  const { data, loading, error, refetch } = useQuery(MY_CART, {
    context: context,
  });

  if (loading) {
    return <CustomLoading message={"Fetching Cart Items"} />;
  }

  const changeProductQuantity = async (newQuantity, productIndex) => {
    try {
      await client
        .mutate({
          mutation: CHANGE_CART_QUANTITY,
          variables: { productIndex, newQuantity },
        })
        .then((res) => {
          console.log(res.data);
          refetch();
        })
        .catch((err) => {
          showToast("info", err.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDecrement = (index, ProductId) => {
    // setLoading(true);
    data.myCart.products.map(async (product) => {
      if (ProductId === product.ProductId) {
        if (product.quantity === 1) {
          return showToast("info", "minimum order is 1");
        }
        await changeProductQuantity(product.quantity - 1, index);
        return;
        // console.log(product.quantity + 1);
      }
    });
  };
  const handleIncreament = (index, ProductId) => {
    data.myCart.products.map(async (product) => {
      if (ProductId === product.ProductId) {
        if (product.quantity === 10) {
          return showToast("info", "maximum order is 10");
        }
        await changeProductQuantity(product.quantity + 1, index);
        return;
      }
    });
  };

  const changeQuantity = (id, index, ProductId) => {
    // console.log(id, index, ProductId);
    if (id === 1) {
      handleIncreament(index, ProductId);
    } else if (id === 0) {
      handleDecrement(index, ProductId);
    }
  };
  const confirm = async () => {
    console.log("clear cart");
    client
      .query({
        query: CLEAR_CART,
      })
      .then(() => {
        refetch();
        showToast("success", "cart items cleared successfully!");
      })
      .catch((err) => {
        showToast("error", err.message);
      });
  };

  return (
    <>
      <Head>
        <title>My CartItems</title>
      </Head>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <h1 className="text-5xl text-primary pl-10 mt-10 font-medium ">
        Cart Items
      </h1>

      <section className="grid grid-cols-1 px-4 lg:grid-cols-5 md:container mx-auto gap-2 mt-5 mb-20">
        <div className="relative overflow-x-auto lg:col-span-4">
          {!loading && data?.myCart?.products?.length > 0 ? (
            <div className=" container mx-auto flex justify-end my-4 ">
              <AlertDialog
                text="Clear Cart"
                message={"Are you sure you went to clear your Cart ?"}
                confirm={() => confirm()}
              />
            </div>
          ) : null}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    N<sup className="underline mt-3">o</sup>
                  </TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left"> Product name</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">model</TableCell>
                  <TableCell align="left">color</TableCell>
                  <TableCell align="">Quantity</TableCell>
                  <TableCell align="left"> TotalPrice </TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              {!loading && data?.myCart?.products?.length > 0 ? (
                <TableBody>
                  {data.myCart.products?.map((product, index) => (
                    <CartList
                      product={product}
                      key={product.ProductId}
                      index={index}
                      changeQuantity={changeQuantity}
                    />
                  ))}
                </TableBody>
              ) : (
                <div className="flex justify-center items-center">
                  <NoItems type="cart" message="No items in the Cart" />
                </div>
              )}
            </Table>
          </TableContainer>
        </div>
        <div className="max-w-50 ">
          <SmallCheckout cartItems={data?.myCart?.products} />
        </div>
      </section>
    </>
  );
};
export default Cart;
