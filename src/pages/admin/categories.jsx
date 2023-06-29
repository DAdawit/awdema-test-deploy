import { SHOP_PRODUCTS } from "@/graphql";
import { useState } from "react";
import CustomLoading from "@/components/customLoading";
import { showToast } from "@/components/showToast ";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import IconAdd from "@/Icons/IconAdd";
import context from "../../../context";
import { LIST_ALL_CATEGORY } from "@/graphql";
import CategoryList from "@/components/admin/CategoryLists";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AddCategory from "@/components/admin/Addcategory";
const Categories = () => {
  const { data, loading, error, refetch } = useQuery(LIST_ALL_CATEGORY, {
    context: context,
  });

  if (loading) {
    return <CustomLoading message={"Fetching shop products !"} />;
  }

  return (
    <>
      <h1 className="pl-10 text-primary text-4xl font-medium mt-10 mb-5">
        All Categories
      </h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="container mx-auto py-4">
        <div className="flex justify-end py-2">
          <AddCategory refetch={refetch} />
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    N<sup className="underline mt-3">o</sup>
                  </TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">name</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">SubCategories</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              {data?.listAllCategory.length > 0 ? (
                <TableBody>
                  {data.listAllCategory.map((category, index) => (
                    <CategoryList
                      key={category.id}
                      category={category}
                      index={index}
                      refetch={() => refetch()}
                      hidden={false}
                    />
                  ))}
                </TableBody>
              ) : null}
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Categories;
