import Link from "next/link";
import IconAdd from "@/Icons/IconAdd";
import IconHide from "@/Icons/IconHide";
import IconOrder from "@/Icons/IconOrder";
import IconShopProduct from "@/Icons/IconShopProducts";
import IconDashboard from "@/Icons/IconDashboard";
import { IconPerson } from "@/Icons/IconPerson";
import IconPhone from "@/Icons/IconPhone";
import IconProfile from "@/Icons/IconProfile";
const DelivererLinks = ({ toggleDrawer }) => {
  return (
    <>
      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/delivery/dashboard"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span className="">
            <IconDashboard />
          </span>
          <span className="ml-3 font-medium">Dashboard</span>
        </Link>
      </li>
      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/delivery/profile"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconProfile />
          </span>
          <span className="ml-3">Profile</span>
        </Link>
      </li>
      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/delivery/addPhone"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconPhone />
          </span>
          <span className="ml-3">AddPhoneNumber</span>
        </Link>
      </li>
    </>
  );
};

export default DelivererLinks;
