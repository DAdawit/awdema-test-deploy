import Link from "next/link";
import IconAddBlackList from "@/Icons/IconAddBlackList";
import Tooltip from "@mui/material/Tooltip";
import IconRemoveFromBlackList from "@/Icons/IconRemoveBlackList";
import { ADMIN_ADD_SHOP_TO_BLACKLIST } from "@/graphql";
import { ADMIN_REMOVE_SHOP_FROM_BLACKLIST } from "@/graphql";
import client from "../../../apollo-client";
import { useState } from "react";
import { showToast } from "../showToast ";
import IconMore from "@/Icons/IconMore";
import { Shop } from "@mui/icons-material";
import ShopDescription from "./ShopDescription";
import Spinner from "@/Icons/Spinner";
const ShopsList = ({ shop, index, refetch }) => {
  const [loading, setLoading] = useState(false);
  const addShoptoBlackList = async (shopId) => {
    setLoading(true);
    await client
      .query({
        query: ADMIN_ADD_SHOP_TO_BLACKLIST,
        variables: { shopId },
      })
      .then(() => {
        showToast("success", "shop added to blackList successfully!");
        refetch();
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const RemoveShoptoBlackList = async (shopId) => {
    setLoading(true);
    await client
      .query({
        query: ADMIN_REMOVE_SHOP_FROM_BLACKLIST,
        variables: { shopId },
      })
      .then(() => {
        showToast("success", "shop removed from blackList successfully!");
        refetch();
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <tr className="bg-white border-b hover:bg-gray-100 " key={index}>
      <td class="px-6 py-4">{index + 1}</td>

      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        {/* eslint-disable-next-line */}
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={
            shop?.shopPicture
              ? `https://awdma.afroel.com/media/${shop?.shopPicture}`
              : "/avatar.png"
          }
          alt="Rounded avatar"
        />
      </td>
      <td class="px-6 py-4 capitalize">{shop?.name}</td>
      <td className="px-6 py-4 ">{shop?.tinNo}</td>
      <td className="px-6 py-4 ">
        <Link className="text-blue-500 underline" href={`${shop?.domain}`}>
          {shop?.domain}
        </Link>
      </td>
      <td>
        <h1
          className={
            shop?.isActive
              ? `bg-green-300 px-1 py-1 rounded-lg text-center text-white`
              : `bg-red-500 px-1 py-1 rounded-lg text-center text-white`
          }
        >
          {shop?.isActive ? "Active" : "False"}
        </h1>
      </td>

      <td className="px-6 py-4 ">
        {shop.description.length > 50 ? (
          <div>
            <p> {shop?.description.slice(0, 50) + `...`}</p>
            <ShopDescription description={shop?.description} />
          </div>
        ) : (
          <p>{shop?.description} </p>
        )}
        {/* {shop?.description.slice(0, 100) + `${shop.description.length}`}{" "}
        <IconMore /> */}
      </td>
      <th scope="col" class="px-6 py-3">
        {shop?.isActive ? (
          <Tooltip title="Add to BlackList" placement="top-start">
            <button
              className="text-sm font-norma w-max flex gap-2 bg-red-500 px-2 text-white rounded-md hover:scale-105"
              onClick={() => addShoptoBlackList(shop.id)}
            >
              <span>Blacklist</span>
              <span>
                <span className="text-white">
                  {loading ? <Spinner /> : <IconAddBlackList />}
                </span>
              </span>
            </button>
          </Tooltip>
        ) : (
          <Tooltip title="Remove from BlackList" placement="top-start">
            <button
              className="text-sm font-norma w-max flex gap-2 bg-green-300 px-2 text-white rounded-md hover:scale-105"
              onClick={() => RemoveShoptoBlackList(shop.id)}
            >
              <span>Blacklist</span>
              <span className="text-white">
                {loading ? <Spinner /> : <IconRemoveFromBlackList />}
              </span>
            </button>
          </Tooltip>
        )}
      </th>
    </tr>
    // </div>
  );
};

export default ShopsList;
