import Image from "next/image";
import Link from "next/link";
import { Roboto } from "next/font/google";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ResponsiveMainProductCard from "../ProductCards/ResponsiveMainProductCard";
import { newArrivalSliderSettings } from "@/data/slidderSetting";
export default class NewArrivals extends Component {
  render() {
    return (
      <section className="container mx-auto px-5 mt-4">
        {/* <pre>{JSON.stringify(this.props.newArrivalse, null, 2)}</pre> */}
        <h1 className="text-3xl  text-center font-medium font-sans tracking-wider text-primary py-8">
          New Arrivals
        </h1>
        {/* <h1 className="text-3xl my-6 pl-8">
          New<span className="text-green-500"> Arrivals</span>
        </h1> */}
        <Slider {...newArrivalSliderSettings}>
          {this.props.newArrivalse?.objects.map((product) => (
            <div key={product.id} className="px-2">
              <ResponsiveMainProductCard id={product.id} product={product} />
            </div>
          ))}
        </Slider>
      </section>
    );
  }
}
