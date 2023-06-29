import { Component } from "react";
import SpecialOfferCard from "../ProductCards/SpecialOfferCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SpecialOfferSliderSettings } from "@/data/slidderSetting";

export default class SpecialOffers extends Component {
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
        <div>
          <section className="bg-gray-100 mt-4">
            <Slider {...settings}>
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div key={index}>
                  <SpecialOfferCard />
                </div>
              ))}
            </Slider>
          </section>
        </div>
      </>
    );
  }
}
