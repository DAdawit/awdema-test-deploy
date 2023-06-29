import IconCategory from "@/Icons/IconCategory";
import IconDashboard from "@/Icons/IconDashboard";
import IconDelivery from "@/Icons/IconDelivery";
import IconReport from "@/Icons/IconReport";
import IconShopProduct from "@/Icons/IconShopProducts";
import IconUser from "@/Icons/IconUser";
import Link from "next/link";
const AdminLinks = ({ toggleDrawer }) => {
  return (
    <>
      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/admin/dashboard/"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconDashboard />
          </span>
          <span className="ml-3">Dashboard</span>
        </Link>
      </li>
      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/admin/users/"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconUser />
          </span>
          <span className="ml-3">Users</span>
        </Link>
      </li>
      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/admin/shops/"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconShopProduct />
          </span>
          <span className="ml-3">Shops</span>
        </Link>
      </li>
      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/admin/reportedProducts/"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconReport />
          </span>
          <span className="ml-3">Reported Products</span>
        </Link>
      </li>
      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/admin/deliverers"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconDelivery />
          </span>
          <span className="ml-3">Deliverers</span>
        </Link>
      </li>
      <li className="shadow-sm" onClick={() => toggleDrawer()}>
        <Link
          href="/admin/categories"
          className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
        >
          <span>
            <IconCategory />
          </span>
          <span className="ml-3">Categories</span>
        </Link>
      </li>
    </>
  );
};

export default AdminLinks;
