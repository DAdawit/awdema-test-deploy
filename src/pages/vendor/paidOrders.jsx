import client from "../../../apollo-client";
import { useEffect, useState } from "react";
import { SELLER_PAID_ORDERS } from "@/graphql";
import CustomLoading from "@/components/customLoading";
import MyOrdersList from "@/components/ProductCards/ordersList";
import NoItems from "@/components/ProductCards/noItems";
import { useQuery } from "@apollo/client";
import context from "../../../context";
import Head from "next/head";
const PaidOrders = () => {
  const [paidOrders, setPaidOrders] = useState({});
  const [pageLoading, setPageLoading] = useState(false);
  let paginateData = {
    pageNo: 1,
    perPage: 20,
    startDate: "1",
    endDate: "null",
  };
  const { data, loading, error, refetch } = useQuery(SELLER_PAID_ORDERS, {
    context: context,
    variables: paginateData,
  });

  if (loading) {
    return <CustomLoading message={"Fetching paid Orders !"} />;
  }
  console.log(data);
  return (
    <>
      <Head>
        <title>Paid Orders</title>
      </Head>
      {/* <pre>{JSON.stringify(paidOrders, null, 2)}</pre> */}

      {/* buyers props used to determain if the user is seller or buyer  */}
      {!loading && data ? (
        <div class="container mx-auto">
          <h1 className="text-primary text-5xl font-medium my-5">Orders</h1>
          {data?.mySellerPaidOrdersPaginated?.objects.map((order, index) => (
            <div key={index}>
              <MyOrdersList index={index} order={order} buyer={false} />
            </div>
          ))}
          <hr />
        </div>
      ) : (
        <NoItems type="order" message="No orders !" />
      )}
    </>
  );
};

export default PaidOrders;
