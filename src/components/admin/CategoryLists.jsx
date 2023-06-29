import Link from "next/link";
import IconAddBlackList from "@/Icons/IconAddBlackList";
import Tooltip from "@mui/material/Tooltip";
import IconRemoveFromBlackList from "@/Icons/IconRemoveBlackList";
import { ADMIN_ADD_SHOP_TO_BLACKLIST } from "@/graphql";
import { ADMIN_REMOVE_SHOP_FROM_BLACKLIST } from "@/graphql";
import { useState } from "react";
import { showToast } from "../showToast ";
import ShopDescription from "./ShopDescription";
import client from "../../../apollo-client";
import SubCategoriesList from "./SubCategoriesList";
import SubCategories from "./SubCategories";
import EditCategory from "./EditCategory";
import CategoriesChangeCoverPicture from "./CategoryChangeCoverPicture";
import { TableCell, TableRow } from "@mui/material";
const CategoryList = ({ category, index, refetch }) => {
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
    <TableRow
      key={index}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell align="left">
        {/* eslint-disable-next-line */}
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={
            category?.image
              ? `https://awdma.afroel.com/media/${category?.image}`
              : "/avatar.png"
          }
          alt="Rounded avatar"
        />
      </TableCell>
      <TableCell align="left">{category.name}</TableCell>
      <TableCell align="left">
        {category.description.length > 50 ? (
          <div>
            <p> {category?.description.slice(0, 50) + `...`}</p>
            <ShopDescription description={category?.description} />
          </div>
        ) : (
          <p>{category?.description} </p>
        )}
      </TableCell>
      <TableCell align="left">
        {" "}
        <SubCategories
          index={index}
          categoryName={category.name}
          subcategorySet={category?.subcategorySet}
          refetch={refetch}
        />
      </TableCell>
      <TableCell align="left">
        {" "}
        <EditCategory category={category} refetch={refetch} />
        <CategoriesChangeCoverPicture categoryName={category.name} />
      </TableCell>
    </TableRow>
  );
};

export default CategoryList;
