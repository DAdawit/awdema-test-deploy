"use client";
import Link from "next/link";
import { NEW_ARRIVALES } from "@/graphql";
import { PRODUCT_DETAIL } from "@/graphql";
import { useRouter } from "next/router";
import Loading from "@/components/loading";
import Moment from "moment";
import { RELATED_ITEMS } from "@/graphql";
import RelatedItems from "@/components/products/relatedItems";
import { IconClock } from "@/Icons/IconClock";
import { IconAddToCart } from "@/Icons/IconAddToCart";
import SellerInfo from "@/components/products/sellerInfo";
import { useState } from "react";
import { ADDTO_CART } from "@/graphql";
import client from "../../../../apollo-client";
import Spinner from "@/Icons/Spinner";
import { showToast } from "@/components/showToast ";
import IconWishlist from "@/Icons/IconWishList";
import { ADDTO_WISHLIST } from "@/graphql";
import ReportProduct from "@/components/products/reportProduct";
import ProductImages from "@/components/products/ProductImages";
import Head from "next/head";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import context from "../../../../context";
import CustomLoading from "@/components/customLoading";
const ProductDetail = ({ relatedItems, images }) => {
  const router = useRouter();
  const { productId } = router.query;
  const { data, loading, error, refetch } = useQuery(PRODUCT_DETAIL, {
    context: context,
    variables: { productId: productId },
  });

  const [productModel, setProductModel] = useState("");
  const [colorsId, setColorsId] = useState("");
  const [modelId, setModelId] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);
  const [addToWishListLoading, setAddToWishListLoading] = useState(false);
  const [colors, setcolors] = useState([]);

  const handleModelChange = (event) => {
    const modelId = event.target.value;
    setModelId(modelId);
    const model = product?.productmodelSet.find((p) => p.id === modelId);
    setProductModel(model);
  };
  const handleColorChange = (event) => {
    setColorsId(event.target.value);
  };

  useEffect(() => {
    if (productModel) {
      setcolors(productModel.productcolorSet);
    }
  }, [productModel]);

  if (router.isFallback) {
    return <Loading />;
  }
  const addTocart = (id) => {
    setLoadingCart(true);
    const cartItem = {
      productId: id,
      productColorId: colorsId,
      productModelId: modelId,
    };
    client
      .mutate({
        mutation: ADDTO_CART,
        variables: cartItem,
      })
      .then((res) => {
        setLoadingCart(false);
        // console.log(res);
        showToast("success", "Product added to cart successfully!");
      })
      .catch((err) => {
        showToast("error", err.message);
        setLoadingCart(false);
      });
  };

  const addToWishList = (id) => {
    setAddToWishListLoading(true);
    // console.log("add to cart", id);
    const wishListItem = {
      productId: id,
      productColorId: colorsId,
      productModelId: modelId,
    };
    client
      .mutate({
        mutation: ADDTO_WISHLIST,
        variables: wishListItem,
      })
      .then((res) => {
        setAddToWishListLoading(false);
        // console.log(res);
        showToast("success", "Product added to wishList successfully!");
      })
      .catch((err) => {
        showToast("error", err.message);
        setAddToWishListLoading(false);
      });
  };
  if (loading) {
    return <CustomLoading message={"Product Detail"} />;
  }
  return (
    <>
      {/* <pre>{JSON.stringify(id, null, 2)}</pre> */}
      <Head>
        <title>{data?.productById?.name}</title>
      </Head>
      <div className="grid grid-cols-4 gap-10 px-3 mt-10 ">
        <section className="col-span-4 sm:col-span-4 md:col-span-2 relative z-10 max-h-96">
          {/* eslint-disable-next-line */}
          {/* <ProductImages Productimages={images} /> */}
          <ProductImages Productimages={data?.productById} />
        </section>
        <section className="col-span-4 md:col-span-2">
          <div className="flex items-center">
            <Link
              href="/"
              className=" underline cursor-pointer font-medium text-textPrimary"
            >
              Home |{" "}
            </Link>
            <h1 className="text-center text-2xl sm:text-4xl text-gray-800 capitalize">
              {/* product Name */}
              {data?.productById?.name}
            </h1>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 capitalize">
            {data?.productById?.subcategory?.name}

            {/* {product.subcategory?.name} */}
          </h3>
          <section className="mr-8">
            <p className="text-gray-700">
              {data?.productById?.description}

              {/* {product?.description} */}
            </p>
          </section>
          <section className="flex gap-x-2 mt-2">
            <div className="flex items-center">
              <h2 className="my- font-medium underline pr-1">Price </h2>:
              <span className="text-textPrimary pl-1 text-lg font-medium">
                {data?.productById?.price} Birr
                {/* {product.price} Birr */}
              </span>
            </div>
            <div className="flex items-center  ">
              <h2 className="font-medium underline pr-1">Avaliabilty </h2>:
              <span className="text-textPrimary pl-1 text-lg font-medium">
                in stock {data?.productById?.totalQuantity}
              </span>
            </div>
          </section>
          <div>
            <h1 className="flex items-center">
              <IconClock /> : {Moment(data?.productById?.date).format("llll")}
              {" ("} {Moment(data?.productById?.date).format("DD/MM/YYYY")}
              {" )"}
            </h1>
          </div>
          <form className="flex gap-10">
            <div className="grid mt-1">
              <label htmlFor="productModelId"> Models </label>
              <select id="productModelId" onChange={handleModelChange}>
                <option value="" selected>
                  Select an option
                </option>
                {data?.productById?.productmodelSet.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            {productModel && (
              <>
                <div className="grid mt-1">
                  <label htmlFor="productModelId"> Colors </label>
                  <select id="productModelId" onChange={handleColorChange}>
                    <option value="">--Select an option--</option>
                    {colors?.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </form>

          <div className="flex justify-center max-w-min">
            <button
              onClick={() => addTocart(data?.productById?.id)}
              className=" whitespace-nowrap	 flex items-center justify-center bg-btnPrimary text-white text-base py-1 px-3  mx-2 mb-1 hover:scale-105 transition mt-2 w-full"
            >
              Add To Cart
              <span className=" text-base">
                {loading ? <Spinner /> : <IconAddToCart />}
              </span>
            </button>
            <button
              onClick={() => addToWishList(data?.productById?.id)}
              className=" whitespace-nowrap	 flex items-center justify-center bg-white border-2 border-primary text-primary text-base py-1 px-3 mx-2 mb-1 hover:scale-105 transition mt-2 w-full"
            >
              Add to whislist
              <span className=" text-base">
                {addToWishListLoading ? <Spinner /> : <IconWishlist />}
              </span>
            </button>
          </div>
          {/* </div> */}
        </section>
        <div className="pl-10">
          <ReportProduct productId={data?.productById?.id} />
        </div>
      </div>
      <SellerInfo
        product={data?.productById}
        id={data?.productById?.id}
        reviews={data?.productById?.productreviewSet[0]}
      />
      <RelatedItems productId={data?.productById?.id} />
    </>
  );
};
export default ProductDetail;
// export const getStaticPaths = async () => {
//   const { data } = await client.query({
//     query: NEW_ARRIVALES,
//   });

//   const paths = data.PaginatedProduct?.objects?.map((product) => {
//     return {
//       params: { id: product.id },
//     };
//   });
//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps = async (context) => {
//   const id = context.params.id;

//   const relatedItems = await client.query({
//     query: RELATED_ITEMS,
//     variables: { productId: id },
//   });

//   return {
//     props: {
//       product: data.productById,
//       images: images,
//       relatedItems: relatedItems.data?.RelatedProducts?.relatedProducts,
//     },
//     revalidate: 5,
//   };
// };
