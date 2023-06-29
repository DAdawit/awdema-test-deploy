import Image from "next/image";
import Link from "next/link";
import BecomeSeller from "./BecomeSeller";
const Hero = () => {
  return (
    <div className="px-10 mt-4">
      <div className="flex gap-2 ">
        <div className="hidden md:grid">
          <div className=" col-span-1 row-span-9 justify-between pl-5 border drop-shadow-lg pb-5 sm:w-0 md:w-64">
            <h1 className="text-center text-2xl py-3">Categories</h1>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">computer</span>
                <Link href="#" className="hover:underline">
                  Electronics
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined ">
                  business_center
                </span>
                <Link href="#" className="hover:underline">
                  Accessories
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">styler</span>
                <Link href="#" className="hover:underline">
                  Cloth
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">restaurant</span>
                <Link href="#" className="hover:underline">
                  Food
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">chair</span>
                <Link href="#" className="hover:underline">
                  Furnitures
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">self_care</span>
                <Link href="#" className="hover:underline">
                  Selfcare
                </Link>
              </div>
              <div className="flex items-center">
                <span className="material-symbols-outlined gap-2">bolt</span>
                <Link href="#" className="hover:underline">
                  Electrical Accessories
                </Link>
              </div>
            </div>
          </div>
          <Link href="/vendor">
            <BecomeSeller />
          </Link>
        </div>
        <div className="flex sm:justify-center gap-2">
          <div className="rounded-lg">
            {/* eslint-disable-next-line */}
            <img
              src="/img1.png"
              className="heroImages rounded-2xl"
              alt="hero image1"
            />
          </div>
          <div className="rounded-lg">
            {/* eslint-disable-next-line */}
            <img
              src="/img2.png"
              className="heroImages rounded-2xl"
              alt="hero image2"
            />
          </div>
          <div className="rounded-lg  hidden sm:block">
            {/* eslint-disable-next-line */}
            <img
              src="/img3.png"
              className="heroImages rounded-2xl"
              alt="hero image3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
