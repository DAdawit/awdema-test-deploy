import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import Image from "next/image";
import { useState, useEffect } from "react";

const ProductImages = ({ Productimages }) => {
  const [currentImage, setCurrentImage] = useState("");
  const [images, setImages] = useState([]);

  const setProductImages = () => {
    setCurrentImage(Productimages[0]);
  };

  const colletImages = () => {
    const images = [];
    images.push(Productimages?.image);
    setCurrentImage(Productimages?.image);
    // Iterate over each product model in the product
    Productimages?.productmodelSet.forEach((model) => {
      // console.log(model);
      // Iterate over each color option in the product model
      model?.productcolorSet.forEach((color) => {
        // Iterate over each image in the color option
        color?.imagesSet.forEach((image) => {
          // Add the image URL to the images array
          images.push(image.image);
        });
      });
    });
    setImages(images);
  };
  // console.log(Productimages);
  useEffect(() => {
    colletImages();
  }, [Productimages]);
  // console.log(imagess);

  return (
    <>
      <div className="flex gap-3">
        <div>
          {images.map((image, index) => (
            <Image
              key={index}
              src={`https://awdma.afroel.com/media/${image}`}
              alt="product image"
              height={500}
              width={500}
              className="h-11 w-11 object-contain mt-2 rounded-sm shadow-lg"
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
        <Zoom>
          <Image
            className="w-full h-96 object-contain"
            src={`https://awdma.afroel.com/media/${currentImage}`}
            alt="product image"
            height={500}
            width={500}
          />
        </Zoom>
      </div>
    </>
  );
};

export default ProductImages;
