"use client";
import { useState } from "react";
import CustomLoading from "@/components/customLoading";
import { SHOP_HIDDEN_PRODUCTS_LIST } from "@/graphql";
import { useQuery } from "@apollo/client";
import NoItems from "@/components/ProductCards/noItems";
import HiddenProductsList from "@/components/vendor/HiddenProductsList";
import PaginationComponent from "@/components/Pagination";
import context from "../../../context";
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
const Products = () => {
  const [page, setPage] = useState(1);

  const [paginateParams, setPaginateParams] = useState({
    perPage: 20,
    pageNo: page,
  });
  const handleChange = (event, value) => {
    setPage(value);
    setPaginateParams((prevState) => ({
      ...prevState,
      pageNo: value,
    }));
    refetch();
  };

  const queryParams = {
    endDate: "",
    startDate: "",
    filterBy: "",
  };
  const { data, loading, error, refetch } = useQuery(
    SHOP_HIDDEN_PRODUCTS_LIST,
    {
      context: context,
      variables: { ...queryParams, ...paginateParams },
    }
  );

  if (loading) {
    return <CustomLoading message={"Fetching shop products !"} />;
  }
  return (
    <>
      <Head>
        <title>Hidden Products</title>
      </Head>
      <h1 className="pl-10 text-primary text-4xl font-medium mt-10 mb-5">
        Hidden Products
      </h1>
      <div className="container mx-auto pb-10">
        {data?.PaginatedMyShopHiddenProducts?.objects.length > 0 ? (
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
                  <TableCell align="left"> Quantity</TableCell>
                  <TableCell align="left"> Total sell</TableCell>
                  <TableCell align="left"> posted on</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.PaginatedMyShopHiddenProducts.objects.map(
                  (product, index) => (
                    <HiddenProductsList
                      key={product.id}
                      product={product}
                      index={index}
                      refetch={() => refetch()}
                      hidden={true}
                    />
                  )
                )}
              </TableBody>
            </Table>
            <div className="flex justify-center">
              {data?.PaginatedMyShopHiddenProducts?.hasNext ||
              data?.PaginatedMyShopHiddenProducts?.hasPrev ? (
                <div className="flex justify-center">
                  <PaginationComponent
                    count={Math.ceil(
                      data?.PaginatedMyShopHiddenProducts?.total / 20
                    )}
                    page={page}
                    handleChange={handleChange}
                  />
                </div>
              ) : null}
            </div>
          </TableContainer>
        ) : (
          <NoItems type="order" message="No hidden Products !" />
        )}
      </div>
    </>
  );
};

export default Products;
