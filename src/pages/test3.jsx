"use client";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
export default class Specials extends Component {
  render() {
    const settings = {
      //   dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 7000,
    };
    return (
      <>
        <div className="w-full overflow-x-hidden">
          <Slider {...settings}>
            <div>
              <div className="relative">
                <div className="h-[75vh] w-screen ">
                  <Image
                    src="/shopping2.jpg"
                    alt="spector"
                    fill
                    className="w-screen h-[75vh] object-cover brightness-75 object-right"
                    blurDataURL="/bannerAbout.jpg"
                  />
                </div>
                <div className="absolute top-1/3 w-full">
                  <div className="flex flex-col justify-center pl-5">
                    <h1 className="text-4xl text-center sm:text-6xl t text-white font-serif mt-2 tracking-wide max-w-2xl	">
                      Where shopping meets convenience
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="h-[75vh] w-screen pl-10">
                  <Image
                    src="/shopping3.jpg"
                    alt="spector"
                    fill
                    className="w-screen h-[75vh] object-cover brightness-75"
                    blurDataURL="/bannerAbout.jpg"
                  />
                </div>
                <div className="absolute top-1/3 w-full">
                  <div className="flex flex-col justify-center ">
                    <h1 className="text-4xl pl-10 sm:text-6xl text-center text-white font-serif mt-2 tracking-wide max-w-xl">
                      Shop with us and experience the difference!
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </>
    );
  }
}
