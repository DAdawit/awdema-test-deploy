"use client";
import CustomLoading from "@/components/customLoading";
import Forbiden from "@/components/forbiden";
import { useQuery } from "@apollo/client";
import context from "../../../context";
import { ADMIN_ALL_DELIVERERS } from "@/graphql";
import DelivererList from "@/components/admin/deliverersList";
import PaginationComponent from "@/components/Pagination";
import { useState } from "react";
const Shops = () => {
  const [page, setPage] = useState(1);

  const [paginateParams, setPaginateParams] = useState({
    perPage: 4,
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

  const { data, loading, error, refetch } = useQuery(ADMIN_ALL_DELIVERERS, {
    context: context,
    variables: { ...paginateParams },
  });

  if (loading) {
    return <CustomLoading message="featching shops" />;
  }
  if (error.message === "Permission Denied.") {
    return <Forbiden />;
  }
  console.log(error.message);

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <h1 className="pl-10 text-primary text-4xl font-medium mt-10 mb-5">
        Deliverers
      </h1>
      <div className="container mx-auto ">
        {data?.adminAllDeliverersPaginated?.objects.length > 0 ? (
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
                  <th scope="col" class="px-6 py-3">
                    phoneNumber
                  </th>
                  <th scope="col" class="px-6 py-3 flex items-start">
                    Delivery Methode
                  </th>
                  <th scope="col" class="px-6 py-3  whitespace-nowrap">
                    max Delivery Mass
                  </th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    Max Delivery Volume
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Free
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
                {data.adminAllDeliverersPaginated.objects.map(
                  (deliverer, index) => (
                    <DelivererList
                      key={deliverer.id}
                      deliverer={deliverer}
                      index={index}
                      refetch={() => refetch()}
                    />
                  )
                )}
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
