import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import client from "../../../apollo-client";
import { ADMIN_MARK_REPORTED_PRODUCT_AS_CHECKED } from "@/graphql";
import { useState } from "react";
import IconChecked from "@/Icons/IconChecked";
import IconUnckecked from "@/Icons/IconUnchecked";
import IconDelete from "@/Icons/IconDelete";
import { showToast } from "../showToast ";
import IconCheck from "@/Icons/IconCheck";
import Tooltip from "@mui/material/Tooltip";
import { ADMIN_DELETE_REPORTED_COMMENT } from "@/graphql";
import Spinner from "@/Icons/Spinner";
const ReportedProductsList = ({ report, index, refetch }) => {
  const [checkLoading, setCheckLoading] = useState(false);
  const [deleteLoading, setDeleleteLoading] = useState(false);

  const makeReportedProductAsChecked = async (commentId) => {
    setCheckLoading(true);
    await client
      .query({
        query: ADMIN_MARK_REPORTED_PRODUCT_AS_CHECKED,
        variables: { commentId },
      })
      .then(() => {
        refetch();
        showToast(
          "success",
          "All checked reporte comments on products deleted successfully!"
        );
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setCheckLoading(false);
      });
  };
  const DeleteReporteOnProduct = async (commentId) => {
    setDeleleteLoading(true);
    await client
      .query({
        query: ADMIN_DELETE_REPORTED_COMMENT,
        variables: { commentId },
      })
      .then(() => {
        refetch();
        showToast(
          "success",
          "Report on product marked as checked successfully!"
        );
      })
      .catch((err) => {
        showToast("error", err.message);
      })
      .finally(() => {
        setDeleleteLoading(false);
      });
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-100 " key={index}>
      <td class="px-6 py-4">
        {index + 1}
        {/* <pre>{JSON.stringify(product.null, 2)}</pre> */}
      </td>

      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        <Link href={`/product/detail/${report?.product?.id}`}>
          {/* eslint-disable-next-line */}
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={
              report?.product?.image
                ? `https://awdma.afroel.com/media/${report?.product?.image}`
                : "/avatar.png"
            }
            alt="Rounded avatar"
          />
        </Link>
      </td>
      <td class="px-6 py-4 capitalize">{report?.product?.name}</td>
      <td className="px-6 py-4 ">
        {moment(report?.dateTime).format("MMM Do YY")}
      </td>
      <td className="px-6 py-4 ">{report?.reason}</td>

      <td>
        <h1
          className={
            report?.isChecked
              ? `bg-green-400 px-1 py-1 rounded-lg text-center text-white`
              : `bg-red-500 px-1 py-1 rounded-lg  text-center text-white`
          }
        >
          {report?.isChecked ? (
            <div className="flex justify-center items-center gap-2">
              <span>Checked</span>
              <IconChecked />
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <span>UnChecked</span>
              <span>
                <IconUnckecked />
              </span>
            </div>
          )}
        </h1>
      </td>
      <td className="px-6 py-4  col-span-2 flex items-end">
        {!report?.isChecked ? (
          <button
            className="px-1 bg-primary text-white rounded-md hover:scale-105 py-1 mt-2 flex justify-normal items-center w-max"
            onClick={() => makeReportedProductAsChecked(report.id)}
          >
            <span>Mark as checked</span>
            <span>
              <span>{checkLoading ? <Spinner /> : <IconCheck />}</span>
            </span>
          </button>
        ) : null}
        <Tooltip title="Delete Item" placement="top-start">
          <button
            className="text-red-500 px-1 hover:scale-105 mt-2"
            onClick={() => DeleteReporteOnProduct(report.id)}
          >
            {deleteLoading ? <Spinner /> : <IconDelete />}
          </button>
        </Tooltip>
      </td>
    </tr>
    // </div>
  );
};

export default ReportedProductsList;
