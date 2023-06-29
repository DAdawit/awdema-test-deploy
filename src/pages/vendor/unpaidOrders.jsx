import { SELLER_UNPAID_ORDERS } from "@/graphql";
import CustomLoading from "@/components/customLoading";
import MyOrdersList from "@/components/ProductCards/ordersList";
import NoItems from "@/components/ProductCards/noItems";
import { useQuery } from "@apollo/client";
import context from "../../../context";
import Head from "next/head";
const UnPaidOrders = () => {
  let paginateData = {
    pageNo: 1,
    perPage: 20,
    startDate: "1",
    endDate: "null",
  };
  const { data, loading, error, refetch } = useQuery(SELLER_UNPAID_ORDERS, {
    context: context,
    variables: paginateData,
  });

  if (loading) {
    return <CustomLoading message={"Fetching unpaid Orders !"} />;
  }
  return (
    <>
      <Head>
        <title>Unpaind Orders</title>
      </Head>
      {/* <pre>{JSON.stringify(unpaidOrders?.objects[0], null, 2)}</pre> */}
      {!loading && data ? (
        <div class="container mx-auto">
          <h1 className="text-primary text-5xl font-medium my-5">Orders</h1>
          {data.mySellerUnPaidOrdersPaginated?.objects.map((order, index) => (
            <div key={index}>
              <MyOrdersList index={index} order={order} buyer={false} />
              {/* buyers props used to determain if the user is seller or buyer  */}
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

export default UnPaidOrders;
