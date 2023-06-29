import Tooltip from "@mui/material/Tooltip";
import client from "../../../apollo-client";
import { useState } from "react";
import { showToast } from "../showToast ";
import { ADMIN_ACTIVATE_DELIVERER } from "@/graphql";
import IconActivate from "@/Icons/IconActivate";
import IconDeactive from "@/Icons/IconDeactive";
import Spinner from "@/Icons/Spinner";
const DelivererList = ({ deliverer, index, refetch }) => {
  const [loading, setLoading] = useState(false);
  const activateDeliverer = async (delivererId) => {
    // console.log(delivererId);
    setLoading(true);
    await client
      .mutate({
        mutation: ADMIN_ACTIVATE_DELIVERER,
        variables: { delivererId },
      })
      .then(() => {
        showToast("success", "deliverer activated successfully!");
        refetch();
      })
      .catch((err) => {
        console.log(err.message);
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
            deliverer?.image
              ? `https://awdma.afroel.com/media/${deliverer?.image}`
              : "/avatar.png"
          }
          alt="Rounded avatar"
        />
      </td>
      <td class="px-6 py-4 capitalize">{deliverer?.name}</td>
      <td class="px-6 py-4 capitalize">
        {deliverer?.phoneNumber.length > 0 ? (
          <div>
            {deliverer?.phoneNumber.map((phone) => (
              <h1 key={phone.id}>{phone.number}</h1>
            ))}
          </div>
        ) : (
          <h1 className="whitespace-nowrap">Not Inserted</h1>
        )}
      </td>
      <td class="px-6 py-4 capitalize">
        {deliverer?.deliveryMethode.length > 0 ? (
          <div>
            {deliverer?.deliveryMethode.map((phone, index) => (
              <h1 key={index}>{phone} </h1>
            ))}
          </div>
        ) : (
          <h1 className="whitespace-nowrap">Not Inserted</h1>
        )}
      </td>
      <td className="px-6 py-4 ">{deliverer?.maximumDeliveryMass}</td>
      <td className="px-6 py-4 ">{deliverer?.maximumDeliveryVolume}</td>
      <td>
        <h1
          className={
            deliverer?.isActive
              ? `bg-green-500 px-1 py-1 rounded-lg text-center text-white`
              : `bg-red-500 px-1 py-1 rounded-lg text-center text-white`
          }
        >
          {deliverer?.isActive ? (
            <div className="flex items-center justify-center space-x-2">
              <span>Active</span>
              <span className="pl-2">
                <IconActivate />
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span>Deactive</span>
              <span>
                <IconDeactive />
              </span>
            </div>
          )}
        </h1>
      </td>
      <td>
        <h1
          className={
            deliverer?.isFree
              ? `bg-green-500 px-1 py-1 rounded-lg text-center text-white`
              : `bg-red-500 px-1 py-1 rounded-lg text-center text-white`
          }
        >
          {deliverer?.isFree ? "Free" : "False"}
        </h1>
      </td>

      <td className="px-6 py-4 ">
        {deliverer?.description.slice(0, 200) + `...`}
      </td>
      <th scope="col" class="px-6 py-3">
        {deliverer?.isActive ? (
          <Tooltip title="Add to BlackList" placement="top-start">
            <h1 className="font-bold flex  text-green-500 px-2">Active</h1>
          </Tooltip>
        ) : (
          <Tooltip title="Activate Deliverer" placement="top-start">
            <button
              className="text-sm font-norma w-max flex gap-2 bg-green-500 px-2 text-white rounded-md hover:scale-105"
              onClick={() => activateDeliverer(deliverer.id)}
            >
              <span>Activate Deliverer</span>
              <span className="text-white">
                {loading ? <Spinner /> : <IconDeactive />}
              </span>
            </button>
          </Tooltip>
        )}
      </th>
    </tr>
    // </div>
  );
};

export default DelivererList;
