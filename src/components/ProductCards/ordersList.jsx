import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CHANGE_CART_QUANTITY } from "@/graphql";
import client from "../../../apollo-client";
import IconDelete from "../../Icons/IconDelete";
import { REMOVE_FROM_CART } from "@/graphql";
import { showToast } from "../showToast ";
import Spinner from "../../Icons/Spinner";
import Loading from "../loading";
import IconArrowDown from "@/Icons/IconArrowDown";
import IconArrowUp from "@/Icons/IconArrowUp";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import IconPaypal from "@/Icons/IconPaypal";
import Paypal from "../payment/Paypal";
const MyOrdersList = ({ index, order, buyer }) => {
  const [showDeliveryDetail, setShowDeliveryDetail] = useState(false);
  const [showBuyerDetail, setShowBuyerDetail] = useState(false);
  const [showSellerDetail, setSellerDetail] = useState(false);
  return (
    <>
      {/* <pre>{JSON.stringify(order, null, 2)}</pre> */}
      <h1 className="flex justify-between text-primary font-medium text-2xl  p-2">
        <div>
          Order <span className="underline">{order.name}</span>
        </div>
        <div className="flex justify-center items-center">
          <Paypal
            orderId={order.orderId}
            numberOfProducts={order.products.length}
            orderName={order?.name}
          />
          {/* <Button variant="outlined">
            pay with paypal
            <IconPaypal />
          </Button> */}
        </div>
      </h1>

      <div className="">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  N<sup className="underline mt-3">o</sup>
                </TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left"> Product name</TableCell>
                <TableCell align="left"> Status </TableCell>
                <TableCell align="left">Product Models</TableCell>
                <TableCell align="left">Product Color</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">TotalPrice</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.products.map((product, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link href={`/product/detail/${product?.productId}`}>
                      <Image
                        //   src="/cat1.png"
                        src={`https://awdma.afroel.com/media/${product.productimage}`}
                        height="50"
                        width="50"
                        alt="pro image"
                        className="rounded-lg"
                      />
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.productName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {order.status}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.productmodel}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.procutcolor
                      ? `${product.productcolor}`
                      : "primary"}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.totalPrice / product.quantity}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.quantity}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.totalPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="flex justify-start gap-5 mt-3">
          {/* button for showing Buyer detail information */}

          <span>
            {!buyer ? (
              <Button
                variant="outlined"
                size="smalll"
                onClick={() => setShowDeliveryDetail(!showDeliveryDetail)}
              >
                <span>
                  {showDeliveryDetail ? `Hide` : `Show`} Delivery Detail
                </span>
                <span>
                  {showDeliveryDetail ? <IconArrowUp /> : <IconArrowDown />}
                </span>
              </Button>
            ) : null}
          </span>
          {/* button for showing delivery detail information */}
          <span>
            <Button
              variant="outlined"
              size="smalll"
              onClick={() => setShowBuyerDetail(!showBuyerDetail)}
            >
              <span>
                {showDeliveryDetail ? `Hide` : `Show`} Delivery Detail
              </span>
              <span>
                {showDeliveryDetail ? <IconArrowUp /> : <IconArrowDown />}
              </span>
            </Button>
          </span>
          <span>
            <Button
              variant="outlined"
              size="smalll"
              onClick={() => setSellerDetail(!showSellerDetail)}
            >
              <span>
                {showDeliveryDetail ? `Hide` : `Show`} Delivery Detail
              </span>
              <span>
                {showDeliveryDetail ? <IconArrowUp /> : <IconArrowDown />}
              </span>
            </Button>
          </span>
        </div>

        {/* DELIVERY DETAIL INFORMATION  */}
        <div className="mb-5">
          <div
            className={showDeliveryDetail ? `flex justify-evenly` : `hidden`}
          >
            <div>
              <h1 className="font-medium text-gray-800">
                Delevery for :{" "}
                <span className="font-normal text-gray-500">
                  {order?.deliveryDetail?.delivery_method}
                </span>
              </h1>
              <h1 className="font-medium text-gray-800">
                Products Weight :{" "}
                <span className="font-normal text-gray-500">
                  {order?.deliveryDetail?.totalProductsMass_KG} (KG)
                </span>
              </h1>
            </div>
            <div>
              <h1 className="font-medium text-gray-800">
                Total Delivery Price :{" "}
                <span className="font-normal text-gray-500">
                  {order?.deliveryDetail?.totalDeliveryPrice}
                </span>
              </h1>
              <h1 className="font-medium text-gray-800">
                Total Products Volume :{" "}
                <span className="font-normal text-gray-500">
                  {order?.deliveryDetail?.totalProductsVolume}
                </span>
              </h1>
            </div>

            <h1 className="font-medium text-gray-900 items-start">
              Total Price :{" "}
              <span className="text-gray-800 underline underline-offset-2">
                {order?.totalPrice} Birr
              </span>
            </h1>
          </div>
        </div>

        {/* BUYER  DETAIL INFORMATION  */}
        <div className="mb-5">
          <div className={showBuyerDetail ? `flex justify-evenly` : `hidden`}>
            <div>
              <h1 className="font-medium text-gray-800">
                Name:{" "}
                <span className="font-normal text-gray-500">
                  {order?.buyerName}
                </span>
              </h1>
              <h1 className="font-medium text-gray-800">
                Phone:{" "}
                <span className="font-normal text-gray-500">
                  {order?.buyerPhone}
                </span>
              </h1>
            </div>
            <div>
              <h1 className="font-medium text-gray-800">
                Email :{" "}
                <span className="font-normal text-gray-500">
                  {order?.buyerEmail}
                </span>
              </h1>
              <h1 className="font-medium text-gray-900 items-start">
                Paid :{" "}
                <span className="text-gray-800 underline underline-offset-2">
                  {order.isPaid ? `Paid` : "Not paid"}
                </span>
              </h1>
            </div>
            <div className="invisible"></div>
          </div>
        </div>

        {/* Seller  DETAIL INFORMATION  */}
        <div className="mb-5">
          <div className={showSellerDetail ? `flex justify-evenly` : `hidden`}>
            <div>
              <h1 className="font-medium text-gray-800">
                Name:{" "}
                <span className="font-normal text-gray-500">
                  {order?.seller?.name}
                </span>
              </h1>
              <h1 className="font-medium text-gray-800">
                Address:{" "}
                <span className="font-normal text-gray-500">
                  {order?.seller?.address}
                </span>
              </h1>
            </div>
            <div>
              <h1 className="font-medium text-gray-800">
                Website :{" "}
                <Link
                  href={`${order?.seller?.domain}`}
                  target="_blank"
                  className="font-normal text-blue-500 underline underline-offset-2"
                >
                  {order?.seller?.domain}
                </Link>
              </h1>
              <h1 className="font-medium text-gray-900 items-start">
                TinNumber :{" "}
                <span className="text-gray-800">{order?.seller?.tinNo}</span>
              </h1>
            </div>

            <div className="">
              {order?.seller?.phoneNumber ? (
                <div>
                  <h1 className="font-medium text-gray-900 items-start">
                    phone :{" "}
                  </h1>
                  {order?.seller?.phoneNumber.map((phone) => (
                    <div key={phone.id}>
                      <span className="text-gray-800">{phone?.number}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <h1>No phoneNumber set</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyOrdersList;
