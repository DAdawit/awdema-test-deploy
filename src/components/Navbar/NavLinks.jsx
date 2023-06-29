import IconDashboard from "../../Icons/IconDashboard";
import Link from "next/link";
import IconHome from "../../Icons/IconHome";
import IconProfile from "../../Icons/IconProfile";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import IconAdd from "../../Icons/IconAdd";
import IconArrowUp from "@/Icons/IconArrowUp";
import IconArrowDown from "@/Icons/IconArrowDown";
import { useState } from "react";
import IconStore from "@/Icons/IconStore";
import IconOrder from "@/Icons/IconOrder";
import IconShopProduct from "@/Icons/IconShopProducts";
import IconHide from "@/Icons/IconHide";
import IconAdmin from "@/Icons/IconAdmin";
// import SellerLinks from "./Seller/Links";
// import AdminLinks from "./admin/Links";
import IconLogout from "@/Icons/IconLogout";
import IconDelivery from "@/Icons/IconDelivery";
import AdminLinks from "./Links/Admin";
import SellerLinks from "./Links/Seller";
import DelivererLinks from "./Links/Deliverer";
// import DelivererLinks from "./deliverer/Links";
const NavLinks = ({ toggleDrawer }) => {
  const [shop, setShop] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [deliverer, setDeliverer] = useState(false);

  const { user, auth, seller } = useContext(AuthContext);
  return (
    <>
      {/* <pre>{JSON.stringify(seller, null, 2)}</pre> */}

      <div className="pb-4 overflow-y-auto relative">
        <ul className="space-y-2 ">
          <li className="shadow-sm">
            <Link
              href="/"
              className="flex font-medium items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
              onClick={() => toggleDrawer()}
            >
              <span>
                <IconHome />
              </span>
              <span className="ml-3 font-medium ">Home</span>
            </Link>
          </li>
        </ul>
        {auth ? (
          <div>
            <ul className="space-y-2 font-medium">
              <li className="shadow-sm" onClick={() => toggleDrawer()}>
                <Link
                  href="/user/profile"
                  className="flex items-center p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
                >
                  <span className="">
                    <IconProfile />
                  </span>
                  <span
                    className="ml-3 font-medium"
                    onClick={() => toggleDrawer()}
                  >
                    Profile
                  </span>
                </Link>
              </li>
              <li className="shadow-sm" onClick={() => toggleDrawer()}>
                <Link
                  href="/user/myOrders"
                  className="flex  items-center p-2 font-medium text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
                >
                  <span>
                    <IconOrder />
                  </span>
                  <span className="ml-3">Track Order</span>
                </Link>
              </li>
            </ul>
            {/* admin  page links */}
            <ul className="space-y-2 font-medium">
              <li className="shadow-sm">
                <button
                  onClick={() => setAdmin(!admin)}
                  className="flex items-center font-medium w-full p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
                >
                  <span className="">
                    <IconAdmin />
                  </span>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap ">
                    Admin
                  </span>
                  {admin ? <IconArrowUp /> : <IconArrowDown />}
                </button>
              </li>
              <div className={admin ? `grid pl-5` : `hidden`}>
                <AdminLinks toggleDrawer={toggleDrawer} />
                {/* <AdminLinks toggleDrawer={toggleDrawer} /> */}
              </div>
            </ul>
            {user?.isSeller ? (
              <ul>
                {/* drop down for shop  */}
                <li className="shadow-sm">
                  <button
                    onClick={() => setShop(!shop)}
                    className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
                  >
                    <span>
                      <IconStore />
                    </span>
                    <span className="flex-1 ml-3 text-left whitespace-nowrap font-medium">
                      Seller
                    </span>
                    {shop ? <IconArrowUp /> : <IconArrowDown />}
                  </button>
                </li>
                <div className={shop ? `grid pl-5` : `hidden`}>
                  {/* passing toggle drawer as a props after a link */}
                  {/* <SellerLinks toggleDrawer={toggleDrawer} /> */}
                  <SellerLinks toggleDrawer={toggleDrawer} />
                </div>

                {/* </ul> */}
              </ul>
            ) : null}
          </div>
        ) : null}

        {user?.isDeliverer ? (
          <ul>
            {/* drop down for shop  */}
            <li className="shadow-sm">
              <button
                onClick={() => setDeliverer(!deliverer)}
                className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-800"
              >
                <span>
                  <IconDelivery />
                </span>
                <span className="flex-1 ml-3 text-left whitespace-nowrap font-medium">
                  Deliverer
                </span>
                {deliverer ? <IconArrowUp /> : <IconArrowDown />}
              </button>
            </li>
            <div className={deliverer ? `grid pl-5` : `hidden`}>
              {/* passing toggle drawer as a props after a link */}
              {/* <DelivererLinks toggleDrawer={toggleDrawer} /> */}
              <DelivererLinks toggleDrawer={toggleDrawer} />
            </div>

            {/* </ul> */}
          </ul>
        ) : null}

        <ul className="fixed bottom-0">
          <li className="shadow-sm" onClick={() => toggleDrawer()}>
            <button
              onClick={() => logout()}
              className="flex justify-center items-center gap-3 font-medium w-full px-20 py-2 text-white bg-gray-800"
            >
              <span>Logout</span>
              <span>
                <IconLogout />
              </span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavLinks;
