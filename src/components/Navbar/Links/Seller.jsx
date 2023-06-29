import Link from "next/link";
import IconAdd from "@/Icons/IconAdd";
import IconHide from "@/Icons/IconHide";
import IconOrder from "@/Icons/IconOrder";
import IconShopProduct from "@/Icons/IconShopProducts";
import IconDashboard from "@/Icons/IconDashboard";
import IconPhone from "@/Icons/IconPhone";
const SellerLinks = ({ toggleDrawer }) => {
  return (
    <>
      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/vendor/dashboard"
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
          href="/vendor/addProduct"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconAdd />
          </span>
          <span className="ml-3">Add Product</span>
        </Link>
      </li>
      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/vendor/products"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconShopProduct />
          </span>
          <span className="ml-3">Products</span>
        </Link>
      </li>
      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/vendor/hiddenProducts"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconHide />
          </span>
          <span className="ml-3">Hidden Products</span>
        </Link>
      </li>

      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/vendor/paidOrders"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconOrder />
          </span>
          <span className="ml-3">Paid Orders</span>
        </Link>
      </li>
      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/vendor/unpaidOrders"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconOrder />
          </span>
          <span className="ml-3">Unpaid Orders</span>
        </Link>
      </li>

      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/vendor/shopPhoneNumbers"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconPhone />
          </span>
          <span className="ml-3">Add Phone Number</span>
        </Link>
      </li>
    </>
  );
};

export default SellerLinks;
