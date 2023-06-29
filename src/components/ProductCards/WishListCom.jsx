import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CHANGE_CART_QUANTITY } from "@/graphql";
import client from "../../../apollo-client";
import IconDelete from "../../Icons/IconDelete";
import { showToast } from "../showToast ";
import Spinner from "../../Icons/Spinner";
import Loading from "../loading";
import { REMOVE_FROM_WISHLIST } from "@/graphql";
import { IconAddToCart } from "@/Icons/IconAddToCart";
import { WISHLIST_TO_CART } from "@/graphql";
import Tooltip from "@mui/material/Tooltip";
import { TableCell, TableRow } from "@mui/material";

const WishListComponent = ({ product, index, changeQuantity }) => {
  const [loadingRemoveFromCart, setLoadingRemoveFromCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moveToCartLoading, setMoveToCartLoading] = useState(false);
  const handleDecrement = async (index) => {
    setQuntity(async (prev) => {
      if (prev == 1) {
        await changeQuantity(product.id, 1);
        return 1;
      } else {
        await changeQuantity(prev - 1, index);
        return prev - 1;
      }
    });
  };

  const removeFromCart = async (productIndex) => {
    setLoadingRemoveFromCart(true);
    await client
      .mutate({
        mutation: REMOVE_FROM_WISHLIST,
        variables: { productIndex },
      })
      .then((res) => {
        setLoadingRemoveFromCart(false);
        showToast("success", "product removed from your Wishlist");
      })
      .catch((err) => {
        setLoadingRemoveFromCart(false);
        showToast("error", err.message);
      });
    console.log(productIndex);
  };

  const addWishListToCart = async (productIndex) => {
    setMoveToCartLoading(true);
    await client
      .mutate({
        mutation: WISHLIST_TO_CART,
        variables: { productIndex },
      })
      .then((res) => {
        setMoveToCartLoading(false);
        showToast("success", "product removed to cart ");
      })
      .catch((err) => {
        console.log(err.message);
        setMoveToCartLoading(false);
        showToast("error", err.message);
      });
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}

      <TableRow
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          <Link href={`/products/detail/${product?.ProductId}`}>
            <Image
              src={`https://awdma.afroel.com${product.image}`}
              height="50"
              width="50"
              alt="pro image"
              className="rounded-lg h-15 w-15 object-contain"
            />
          </Link>
        </TableCell>
        <TableCell component="th" scope="row">
          {product.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {product.price}
        </TableCell>
        <TableCell component="th" scope="row">
          {product.model}
        </TableCell>

        <TableCell component="th" scope="row">
          {product.color ? `${product.color}` : "First"}
        </TableCell>
        <TableCell component="th" scope="row">
          <Tooltip title="add to cart" placement="top-start">
            <button
              onClick={() => addWishListToCart(index)}
              className="text-primary"
            >
              {moveToCartLoading ? <Spinner /> : <IconAddToCart />}
            </button>
          </Tooltip>
          <Tooltip title="delete from wishList" placement="top-start">
            <button
              onClick={() => removeFromCart(index)}
              className="material-icons text-red-400 transition hover:scale-110
            cursor-pointer"
            >
              {loadingRemoveFromCart ? <Spinner /> : <IconDelete />}
            </button>
          </Tooltip>
        </TableCell>
      </TableRow>

      {/* <tr className="bg-white border-b hover:bg-gray-100">
        <td
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <Link href={`/product/detail/${product?.ProductId}`}>
            <Image
              src={`https://awdma.afroel.com${product.image}`}
              height="50"
              width="50"
              alt="pro image"
              className="rounded-lg h-15 w-15 object-contain"
            />
          </Link>
        </td>

        <th className="px-6 py-4">{product.name}</th>
        <td className="px-6 py-4">{product?.price}</td>
        <td className="px-6 py-4">{product?.model}</td>
        <td className="px-6 py-4 col-span-2 gap-3 flex mt-3 items-center">
          <Tooltip title="add to cart" placement="top-start">
            <button
              onClick={() => addWishListToCart(index)}
              className="text-primary"
            >
              {moveToCartLoading ? <Spinner /> : <IconAddToCart />}
            </button>
          </Tooltip>
          <Tooltip title="delete from wishList" placement="top-start">
            <button
              onClick={() => removeFromCart(index)}
              className="material-icons text-red-400 transition hover:scale-110
            cursor-pointer"
            >
              {loadingRemoveFromCart ? <Spinner /> : <IconDelete />}
            </button>
          </Tooltip>
        </td>
      </tr> */}
    </>
  );
};
export default WishListComponent;
