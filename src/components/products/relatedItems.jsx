import MainProductCard from "../ProductCards/MainProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { newArrivalSliderSettings } from "@/data/slidderSetting";
import ResponsiveMainProductCard from "../ProductCards/ResponsiveMainProductCard";
import { useQuery } from "@apollo/client";
import context from "../../../context";
import { RELATED_ITEMS } from "@/graphql";
const RelatedItems = ({ productId }) => {
  const { data, loading, error, refetch } = useQuery(RELATED_ITEMS, {
    context: context,
    variables: { productId: productId },
  });
  // console.log(data);
  return (
    <>
      {data?.RelatedProducts?.relatedProducts.length > 0 ? (
        <div className="mt-10 mb-16">
          <h1 className="text-4xl pl-5 mb-5">Related Items</h1>

          <Slider {...newArrivalSliderSettings}>
            {data?.RelatedProducts?.relatedProducts.map((product) => (
              <div key={product.id}>
                <ResponsiveMainProductCard id={product.id} product={product} />
              </div>
            ))}
          </Slider>
        </div>
      ) : null}
    </>
  );
};

export default RelatedItems;
