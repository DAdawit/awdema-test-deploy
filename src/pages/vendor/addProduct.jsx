import { Stepper, Step } from "react-form-stepper";
import client from "../../../apollo-client";
import { SUB_CATEGORIES } from "@/graphql";
import AddProduct from "@/components/vendor/addProduct";
import AddProductModel from "@/components/vendor/addProductModel";
import AddProductColor from "@/components/vendor/addProductColor";
import AddProductImage from "@/components/vendor/addProductImage";
import Link from "next/link";
import { showToast } from "@/components/showToast ";
import { useState } from "react";
import Head from "next/head";
const FormStepper = ({ subCat }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [product, setProduct] = useState({});
  // const [productModels, SetProductModel] = useState([]);
  const [productModelColors, setProductModelColors] = useState([]);
  const [productAdded, setProductAdded] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const productDetailInserted = () => {
    setProductAdded(true);
    return true;
  };
  const productImageUploaded = () => {
    setImageUploaded(true);
  };
  // const addProductModel = (newModel) => {
  //   SetProductModel(newModel);
  // };

  const addProductModelColors = (newColor) => {
    setProductModelColors(newColor);
  };
  const setProductDetail = (product) => {
    setProduct(product);
  };
  const handleNext = () => {
    if (activeStep === 3 && !imageUploaded) {
      showToast("info", "please upload product images");
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Head>
        <title>Add Product</title>
      </Head>
      <div className="container mx-auto mb-10">
        <Stepper activeStep={activeStep}>
          <Step label="Add Product Detail" />
          <Step label="Add product Models" />
          <Step label="Add product colors" />
          <Step label="Add product Images" />
          <Step label="Finish" />
        </Stepper>

        {/* <pre>{JSON.stringify(productAdded, null, 2)}</pre>
      <pre>{JSON.stringify(product, null, 2)}</pre>
      <pre>{JSON.stringify(imageUploaded, null, 2)}</pre> */}

        <div className="">
          {activeStep === 0 && (
            <div>
              <AddProduct
                subCat={subCat}
                handleNext={handleNext}
                addProductModelColors={addProductModelColors}
                productDetailInserted={productDetailInserted}
                setProductDetail={setProductDetail}
              />
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-white border-2 border-primary px-2 py-1 "
                >
                  skip
                </button>
              </div>
              <AddProductModel
                product={product}
                handleNext={handleNext}
                addProductModelColors={addProductModelColors}
              />
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-white border-2 border-primary px-2 py-1 "
                >
                  skip
                </button>
              </div>
              <AddProductColor
                handleNext={handleNext}
                // productModels={productModels}
                addProductModelColors={addProductModelColors}
                productModelColors={productModelColors}
              />
            </div>
          )}
          {activeStep === 3 && (
            <div>
              <AddProductImage
                handleNext={handleNext}
                // productModels={productModels}
                productModelColors={productModelColors}
                productImageUploaded={productImageUploaded}
              />
            </div>
          )}
          {activeStep === 4 && (
            <div className="flex flex-col justify-center items-center h-96 pt-20">
              {/* eslint-disable-next-line */}
              <img
                src="/finish1.jpg"
                alt="shop banner"
                className="object-contain h-96"
              />

              <div className="h-screen flex justify-center items-center">
                <Link
                  href="/vendor/products"
                  className="px-5 py-3 bg-white font-medium text-primary border-2 border-primary hover:text-white hover:bg-primary hover:-translate-y-1"
                >
                  Finish{" "}
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 px-16">
          <button
            disabled={activeStep === 0}
            onClick={handleBack}
            className="bg-primary text-white px-4 py-1"
          >
            Back
          </button>
          <button
            disabled={activeStep === 4 || (activeStep == 0 && !productAdded)}
            onClick={handleNext}
            className="bg-primary text-white px-4 py-1"
          >
            {activeStep == 4 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
};

export default FormStepper;
export async function getStaticProps() {
  const { data } = await client.query({
    query: SUB_CATEGORIES,
  });
  return {
    props: {
      subCat: data.listAllSubCategory,
    },
  };
}
