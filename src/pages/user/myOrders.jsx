import client from "../../../apollo-client";
import { useEffect, useState } from "react";
import { MY_ORDERS } from "@/graphql";
import CustomLoading from "@/components/customLoading";
import MyOrdersList from "@/components/ProductCards/ordersList";
import NoItems from "@/components/ProductCards/noItems";
import Head from "next/head";
const MyOrders = () => {
  const [loading, setLoading] = useState(false);
  const [myOrders, setMyOrders] = useState({});
  const fetchMyOrders = () => {
    setLoading(true);
    client
      .query({
        query: MY_ORDERS,
      })
      .then((res) => {
        setMyOrders(res.data);
        setLoading(false);

        // console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchMyOrders();
  }, []);
  if (loading) {
    return <CustomLoading message={"Fetching Order Items"} />;
  }
  return (
    <>
      {/* <pre>{JSON.stringify(myOrders, null, 2)}</pre> */}
      <Head>
        <title>My orders</title>
      </Head>
      {!loading && myOrders.myOrdersPaginated?.objects.length > 0 ? (
        <div class="container mx-auto">
          <h1 className="text-primary text-5xl font-medium my-5">My Orders</h1>

          {myOrders.myOrdersPaginated?.objects.map((order, index) => (
            <div key={index}>
              <MyOrdersList index={index} order={order} buyer={true} />
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
export default MyOrders;
