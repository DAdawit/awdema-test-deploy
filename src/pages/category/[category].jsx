import { CATEGORIES } from "@/graphql";
import { PRODUCT_BYCATEGORIES } from "@/graphql";
import client from "../../../apollo-client";
import ResponsiveMainProductCard from "@/components/ProductCards/ResponsiveMainProductCard";
import Link from "next/link";
import { useState } from "react";
import IconLoadMore from "@/Icons/IconLoadMore";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import CustomLoading from "@/components/customLoading";
import context from "../../../context";
import PaginationComponent from "@/components/Pagination";
import Head from "next/head";

const CategoryProducts = () => {
  const router = useRouter();
  const { category } = router.query;
  const [page, setPage] = useState(1);

  const [paginateParams, setPaginateParams] = useState({
    perPage: 8,
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

  const { data, loading, error, refetch } = useQuery(PRODUCT_BYCATEGORIES, {
    context: context,
    variables: { categoryName: category, ...paginateParams },
  });
  if (loading) {
    return <CustomLoading message="loading ..." />;
  }
  return (
    <>
      <Head>
        <title>{category} products</title>
      </Head>
      <div className="my-16">
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <div className="flex justify-center my-10 items-end">
          <Link href="/" className="underline text-textPrimary">
            Home{" "}
          </Link>
          <h1 className="text-center text-4xl font-bold  text-primary">
            |{category}
          </h1>
        </div>
        {data && data?.PaginatedProductByCategory?.objects.length > 0 ? (
          <>
            <div className="grid gap-x-3.5 gap-y-5  grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
              {data?.PaginatedProductByCategory?.objects.map((product) => (
                <ResponsiveMainProductCard
                  key={product.id}
                  id={product.id}
                  product={product}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <PaginationComponent page={page} handleChange={handleChange} />
            </div>
          </>
        ) : (
          <h1 className="text-center text-xl font-bold my-10 text-primary">
            No products in category yet
          </h1>
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: CATEGORIES,
  });
  // console.log(data);
  const paths = data.listAllCategory.map((category) => {
    return {
      params: { category: category.name },
    };
  });
  // console.log("paths", paths);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const category = context.params.category;
  let filterProperties = {
    categoryName: category,
    pageNo: 1,
    perPage: 2,
  };

  const { data } = await client.query({
    query: PRODUCT_BYCATEGORIES,
    variables: filterProperties,
  });

  // console.log(data);
  return {
    props: {
      products: data.PaginatedProductByCategory,
      categoryName: category,
    },
    revalidate: 3,
  };
};
