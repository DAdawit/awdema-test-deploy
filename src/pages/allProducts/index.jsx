import { IconSearch } from "@/Icons/IconSearch";
import { useForm } from "react-hook-form";
import { useState } from "react";
import IconFilter from "@/Icons/IconFilter";
import { CATEGORIES } from "@/graphql";
import client from "../../../apollo-client";
import { NEW_ARRIVALES } from "@/graphql";
import ResponsiveMainProductCard from "@/components/ProductCards/ResponsiveMainProductCard";
import { SEARCH_PRODUCT } from "@/graphql";
import { useLazyQuery } from "@apollo/client";
import CustomLoading from "@/components/customLoading";
import PaginationComponent from "@/components/Pagination";
const AllProducts = ({ subCategories }) => {
  const [searchData, setSearchData] = useState({}); // to set search data for if there is paginate data to pass it again as parameter

  const [isSearch, setIsSearch] = useState(false); // for showing message if user search any thing
  const [page, setPage] = useState(1); // pagination page number
  const [paginateParams, setPaginateParams] = useState({
    perPage: 20,
    pageNo: page,
  }); // pagination parameters
  // paginatio handler methode
  const handleChange = (event, value) => {
    setPage(value);
    setPaginateParams((prevState) => ({
      ...prevState,
      pageNo: value,
    }));
    searchProduct({
      variables: {
        ...searchData,
        ...paginateParams,
        pageNo: value,
      },
    });
  };
  const [searchProduct, { loading, error, data, refetch }] =
    useLazyQuery(SEARCH_PRODUCT);

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
      maxPrice: 0,
      minPrice: 0,
      filterSubcategoryName: "",
      filterBy: "",
    },
  });
  const onSubmit = async (data) => {
    setIsSearch(true);
    // preserve search data for pagination
    setSearchData(data);
    await searchProduct({
      variables: {
        ...data,
        ...paginateParams,
      },
    });
  };

  if (loading) {
    return <CustomLoading message="Searching " />;
  }
  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="px-5">
        <div className="flex sm:grid w-full">
          <div className="hidden justify-between">
            <h1 className="font-medium text-primary">Filter Options</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:flex items-center justify-center">
              <div className="flex overflow-hidden">
                <div className="flex flex-col">
                  <label
                    htmlFor="filterSubcategoryName"
                    className=" flex text-sm"
                  >
                    Categories
                  </label>
                  <select
                    className="rounded-md w-max"
                    id="filterSubcategoryName"
                    {...register("filterSubcategoryName")}
                    defaultValue=""
                  >
                    {subCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {/* </div> */}
                </div>
                {/* <div className="flex "> */}
                <div className="grid">
                  <label htmlFor="minPrice" className="text-sm flex">
                    Min Price
                  </label>
                  <select
                    id="minPrice"
                    {...register("minPrice")}
                    className="rounded-lg"
                  >
                    <option value="" disabled selected>
                      Min Price
                    </option>
                    {[
                      0, 50, 100, 500, 1000, 2000, 5000, 10000, 25000, 50000,
                      100000, 500000,
                    ].map((price) => (
                      <option key={price} value={price}>
                        {price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid">
                  <label htmlFor="maxPrice" className="text-sm flex">
                    Max Price
                  </label>

                  <select
                    id="maxPrice"
                    {...register("maxPrice")}
                    className="rounded-lg"
                  >
                    <option value="" disabled selected>
                      Max Price
                    </option>
                    {[
                      0, 50, 100, 500, 1000, 2000, 5000, 10000, 25000, 50000,
                      100000, 500000,
                    ].map((price) => (
                      <option key={price} value={price}>
                        {price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-2">
              <div className="grid">
                <div className="relative grid items-center text-primary">
                  <span className=" text-primary w-5 h-5 absolute ml-3 pointer-events-none">
                    <IconSearch />
                  </span>
                  <input
                    type="text"
                    name="search"
                    placeholder="search"
                    aria-label="Search talk"
                    className="w-full w-xl rounded-md pr-3 pl-10 py-2  focus:ring-gray-500 focus:ring-1"
                    {...register("search", {
                      required: "search is required",
                    })}
                  />
                </div>
                <small className="text-red-500">{errors.search?.message}</small>
              </div>
              <button className="border-2 h-max bg-white border-primary rounded-md px-4 py-2 hover:scale-105 flex justify-center items-center gap-1 text-primary hover:bg-primary hover:text-white transition-all">
                <span>
                  <IconSearch />
                </span>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-gray-50  w-full min-h-screen px-5 ">
        <div className="grid justify-start mt-10 mb-5">
          <h1 className="font-medium text-3xl text-primary mt-3">
            Search{" "}
            {data?.searchProductPaginated?.total > 0 ? "Results" : "prduct"}
          </h1>
          {data?.searchProductPaginated?.total ? (
            <p className="font-medium">
              Total result : {data?.searchProductPaginated?.total}
            </p>
          ) : null}
        </div>

        {data?.searchProductPaginated?.total > 0 ? (
          <div className="grid gap-x-3.5 gap-y-5  grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.searchProductPaginated?.objects.map((product) => (
              <div key={product.id}>
                <ResponsiveMainProductCard id={product.id} product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div>{isSearch ? <h1>No search results</h1> : null}</div>
        )}
      </div>
      {data?.searchProductPaginated?.hasNext ||
      data?.searchProductPaginated?.hasPrev ? (
        <div className="flex justify-center">
          <PaginationComponent
            count={Math.ceil(data?.searchProductPaginated?.total / 20)}
            page={page}
            handleChange={handleChange}
          />
        </div>
      ) : null}
      {error ? <div>Error: {error.message}</div> : null}
    </>
  );
};

export default AllProducts;
export async function getStaticProps() {
  const { data } = await client.query({
    query: CATEGORIES,
  });

  return {
    props: {
      subCategories: data.listAllCategory,
    },
    revalidate: 10,
  };
}
