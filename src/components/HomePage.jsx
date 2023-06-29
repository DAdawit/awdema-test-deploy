import NewArrivals from "./Home/NewArrivals";
// import Hero from "./Home/Hero";
import Search from "./Home/search";
import CategorySlider from "@/components/Home/CategorySlider";
import Electronics from "./Home/Electronics";
import SpecialOffers from "./Home/SpecialOffers";
import Grocery from "./Home/Grocery";
import FeaturedAndTopRatedProducts from "./Home/FeaturedAndTopRatedProducts";
import BecomeDeliverer from "./Home/BecomeDeliverer";
import { useState } from "react";
import Hero from "./Hero";
import Services from "./Home/services";
import { Tab, TabList, TabPanel } from "react-tabs";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import DealsOfTheDay from "./Home/DealsOfTheDay";
const HomePage = ({ categories, grosseries, electronics, newArrivalse }) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {/* <Search categories={categories} show={show} hideSearch={hideSearch} /> */}
      {/* {!showSearch ? ( */}
      <>
        {/* <Hero /> */}
        <Hero />

        <BecomeDeliverer />
        <div className="-mt-2">
          <CategorySlider categories={categories} />
        </div>
        <div className="mt-5">{/* <DealsOfTheDay /> */}</div>
        <div className="my-16">
          <NewArrivals newArrivalse={newArrivalse} />
        </div>
        <div className="my-16">
          <Electronics electronics={electronics} />
        </div>

        <div className="mt-16">
          <FeaturedAndTopRatedProducts />
        </div>
        <div className="mt-16">
          <Grocery grosseries={grosseries} />
        </div>
        <div className="mt-16">
          <SpecialOffers />
        </div>
        {/* <div className="mt-16">
          <Services />
        </div> */}
      </>
    </>
  );
};

export default HomePage;
