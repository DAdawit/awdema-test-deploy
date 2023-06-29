"use client";
import { ADMIN_ALL_USERS } from "@/graphql";
import client from "../../../apollo-client";
import { useState } from "react";
import { useEffect } from "react";
import CustomLoading from "@/components/customLoading";
import Forbiden from "@/components/forbiden";
import UsersList from "@/components/admin/UsersList";
import context from "../../../context";
import { useQuery } from "@apollo/client";
import NoItems from "@/components/ProductCards/noItems";
import PaginationComponent from "@/components/Pagination";
const Users = () => {
  const [page, setPage] = useState(1);

  const [paginateParams, setPaginateParams] = useState({
    perPage: 15,
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

  let params = {
    endDate: "",
    startDate: "",
  };

  const { data, loading, error, refetch } = useQuery(ADMIN_ALL_USERS, {
    context: context,
    variables: { ...params, ...paginateParams },
  });

  if (loading) {
    return <CustomLoading message="featching users" />;
  }
  if (error.message === "Permission Denied.") {
    return <Forbiden />;
  }
  return (
    <>
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}

      <h1 className="pl-10 text-primary text-4xl font-medium mt-10 mb-5">
        Users
      </h1>
      {/* <pre>{JSON.stringify(products.objects[0], null, 2)}</pre> */}
      <div className="container mx-auto ">
        {data?.adminAllUserPaginated?.objects.length ? (
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
                    UserName
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" class="px-6 py-3">
                    email
                  </th>
                  <th scope="col" class="px-6 py-3">
                    dateJoined
                  </th>

                  <th scope="col" class="px-6 py-3">
                    isSeller
                  </th>
                  <th scope="col" class="px-6 py-3">
                    isDeliverer
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.adminAllUserPaginated.objects.map((user, index) => (
                  <UsersList key={user.id} user={user} index={index} />
                ))}
              </tbody>
            </table>
            <div className="flex justify-center">
              <PaginationComponent page={page} handleChange={handleChange} />
            </div>
          </div>
        ) : (
          <NoItems message={"no Items"} />
        )}
      </div>
    </>
  );
};

export default Users;
