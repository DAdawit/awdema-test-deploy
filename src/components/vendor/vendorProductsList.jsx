import Image from "next/image";
import Link from "next/link";
import Spinner from "@/Icons/Spinner";
import IconDelete from "@/Icons/IconDelete";
import IconEdit from "@/Icons/IconEdit";
import Moment from "moment";
import { useState } from "react";
import { DELETE_PRODUCT } from "@/graphql";
import client from "../../../apollo-client";
import { showToast } from "../showToast ";
import IconHide from "@/Icons/IconHide";
import { HIDE_PRODUCT } from "@/graphql";
import { UNHIDE_PRODUCT } from "@/graphql";
import IconVisible from "@/Icons/IconVisible";
import { SHOP_PRODUCTS } from "@/graphql";
import ProductModels from "./products/ProductModels";
import EditProductDetail from "./products/EditProductDetail";
import IconCheck from "@/Icons/IconCheck";
import { TableCell, TableRow } from "@mui/material";
import ConfirmDialogIcon from "../ProductCards/ConfirmDialogIcon";
const VendorProductsList = ({ product, index, hidden, refetch, subCat }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);

  function fetch() {
    fetchShopProducts();
  }

  const deleteProduct = async (productId) => {
    setDeleteLoading(true);

    await client
      .mutate({
        mutation: DELETE_PRODUCT,
        variables: { productId },
      })
      .then(async () => {
        refetch();
        showToast("success", "Product deleted successfully!");
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  const hideProduct = async (productId) => {
    setHideLoading(true);

    await client
      .mutate({
        mutation: HIDE_PRODUCT,
        variables: { productId },
      })
      .then(async () => {
        refetch();
        showToast("success", "Product hiden from your store !");
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setHideLoading(false);
      });
  };
  const unhideProduct = async (productId) => {
    setHideLoading(true);
    await client
      .mutate({
        mutation: UNHIDE_PRODUCT,
        variables: { productId },
      })
      .then(() => {
        refetch();
        showToast("success", "Product unhided successfully !");
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setHideLoading(false);
      });
  };

  return (
    <>
      {/* {index == 0 ? <pre>{JSON.stringify(subCat, null, 2)}</pre> : null} */}

      <TableRow
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="left">
          {/* eslint-disable-next-line */}
          <Link href={`/product/detail/${product?.id}`}>
            <Image
              src={`https://awdma.afroel.com/media/${product.image}`}
              height="50"
              width="50"
              alt="pro image"
              className="rounded-lg"
            />
          </Link>
        </TableCell>
        <TableCell align="left">{product.name}</TableCell>
        <TableCell align="left">{product.price}</TableCell>
        <TableCell align="left">{product.totalQuantity}</TableCell>
        <TableCell align="left">
          {product.totalQuantity === -1 ? (
            <div className="flex justify-center items-center bg-red-500 px-2 py-1 text-white rounded-md text-sm gap-1">
              <IconHide />
              <span>hidden</span>
            </div>
          ) : (
            <div className=" flex justify-center items-center bg-green-500 text-white rounded-md text-sm">
              <IconCheck />
            </div>
          )}
        </TableCell>
        <TableCell align="left">
          <ProductModels
            productmodelSet={product?.productmodelSet}
            subCat={subCat}
            refetch={refetch}
            productId={product.id}
            Image={product.image}
          />
        </TableCell>
        <TableCell align="left">{product.totalSell}</TableCell>
        <TableCell align="left">
          {Moment(product.date).format("MMM Do YY")}
        </TableCell>
        <TableCell align="left">
          {hidden ? (
            <div className="flex items-center gap-3">
              <button
                className="flex justify-center items-center gap-1 border-2 border-primary px-2 py-1 rounded-md first-line:text-red-400 transition hover:scale-110 mt-3 cursor-pointer"
                onClick={() => unhideProduct(product.id)}
              >
                {hideLoading ? <Spinner /> : <IconVisible />}
                <span>Unhide</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <ConfirmDialogIcon
                message="Are you sure you went to delete this product ?"
                productId={product.id}
                confirm={deleteProduct}
              />
              {/* <button
                className="text-red-400 transition hover:scale-110 mt-3 cursor-pointer"
                onClick={() => deleteProduct(product.id)}
              >
                {deleteLoading ? <Spinner /> : <IconDelete />}
              </button> */}
              <EditProductDetail
                product={product}
                subCat={subCat}
                refetch={refetch}
              />
              <button
                className="flex justify-center items-center gap-1 border-2 border-primary px-2 py-1 rounded-md first-line:text-red-400 transition hover:scale-110 mt-3 cursor-pointer"
                onClick={() => hideProduct(product.id)}
              >
                {hideLoading ? <Spinner /> : <IconHide />}
                <span>Hide</span>
              </button>
            </div>
          )}
        </TableCell>
      </TableRow>
      {/* 
      <tr className="bg-white border-b hover:bg-gray-100" key={index}>
        <td class="px-6 py-4">{index + 1}</td>

        <td
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <Link href={`/product/detail/${product?.id}`}>
            <Image
              src={`https://awdma.afroel.com/media/${product.image}`}
              height="50"
              width="50"
              alt="pro image"
              className="rounded-lg"
            />
          </Link>
        </td>
        <td class="px-6 py-4">{product.name}</td>
        <td class="px-6 py-4">{product.price}</td>
        <td class="px-6 py-4">{product.totalSell}</td>
        <td class="px-6 py-4">
          {product.totalQuantity === -1 ? (
            <div className="flex justify-center items-center bg-red-500 px-2 py-1 text-white rounded-md text-sm gap-1">
              <IconHide />
              <span>hidden</span>
            </div>
          ) : (
            <div className=" flex justify-center items-center bg-green-500 text-white rounded-md text-sm">
              <IconCheck />
            </div>
          )}
        </td>
        <td class="px-6 py-4">
          <ProductModels
            productmodelSet={product?.productmodelSet}
            subCat={subCat}
            refetch={refetch}
            productId={product.id}
          />
        </td>
        <td class="px-6 py-4">{product.totalSell}</td>
        <td class="px-6 py-4">{Moment(product.date).format("MMM Do YY")}</td>

        <td className="px-6 py-4 col-span-1 ">
          {hidden ? (
            <div className="flex items-center gap-3">
              <button
                className="flex justify-center items-center gap-1 border-2 border-primary px-2 py-1 rounded-md first-line:text-red-400 transition hover:scale-110 mt-3 cursor-pointer"
                onClick={() => unhideProduct(product.id)}
              >
                {hideLoading ? <Spinner /> : <IconVisible />}
                <span>Unhide</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                className="text-red-400 transition hover:scale-110 mt-3 cursor-pointer"
                onClick={() => deleteProduct(product.id)}
              >
                {deleteLoading ? <Spinner /> : <IconDelete />}
              </button>
              <EditProductDetail
                product={product}
                subCat={subCat}
                refetch={refetch}
              />
              <button
                className="flex justify-center items-center gap-1 border-2 border-primary px-2 py-1 rounded-md first-line:text-red-400 transition hover:scale-110 mt-3 cursor-pointer"
                onClick={() => hideProduct(product.id)}
              >
                {hideLoading ? <Spinner /> : <IconHide />}
                <span>Hide</span>
              </button>
            </div>
          )}
        </td>
      </tr> */}
    </>
  );
};
export default VendorProductsList;
