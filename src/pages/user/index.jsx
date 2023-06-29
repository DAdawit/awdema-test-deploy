import Avatar from "@/components/user/Avatar";
import Image from "next/image";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import IconEmail from "@/Icons/IconEmail";
import IconPhone from "@/Icons/IconPhone";
import ChangePassword from "@/components/user/changePassword";
import SellerAddPhoneNumber from "./sellerAddPhoneNumber";
import SellerProfile from "@/components/user/SellerProfile";
import EditShopInfo from "@/components/user/EditShopInfo";
import EditProfile from "@/components/user/EditProfile";
import Link from "next/link";
const Profile = () => {
  const { user, auth, seller } = useContext(AuthContext);

  return (
    <>
      {/* <pre>{JSON.stringify(seller, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {/* <SellerProfile /> */}

      <section className="px-10 h-screen">
        <h1 className="text-primary text-5xl font-bold container px-10 py-5">
          Profile
        </h1>
        <div className="">
          <div className="bg-auto md:bg-contain rounded-md relative  bg-white">
            {/* eslint-disable-next-line */}
            <img
              src="/profileBanner1.png"
              alt="banner image"
              className="w-full h-44 object-cover rounded-md"
            />
            <div className="absolute top-36 left-20 md:left-36">
              <div className="w-20 h-20 rounded-full relative">
                <div className="absolute  rounded-full">
                  <Link href="/user/changeProfileImage/">
                    <Image
                      className="object-cover w-20 h-20 rounded-full"
                      src={
                        user.profilePicture
                          ? `https://awdma.afroel.com/media/${user.profilePicture}`
                          : "/avatar.png"
                      }
                      width="100"
                      height="100"
                      alt="user profile"
                    />
                  </Link>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full absolute  right-2 bottom-1"></div>
              </div>
              <div className="flex items-end gap-2 ">
                <h1 className="font-medium text-2xl  capitalize text-primary flex">
                  {user.firstName} {user.lastName}
                </h1>
              </div>
            </div>
            {/* show email and phoneNumber in large screen  */}
            <div className="justify-end mt-2 mr-2 hidden sm:grid">
              <div className="flex gap-1 items-center text-primary">
                <IconEmail /> {user.email}
              </div>
              <div className="flex gap-1 items-center text-primary capitalize">
                <IconPhone /> {user.phone}
              </div>
            </div>
          </div>
          {/* show email and phoneNumber in small screen  */}

          <div className="justify-center mr-2 grid sm:hidden mt-20">
            <div className="flex gap-1 items-center text-primary capitalize">
              <IconEmail /> {user.email}
            </div>
            <div className="flex gap-1 items-center text-primary capitalize">
              <IconPhone /> {user.phone}
            </div>
          </div>
          <div className="flex gap-1 justify-start  sm:mt-5">
            <EditProfile />
            <ChangePassword />
          </div>
          <div>
            {user.isSeller ? (
              <div className="flex gap-1 justify-start">
                <SellerProfile />
                <EditShopInfo />
              </div>
            ) : null}
          </div>
          <div>
            {user.isSeller ? (
              <Link
                href="/vendor/addShopeCover"
                className="flex justify-center items-center bg-white text-primary border-2 border-primary px-4 py-2 w-min mt-3"
              >
                <span className=" whitespace-nowrap ">
                  {seller.shopPicture ? `Change` : `Add`} Shope Image
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      </section>
      {/* {user.isSeller ? <SellerProfile /> : null} */}

      {/* {user.isSeller ? (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 my-10">
            <div className="col-span-2">
              <SellerAddPhoneNumber />
            </div>
          </div>
        </section>
      ) : null} */}
    </>
  );
};
export default Profile;
