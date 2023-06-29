import client from "../../../apollo-client";
import { useQuery } from "@apollo/client";
import CustomLoading from "@/components/customLoading";
import { CHANGE_CART_QUANTITY } from "@/graphql";
import { showToast } from "@/components/showToast ";
import { MY_WISHLIST } from "@/graphql";
import WishListComponent from "@/components/ProductCards/WishListCom";
import NoItems from "@/components/ProductCards/noItems";
import AlertDialog from "@/components/ProductCards/ConfirmDialog";
import { CLEAR_WISHLIST } from "@/graphql";
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
const WishList = () => {
  const { data, loading, error, refetch } = useQuery(MY_WISHLIST, {
    context: {
      headers: {
        authorization: `JWT ${localStorage.getItem("token")}`,
      },
    },
  });

  if (loading) {
    return <CustomLoading message={"Fetching Wish List Items"} />;
  }

  const confirm = async () => {
    // console.log("clear wishList");
    await client
      .query({
        query: CLEAR_WISHLIST,
      })
      .then(() => {
        showToast("success", "cart items cleared successfully!");
        refetch();
      })
      .catch((err) => {
        showToast("error", err.message);
      });
  };

  return (
    <>
      <Head>
        <title>My Wishlist</title>
      </Head>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <h1 className="text-5xl text-primary pl-10 mt-10 font-medium ">
        Wish List Items
      </h1>
      <section className="grid grid-cols-1 px-4 lg:grid-cols-5 md:container mx-auto gap-2 mt-5 mb-20">
        <div className="relative overflow-x-auto lg:col-span-4">
          {!loading && data?.myWishList.products.length > 0 ? (
            <div className=" container mx-auto flex justify-end my-4 ">
              <AlertDialog
                text="Clear WishList"
                message={"Are you sure you went to clear your WishList ?"}
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
                  <TableCell align="left">name</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="">Model</TableCell>
                  <TableCell align="">Color</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              {!loading && data?.myWishList?.products?.length > 0 ? (
                <TableBody>
                  {data.myWishList.products?.map((product, index) => (
                    <WishListComponent
                      product={product}
                      key={product.ProductId}
                      index={index}
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

          {/* <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  price
                </th>
                <th scope="col" className="px-6 py-3">
                  Model
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {!loading && data?.myWishList?.products.length > 0 ? (
              <tbody>
                {data.myWishList.products?.map((product, index) => (
                  <WishListComponent
                    product={product}
                    key={product.ProductId}
                    index={index}
                  />
                ))}
              </tbody>
            ) : (
              <NoItems type="order" message="No items in wishList !" />
            )}
            {!loading && error ? <div>{error.message}</div> : null}
          </table> */}
        </div>
      </section>
    </>
  );
};
export default WishList;
