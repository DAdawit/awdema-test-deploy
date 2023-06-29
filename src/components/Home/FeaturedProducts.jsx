import { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SecondProductCard from "../ProductCards/SecondProductCard";
export default class FeaturedProducts extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: false,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 920,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
          },
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 630,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <>
        <div>
          <section className="container mx-auto px-5 mt-4">
            <h1 className="text-3xl my-6 pl-8">
              Featured <span className="text-green-500"> Products</span>
            </h1>
            <Slider {...settings}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item}>
                  <SecondProductCard id={item} />
                </div>
              ))}
            </Slider>
          </section>
        </div>
      </>
    );
  }
}
