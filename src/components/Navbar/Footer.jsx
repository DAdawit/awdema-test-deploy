import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import NewsLetter from "./NewsLetter";
const Footer = () => {
  const { loading } = useContext(AuthContext);
  // console.log(loading);
  return (
    <>
      {!loading ? (
        <footer className="bg-gray-900 text-white pt-5 bottom-0 left-0 z-20 w-full">
          <div className="flex justify-evenly items-center px-3 gap-1 ">
            <div className="bg-white hidden md:flex h-fill">
              <Image src="/logo1.png" width="100" height="80" alt="logo" />
            </div>
            <ul className="text-sm sm:text-lg">
              <li className="text-textPrimary ">Category</li>
              <li>Cloths</li>
              <li>Electronics</li>
              <li>Grocery</li>
              <li>Health & Beauty</li>
              <li>Home Applinaces</li>
              <li>Mobile Accessories</li>
            </ul>
            <ul className="text-sm md:text-lg">
              <li className="text-textPrimary">Information</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Shipping & Return</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
            <ul className="text-sm md:text-lg">
              <li className="text-textPrimary">Customer Care</li>
              <li>My Account</li>
              <li>Track Your Order</li>
              <li>Recentl Viewed</li>
              <li>Wishlist</li>
              <li>Corpare</li>
              <li>Become a Vendor</li>
            </ul>
          </div>
          <div className="flex justify-evenly mt-10 pb-24">
            <div>
              <h3>Got questions ? Call Us 24/7</h3>
              <ul>
                <li>011 11 11 11 11</li>
                <li>011 11 11 11 12</li>
              </ul>
            </div>
            <div>
              <div>
                <h3>Contact info</h3>
                <h4>info@desta.com</h4>
              </div>

              <div className="flex gap-2">
                <Image
                  src="/media/facebook.png"
                  width="25"
                  height="25"
                  alt="facebook"
                />
                <Image
                  src="/media/telegram.png"
                  width="25"
                  height="25"
                  alt="facebook"
                />
                <Image
                  src="/media/twitter.png"
                  width="25"
                  height="25"
                  alt="facebook"
                />
                <Image
                  src="/media/linkedin.png"
                  width="25"
                  height="25"
                  alt="facebook"
                />
              </div>
            </div>
          </div>
          <div className="py-5 shadow-sm mb-5 shadow-gray-500">
            <NewsLetter />
          </div>
        </footer>
      ) : null}
    </>
  );
};

export default Footer;
