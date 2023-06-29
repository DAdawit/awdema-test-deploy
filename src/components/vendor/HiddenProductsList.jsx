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
import { TableCell, TableRow } from "@mui/material";
const HiddenProductsList = ({ product, index, hidden, refetch, subCat }) => {
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
        <TableCell component="th" scope="row">
          <Link href={`/product/detail/${product?.id}`}>
            <Image
              src={`https://awdma.afroel.com/media/${product.image}`}
              height="50"
              width="50"
              alt="pro image"
              className="rounded-lg"
            />
          </Link>{" "}
        </TableCell>
        <TableCell component="th" scope="row">
          {product.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {product.price}
        </TableCell>
        <TableCell component="th" scope="row">
          {product.totalQuantity}
        </TableCell>
        <TableCell component="th" scope="row">
          {product.totalSell}
        </TableCell>
        <TableCell component="th" scope="row">
          {Moment(product.date).format("MMM Do YY")}
        </TableCell>
        <TableCell component="th" scope="row">
          <div className="flex items-center gap-3">
            <button
              className="flex justify-center items-center gap-1 border-2 border-primary px-2 py-1 rounded-md first-line:text-red-400 transition hover:scale-110 mt-3 cursor-pointer"
              onClick={() => unhideProduct(product.id)}
            >
              {hideLoading ? <Spinner /> : <IconVisible />}
              <span>Unhide</span>
            </button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};
export default HiddenProductsList;
