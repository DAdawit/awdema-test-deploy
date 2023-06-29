"use client";
import CustomLoading from "@/components/customLoading";
import Forbiden from "@/components/forbiden";
import { ADMIN_ALL_SHOPS } from "@/graphql";
import ShopsList from "@/components/admin/ShopsList";
import { useQuery } from "@apollo/client";
import context from "../../../context";
import PaginationComponent from "@/components/Pagination";
import { useState } from "react";
const Shops = () => {
  const [page, setPage] = useState(1);

  const [paginateParams, setPaginateParams] = useState({
    perPage: 2,
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
  const { data, loading, error, refetch } = useQuery(ADMIN_ALL_SHOPS, {
    context: context,
    variables: { ...paginateParams },
  });

  if (loading) {
    return <CustomLoading message="featching shops" />;
  }
  if (error.message === "Permission Denied.") {
    return <Forbiden />;
  }

  return (
    <>
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}

      <h1 className="pl-10 text-primary text-4xl font-medium mt-10 mb-5">
        Shops
      </h1>
      {/* <pre>{JSON.stringify(products.objects[0], null, 2)}</pre> */}
      <div className="container mx-auto ">
        {data?.adminAllShopsPaginated?.objects ? (
          <div>
            <table class="w-full text-sm text-left text-gray-500 ">
              <thead class="text-xs text-gray-800 uppercase bg-gray-200 ">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    <h1>
                      N<sup className="underline mt-3">o</sup>
                    </h1>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3 flex items-start">
                    tinNo
                  </th>
                  <th scope="col" class="px-6 py-3">
                    domain
                  </th>
                  <th scope="col" class="px-6 py-3">
                    isActive
                  </th>
                  <th scope="col" class="px-6 py-3">
                    description
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.adminAllShopsPaginated.objects.map((shop, index) => (
                  <ShopsList
                    key={shop.id}
                    shop={shop}
                    index={index}
                    refetch={() => refetch()}
                  />
                ))}
              </tbody>
            </table>
            <div className="flex justify-center">
              <PaginationComponent page={page} handleChange={handleChange} />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Shops;
