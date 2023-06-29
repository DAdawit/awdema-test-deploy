import React from "react";
import { NEW_ARRIVALES } from "@/graphql";
import client from "../../../apollo-client";
import ResponsiveMainProductCard from "@/components/ProductCards/ResponsiveMainProductCard";
import PaginationComponent from "@/components/Pagination";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import CustomLoading from "@/components/customLoading";
import { PRODUCTS } from "@/graphql";
import context from "../../../context";
const Index = ({ products }) => {
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
    startDate: "",
    endDate: "",
    filterSubcategoryName: "",
    filterBy: "",
  };
  const { data, loading, error, refetch } = useQuery(PRODUCTS, {
    context: context,
    variables: { ...queryParams, ...paginateParams },
  });

  if (loading) {
    return <CustomLoading message={"featching products ..."} />;
  }

  return (
    <>
      <div className="constianer mx-auto px-5">
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <div className="">
          <h1 className="text-3xl  text-center font-medium font-sans tracking-wider text-primary py-8">
            All Products
          </h1>
        </div>

        {data?.PaginatedProduct?.objects.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-14 gap-x-5">
              {data?.PaginatedProduct?.objects.map((product) => (
                <div key={product.id} className="px-2">
                  <ResponsiveMainProductCard
                    id={product.id}
                    product={product}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              {data?.PaginatedProduct?.hasNext ||
              data?.PaginatedProduct?.hasPrev ? (
                <div className="flex justify-center">
                  <PaginationComponent
                    count={Math.ceil(data?.PaginatedProduct?.total / 20)}
                    page={page}
                    handleChange={handleChange}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div>
            <h1>no Products</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
// export async function getStaticProps() {
//   const params = {
//     startDate: "",
//     endDate: "",
//     filterSubcategoryName: "",
//     filterBy: "",
//     pageNo: 1,
//     perPage: 5,
//   };
//   const products = await client.query({
//     query: NEW_ARRIVALES,
//     variables: params,
//   });

//   return {
//     props: {
//       products: products.data.PaginatedProduct,
//     },
//     revalidate: 10,
//   };
// }
