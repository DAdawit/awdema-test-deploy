"use client";
import client from "../../../apollo-client";
import { useState } from "react";
import CustomLoading from "@/components/customLoading";
import Forbiden from "@/components/forbiden";
import { ADMIN_ALL_REPORTED_PRODUCTS } from "@/graphql";
import ReportedProductsList from "@/components/admin/ReportedProductsList";
import context from "../../../context";
import { useQuery } from "@apollo/client";
import NoItems from "@/components/ProductCards/noItems";
import AlertDialog from "@/components/ProductCards/ConfirmDialog";
import { DELETE_ALL_REPORTED_COMMENT_ON_PRODUCT } from "@/graphql";
import { showToast } from "@/components/showToast ";
import PaginationComponent from "@/components/Pagination";
const ReportedProducts = () => {
  const [deleteAllLoading, setDeleteAllLoading] = useState(false);
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

  let params = {
    startDate: "",
    endDate: "",
  };

  const { data, loading, error, refetch } = useQuery(
    ADMIN_ALL_REPORTED_PRODUCTS,
    {
      context: context,
      variables: { ...params, ...paginateParams },
    }
  );

  if (loading) {
    return <CustomLoading message="featching reported products" />;
  }
  if (error.message == "Permission Denied.") {
    return <Forbiden />;
  }
  const confirm = async () => {
    console.log("clear report");
    setDeleteAllLoading(true);
    await client
      .query({
        query: DELETE_ALL_REPORTED_COMMENT_ON_PRODUCT,
      })
      .then(() => {
        showToast("success", "Product added to cart successfully!");
        refetch();
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setDeleteAllLoading(true);
      });
  };
  return (
    <>
      {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}

      <div className="container mx-auto my-10">
        {data?.adminReportOnProduct?.objects.length > 0 ? (
          <div>
            <h1 className="pl-10 text-primary text-4xl font-medium mt-10 mb-5 ">
              Reported Products List
            </h1>
            <div className="container mx-auto flex justify-end my-2">
              <AlertDialog
                text="Delete All"
                message={"Are you sure you went to delete all ?"}
                confirm={() => confirm()}
              />
            </div>
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
                    Reported date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Reason
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3 ">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.adminReportOnProduct?.objects.map((report, index) => (
                  <ReportedProductsList
                    key={report.id}
                    report={report}
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
        ) : (
          <NoItems type="order" message="No Reported items !" />
        )}
      </div>
    </>
  );
};

export default ReportedProducts;
