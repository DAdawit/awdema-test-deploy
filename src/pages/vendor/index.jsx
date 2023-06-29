"use client";
import RegisterSeller from "@/components/vendor/RegisterSeller";
import Head from "next/head";
const Vendor = () => {
  return (
    <>
      <Head>
        <title>Become Seller</title>
      </Head>
      <div>
        <div className="grid sm:flex  sm:flex-row-reverse items-start justify-end gap-3 mb-20">
          <div>
            {/* eslint-disable-next-line */}
            <img
              src="/shop.jpg"
              alt="shop banner"
              className="object-contain opacity-80 h-96 -mt-18 sm:mt-10 sm:pt-20"
            />
          </div>
          <div className="p-5 -mt-16 sm:mt-5 z-10 ">
            <h1 className="text-gray-800  font-bold text-3xl sm:text-5xl sm:pt-44 max-w-xl">
              Directly Sell Your Products to Customers
            </h1>

            <p className="sm:pt-5 font-medium max-w-2xl mb-5 text-gray-800">
              Made selling easy and reliable! Reach thousand of potential buyers
              on awdema.com
            </p>
            <RegisterSeller />
          </div>
        </div>

        <div className="py-10">
          <h1 className="text-center text-4xl font-bold text-primary my-6 font-mono">
            Start Selling Your Products Today
          </h1>
          <div className="grid sm:flex gap-4 px-5">
            <div className="shadow-sm shadow-gray-500 px-5 py-6">
              <h1 className="text-lg font-bold text-primary mb-1">
                Start Selling Your Products Today
              </h1>
              <p className="text-gray-600">
                Every day, Awdema is used by thousands of customers. Every
                month, hundreds of thousands of potential customers visit our
                marketplace. A figure that is rapidly increasing. Register today
                to attract more customers.
              </p>
            </div>
            <div className="shadow-sm shadow-gray-500 px-5 py-6">
              <h1 className="text-lg font-bold text-primary mb-1">
                Now is the time
              </h1>
              <p className="text-gray-600">
                With thousands of monthly visitors, safe payment options, and a
                wide range of international exposure, now is the moment to
                profit with ashewa.com. Join today and see a significant rise in
                your sales.
              </p>
            </div>
            <div className="shadow-sm shadow-gray-500 px-5 py-6">
              <h1 className="text-lg font-bold text-primary mb-1">
                We do the heavy lifting
              </h1>
              <p className="text-gray-600">
                The load of administering your online store, dealing financial
                burdens, and presenting your brand belongs on our shoulders as a
                pioneer E-commerce platform, and we gladly accept it. Because
                were here to make doing business easy and straightforward.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-center text-3xl font-bold text-primary font-mono my-10">
            More than 10,000 plus customers are waiting for you!
          </h1>
          <div className="flex justify-center">
            {/* eslint-disable-next-line */}
            <img
              src="/customers.jpg"
              alt="shop banner"
              className="object-contain opacity-80 w-3/4"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Vendor;
