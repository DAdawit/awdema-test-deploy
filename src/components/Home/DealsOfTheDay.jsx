import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Component } from "react";
import ResponsiveMainProductCard from "../ProductCards/ResponsiveMainProductCard";

export default class DealsOfTheDay extends Component {
  render() {
    const settings = {
      // className: "center",
      centerMode: false,
      centerPadding: "60px",
      slidesToShow: 4,
      speed: 500,
      initialSlide: 0,
      lazyLoad: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <>
        <section className="container mx-auto px-5 mt-4">
          <div className="flex flex-col justify-center items-center mt-3 mb-10">
            <h1 className="text-2xl my-6 pl-8">
              Deals Of The<span className="text-green-500"> Day</span>
            </h1>
            <p className="w-3/4 text-center">
              You cannot inspect quality into the product; it is already there.
              I am not a product of my circumstances. I am a product of my
              decisions.
            </p>
            <button className="px-3 py-2 bg-green-600 text-white rounded-lg mt-6">
              View More
            </button>
          </div>
          <Slider {...settings}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item}>
                <ResponsiveMainProductCard id={item} />
              </div>
            ))}
          </Slider>
        </section>
      </>
    );
  }
}
