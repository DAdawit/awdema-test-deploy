import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ResponsiveMainProductCard from "../ProductCards/ResponsiveMainProductCard";
import { electronicsSliderSettings } from "@/data/slidderSetting";

export default class Electronics extends Component {
  render() {
    return (
      <section className="container mx-auto px-5 mt-4">
        {/* <pre>{JSON.stringify(this.props.newArrivalse, null, 2)}</pre> */}
        <h1 className="text-3xl  text-center font-medium font-sans tracking-wider text-primary py-8">
          Electronics
        </h1>
        {/* <h1 className="text-3xl my-6 pl-8">Electronics</h1> */}

        <Slider {...electronicsSliderSettings}>
          {this.props.electronics?.objects.map((product) => (
            <div key={product.id} className="px-2">
              <ResponsiveMainProductCard id={product.id} product={product} />
            </div>
          ))}
        </Slider>
      </section>
    );
  }
}
