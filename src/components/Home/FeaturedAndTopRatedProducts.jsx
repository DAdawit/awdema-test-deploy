import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import "react-tabs/style/react-tabs.css";
import MainProductCard from "../ProductCards/MainProductCard";
import { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SecondProductCard from "../ProductCards/SecondProductCard";
import { featuredAndTopRatedSliderSetting } from "@/data/slidderSetting";

export default class FeaturedAndTopRatedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "1",
    };
  }

  render() {
    const handleChange = (event, newValue) => {
      this.setState({ value: newValue });
    };

    return (
      <>
        <div className="col-span-3 sticky top-0">
          <div className="tabs mt-10">
            <Tabs>
              <TabList>
                <Tab>
                  <span className="text-primary mb-3">Fuatured Products</span>
                </Tab>
                <Tab>
                  <span className="text-primary">Top Rated</span>
                </Tab>
              </TabList>

              <TabPanel>
                <h1 className="text-3xl my-6 pl-8">
                  Featured
                  <span className="text-primary"> Products</span>
                </h1>
                <Slider {...featuredAndTopRatedSliderSetting}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item}>
                      <SecondProductCard id={item} />
                    </div>
                  ))}
                </Slider>
              </TabPanel>
              <TabPanel>
                <h1 className="text-3xl my-6 pl-8">
                  Top <span className="text-primary">Rated Products</span>
                </h1>
                <Slider {...featuredAndTopRatedSliderSetting}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className="px-5">
                      <SecondProductCard id={item} />
                    </div>
                  ))}
                </Slider>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </>
    );
  }
}
