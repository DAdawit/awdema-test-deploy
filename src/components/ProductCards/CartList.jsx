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
import { CART_TO_WISHLIST } from "@/graphql";
import IconWishlist from "@/Icons/IconWishList";
import Tooltip from "@mui/material/Tooltip";
import { TableCell, TableRow, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const CartList = ({ product, index, changeQuantity }) => {
  const [loadingRemoveFromCart, setLoadingRemoveFromCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartToWishlistLoading, setCartToWishlistLoading] = useState(false);
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
        mutation: REMOVE_FROM_CART,
        variables: { productIndex },
      })
      .then((res) => {
        showToast("success", "product removed from your cart");
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setLoadingRemoveFromCart(false);
      });
    console.log(productIndex);
  };

  const addCartItemToWishList = async (productIndex) => {
    setCartToWishlistLoading(true);
    await client
      .mutate({
        mutation: CART_TO_WISHLIST,
        variables: { productIndex },
      })
      .then((res) => {
        setCartToWishlistLoading(false);
        showToast("success", "product removed to wishlist ");
      })
      .catch((err) => {
        console.log(err.message);
        setCartToWishlistLoading(false);
        showToast("error", err.message);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* <pre>{JSON.stringify(verificationResult, null, 2)}</pre> */}

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
              className="rounded-lg"
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
          {product?.model}
        </TableCell>
        <TableCell component="th" scope="row">
          {product.color ? `${product.color}` : "First"}
        </TableCell>
        <TableCell component="th" scope="row">
          <div className="flex">
            <Button
              icon
              onClick={() => changeQuantity(0, index, product.ProductId)}
              size="small"
            >
              <RemoveIcon />
            </Button>
            <span className="m-1 text-medium font-medium">
              {product.quantity}
            </span>
            <Button
              icon
              onClick={() => changeQuantity(1, index, product.ProductId)}
              size="small"
            >
              <AddIcon />
            </Button>
          </div>
          {/* <button
            className="border-2 border-primary px-2 rounded-lg text-primary"
            onClick={() => changeQuantity(0, index, product.ProductId)}
          >
            -
          </button>
          <span className="m-1 text-medium font-medium">
            {product.quantity}
          </span>
          <button
            className="border-2 border-primary px-2 rounded-lg text-primary"
            onClick={() => changeQuantity(1, index, product.ProductId)}
          >
            +
          </button> */}
        </TableCell>
        <TableCell component="th" scope="row">
          {product?.price * product.quantity}
        </TableCell>
        <TableCell component="th" scope="row">
          <div className="flex justify-center items-center">
            <Tooltip title="Add product to whishList" placement="top-start">
              <button
                onClick={() => addCartItemToWishList(index)}
                className="px-2 py-1 text-sm rounded-lg flex items-center justify-center"
              >
                {loadingRemoveFromCart ? <Spinner /> : <IconWishlist />}
              </button>
            </Tooltip>
            {/* <Tooltip text="remove from cart"> */}
            <Tooltip title="remove from cart" placement="top-start">
              <button
                onClick={() => removeFromCart(index)}
                className="text-red-400 transition hover:scale-110
              cursor-pointer"
              >
                {loadingRemoveFromCart ? <Spinner /> : <IconDelete />}
              </button>
            </Tooltip>
          </div>
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
              className="rounded-lg"
            />
          </Link>
        </td>
        <th className="px-6 py-4">{product.name}</th>
        <td className="px-6 py-4">{product?.price}</td>
        <td className="px-6 py-4 flex items-center">
          <button
            className="border-2 border-primary px-2 rounded-lg text-primary"
            onClick={() => changeQuantity(0, index, product.ProductId)}
          >
            -
          </button>
          <span className="m-1 text-medium font-medium">
            {product.quantity}
          </span>
          <button
            className="border-2 border-primary px-2 rounded-lg text-primary"
            onClick={() => changeQuantity(1, index, product.ProductId)}
          >
            +
          </button>
        </td>
        <td className="px-6 py-4">{product?.price * product.quantity}</td>
        <td className="px-6 py-4 flex items-center gap-4">
          <Tooltip title="Add product to whishList" placement="top-start">
            <button
              onClick={() => addCartItemToWishList(index)}
              className="px-2 py-1 text-sm rounded-lg flex items-center justify-center"
            >
              {loadingRemoveFromCart ? <Spinner /> : <IconWishlist />}
            </button>
          </Tooltip>
          <Tooltip title="remove from cart" placement="top-start">
            <button
              onClick={() => removeFromCart(index)}
              className="text-red-400 transition hover:scale-110
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
export default CartList;
