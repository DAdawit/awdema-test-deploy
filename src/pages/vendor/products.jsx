"use client";
import client from "../../../apollo-client";
import { SHOP_PRODUCTS } from "@/graphql";
import { useState } from "react";
import { useEffect } from "react";
import CustomLoading from "@/components/customLoading";
import VendorProductsList from "@/components/vendor/vendorProductsList";
import { showToast } from "@/components/showToast ";
import { useQuery } from "@apollo/client";
import { SUB_CATEGORIES } from "@/graphql";
import Link from "next/link";
import IconAdd from "@/Icons/IconAdd";
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
const Products = ({ subCat }) => {
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
  const { data, loading, error, refetch } = useQuery(SHOP_PRODUCTS, {
    context: context,
    variables: { ...queryParams, ...paginateParams },
  });

  if (loading) {
    return <CustomLoading message={"Fetching shop products !"} />;
  }
  return (
    <>
      <Head>
        <title>Shop Products</title>
      </Head>
      <h1 className="pl-10 text-primary text-4xl font-medium mt-10 mb-5">
        Products
      </h1>
      {/* <pre>{JSON.stringify(products.objects[0], null, 2)}</pre> */}
      <div className="container mx-auto py-4">
        <div className="flex justify-end py-2">
          <Link
            href="/vendor/addProduct"
            className="flex justify-center items-center border-2 bg-white border-primary text-primary px-4 py-2 hover:-translate-y-1 transition-all hover:bg-primary hover:text-white"
          >
            <span>Add Product</span>
            <span>
              <IconAdd />
            </span>
          </Link>
        </div>
        {data?.PaginatedMyShopProducts?.objects ? (
          <div>
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
                    <TableCell align="left"> Total Quantity</TableCell>
                    <TableCell align="left"> Status </TableCell>
                    <TableCell align="left"> Models</TableCell>
                    <TableCell align="left"> Total sell</TableCell>
                    <TableCell align="left"> posted on</TableCell>
                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.PaginatedMyShopProducts.objects.map(
                    (product, index) => (
                      <VendorProductsList
                        key={product.id}
                        product={product}
                        index={index}
                        refetch={() => refetch()}
                        hidden={false}
                        subCat={subCat}
                      />
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <div className="flex justify-center">
              {data?.PaginatedMyShopProducts?.hasNext ||
              data?.PaginatedMyShopProducts?.hasPrev ? (
                <div className="flex justify-center">
                  <PaginationComponent
                    count={Math.ceil(data?.PaginatedMyShopProducts?.total / 20)}
                    page={page}
                    handleChange={handleChange}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Products;
export async function getStaticProps() {
  const { data } = await client.query({
    query: SUB_CATEGORIES,
  });
  return {
    props: {
      subCat: data.listAllSubCategory,
    },
  };
}
