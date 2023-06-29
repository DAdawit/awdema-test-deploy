import Image from "next/image";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import RatingStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { showToast } from "../showToast ";
import { REVIEW_PRODUCT } from "@/graphql";
import client from "../../../apollo-client";
import Spinner from "@/Icons/Spinner";
const SellerInfo = ({ product, id, reviews }) => {
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState("");
  const [loadig, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const onSubmit = async (data) => {
    setLoading(true);
    setRatingError("");
    if (rating === 0) {
      setLoading(false);

      return setRatingError("give a stare !");
    }
    data.review = rating;
    data.productId = id;
    client
      .mutate({
        mutation: REVIEW_PRODUCT,
        variables: data,
      })
      .then((res) => {
        reset();
        // console.log(res.data);
        setLoading(false);
        setRating(0);
        showToast("success", "Review sent!");
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        showToast("error", err.message);
      });

    console.log(data);
  };
  // console.log(product);

  return (
    <>
      <div className="px-5 my-10">
        <h1 className="font-medium  text-2xl py-10 px-5  capitalize ">
          {product?.shop.name}{" "}
          <Link href="#" className="font-normal underline text-textPrimary">
            visite Store{" "}
          </Link>
        </h1>
        <Tabs>
          <TabList>
            <Tab>
              <span className="font-medium">Description</span>
            </Tab>
            <Tab>
              <span className="font-medium">Seller Info</span>
            </Tab>
            <Tab>
              <span className="font-medium">Shipping & Returns</span>
            </Tab>
            <Tab>
              <span className="font-medium">Safety Tips</span>
            </Tab>
            <Tab>
              <span className="font-medium">Reviews</span>
            </Tab>
          </TabList>

          <TabPanel>
            <div className="mt-5 pl-5">
              <h1 className="font-medium  text-gray-800">
                Product Information
              </h1>
              <p className="max-w-4xl  text-gray-700">{product?.description}</p>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-5 pl-5">
              <h1>
                <span className="font-medium  text-gray-800">Seller: </span>
                <span className=" text-gray-700">{product?.shop.name}</span>
              </h1>
              <h1>
                <span className="font-medium  text-gray-800">Address: </span>
                <span className=" text-gray-700">{product?.shop?.address}</span>
              </h1>
              <section>
                <h1 className="font-medium  text-gray-800">Shope Info</h1>
                <p className=" max-w-4xl  text-gray-700">
                  {product?.shop?.description}
                </p>
                <Image
                  className="w-full h-96 object-contain"
                  src={`https://awdma.afroel.com/media/${product?.shop.shopPicture}`}
                  alt="shope photo"
                  height={500}
                  width={500}
                />
              </section>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-5 pl-5">
              <h1 className="font-medium  text-gray-800">Delivery & returns</h1>
              <p className=" text-gray-700">
                For full details of the delivery options we offer, please view
                our{" "}
                <Link href="#" className="underline font-medium">
                  Delivery information.
                </Link>
              </p>
              <p className="max-w-4xl text-gray-700">
                We hope you’ll love every purchase, but if you ever need to
                return an item you can do so within a month of receipt. For full
                details of how to make a return, please view our{" "}
                <Link href="#" className="underline font-medium">
                  Returns information.
                </Link>
              </p>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-5 pl-5">
              <ul className="list-disc px-5  text-gray-800">
                <li>
                  {" "}
                  At all costs, avoid paying before checking product
                  descriptions of the item.
                </li>
                <li>
                  {" "}
                  Avoid sending money to a personal account. Ashewa is not
                  responsible for the payment outside Ashewa platforms.
                </li>
                <li>
                  {" "}
                  Thoroughly check the item to make sure it matches the assumed
                  condition.
                </li>
                <li>
                  {" "}
                  If the seller does not have a shop, meet with him in a public
                  place (Mall, Gas station, workplace )
                </li>
                <li>
                  Do not give personal details (bank details, phone numbers
                  without Ashewa Support team)
                </li>
                <li> Beware of offers that are too good to be true.</li>
              </ul>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-5 pl-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                {" "}
                <div className="flex flex-col ">
                  <label
                    htmlFor="comment"
                    className=" text-xl font-medium text-gray-800 pl-2"
                  >
                    Review
                  </label>
                  <textarea
                    placeholder="comment"
                    name="comment"
                    {...register("comment")}
                  ></textarea>
                </div>
                <RatingStars
                  count={5}
                  onChange={handleRatingChange}
                  size={24}
                  activeColor="#ffd700"
                />
                <small className="text-red-500">{ratingError}</small>
                <br />
                {/* {rating} */}
                <button className=" flex justify-center items-centerborder-2  bg-primary text-white hover:bg-white hover:text-primary border-2 hover:border-primary font-medium transition-all px-5 py-2 mt-2">
                  <span>submit</span>
                  <span className="text-primary">
                    {" "}
                    {loadig ? <Spinner /> : null}
                  </span>
                </button>
              </form>
              {/* <pre>{JSON.stringify(reviews, null, 2)}</pre> */}
              <div>
                {reviews?.totalReviewer > 0 ? (
                  <div className="mt-10">
                    <h1 className="font-medium">
                      Total Review : {reviews?.totalReviewer}
                    </h1>
                    <div className="flex items-center gap-2 font-medium">
                      <h1 className="font-medium">Avarage Review : </h1>
                      <RatingStars
                        size={24}
                        edit={false}
                        activeColor="#ffd700"
                        value={reviews?.averageReview}
                      />
                    </div>
                    <div>
                      {reviews?.review.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 mt-5 shadow-sm md:w-1/2"
                        >
                          <div className="w-10">
                            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center capitalize">
                              {item.name}
                            </div>
                          </div>
                          <div className="grid">
                            <h1 className="capitalize">{item.name}</h1>
                            <h1 className="capitalize text-gray-600 text-sm">
                              {item.comment}
                            </h1>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1>No reviews yet !</h1>
                  </div>
                )}
              </div>
              {/* <pre>{JSON.stringify(reviews, null, 2)}</pre> */}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default SellerInfo;
