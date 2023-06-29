import { IconSearch } from "../../Icons/IconSearch";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_PRODUCT } from "@/graphql";
import CustomLoading from "../customLoading";
import MainProductCard from "../ProductCards/MainProductCard";
import PaginationComponent from "../Pagination";
const Search = ({ categories, show, hideSearch }) => {
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState({});
  const [paginateParams, setPaginateParams] = useState({
    perPage: 4,
    pageNo: page,
  });
  const handleChange = (event, value) => {
    setPage(value);

    setSearchData((prevState) => ({
      ...prevState,
      pageNo: page,
    }));
    setPaginateParams((prevState) => ({
      ...prevState,
      pageNo: value,
    }));
    searchProduct({
      variables: searchData,
    });
  };

  const [searcres, setSearchres] = useState(false);
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
      maxPrice: 1000000,
      minPrice: 0,
      filterSubcategoryName: "",
      filterBy: "",
    },
  });
  const onSubmit = async (data) => {
    // console.log(data);
    show();
    setSearchres(true);
    let datas = { ...data, ...paginateParams };
    setSearchData(datas);
    searchProduct({
      variables: datas,
    });
  };
  const closeSearch = () => {
    setSearchres(false);
    hideSearch();
  };

  return (
    <>
      <div className="container mx-auto sm:mt-7">
        <div className="flex justify-center">
          <form
            className="flex justify-center w-full container"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <div className="hidden sm:flex">
              <select id="subcategory" {...register("filterSubcategoryName")}>
                <option value="" disabled selected>
                  Categories
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="flex">
              <div className="relative flex items-center text-primary">
                <span className=" text-primary w-5 h-5 absolute ml-3 pointer-events-none">
                  <IconSearch />
                </span>
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  aria-label="Search talk"
                  className="w-full w-xl roun pr-3 pl-10 py-2  focus:ring-gray-500 focus:ring-1"
                  {...register("search", {
                    required: "search is required",
                  })}
                />
              </div>
              <button className="bg-primary text-white px-4 py-2">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center">
          <small className="text-red-500 self-center">
            {errors.search?.message}
          </small>
        </div>
      </div>
      {searcres ? (
        <div className="min-h-screen">
          <div>
            <button onClick={() => closeSearch()}>close</button>
            {loading ? (
              <>
                <CustomLoading message="searching ..." />
              </>
            ) : null}
            {data ? (
              <>
                <pre>
                  {JSON.stringify(data.searchProductPaginated, null, 2)}
                </pre>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Search;
