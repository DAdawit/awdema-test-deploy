import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import { categorySliderSettings } from "@/data/slidderSetting";
export default class CenterMode extends Component {
  render() {
    return (
      <div className="px-5 bg-gray-100 py-16">
        <section className="">
          <h1 className="text-3xl  text-center font-medium font-sans tracking-wider text-primary mb-2">
            Shop by Category
          </h1>
          <h3 className="text-xl  text-center font-medium font-mono tracking-wide text-gray-700 mb-5 ">
            Explore Our Wide Range of Products
          </h3>
          <Slider {...categorySliderSettings}>
            {this.props.categories.map((category) => (
              <div
                key={category.id}
                className="px-5 grid items-center justify-center "
              >
                <div className="overflow-hidden">
                  <div className="relative">
                    {/* eslint-disable-next-line */}
                    <img
                      src={`https://awdma.afroel.com/media/${category.image}`}
                      alt="category image"
                      className="object-cover h-40 w-full brightness-75 hover:brightness-90 hover:scale-105 transition-all"
                    />
                    <Link
                      className="absolute bottom-0 w-full"
                      href={`category/${category.name}`}
                    >
                      <h1 className="text-sm capitalize  font-mono tracking-wider text-white opacity-90 font-medium truncate text-center bg-primary text-balck p-2">
                        {category.name}
                      </h1>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      </div>
    );
  }
}
