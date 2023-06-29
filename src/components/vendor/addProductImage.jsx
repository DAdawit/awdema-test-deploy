import { useRouter } from "next/router";
import Spinner from "@/Icons/Spinner";
import IconUpload from "@/Icons/IconUpload";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { showToast } from "@/components/showToast ";
import { useEffect } from "react";

const AddProductImage = ({ productModelColors, productImageUploaded }) => {
  // const [addProductModelColors, setProducts] = useState([
  //   {
  //     id: "95f8157a-15ed-4860-b131-29e6e2e32fb5",
  //     name: "Cailin Elliott",
  //     productcolorSet: [
  //       {
  //         id: "e735d328-77f9-4aef-9aa4-de30fe75c745",
  //         name: "",
  //         __typename: "ProductColorType",
  //       },
  //       {
  //         id: "a3262b78-413b-432a-b526-91ed5a42ef55",
  //         name: "Ab minus in dolorem ",
  //         __typename: "ProductColorType",
  //       },
  //     ],
  //     __typename: "ProductModelType",
  //   },
  //   {
  //     id: "a91f4b86-57f7-4ef8-98b0-e66856f45bd0",
  //     name: "Brielle Branch",
  //     productcolorSet: [
  //       {
  //         id: "750506d1-17ed-4611-9099-d690a5e571d1",
  //         name: "Voluptatem irure sin",
  //         __typename: "ProductColorType",
  //       },
  //     ],
  //     __typename: "ProductModelType",
  //   },
  //   {
  //     id: "9a36d2f8-fd81-4101-a6cf-e9e16b97aede",
  //     name: "Kaye Avila",
  //     productcolorSet: [
  //       {
  //         id: "8dc58181-23b9-4cac-8b31-96e0ab4362c2",
  //         name: "Dolorem rerum est qu",
  //         __typename: "ProductColorType",
  //       },
  //     ],
  //     __typename: "ProductModelType",
  //   },
  //   {
  //     id: "dfa5e361-ddee-4790-a5c8-4a30ea82eac0",
  //     name: "Nola Goff",
  //     productcolorSet: [
  //       {
  //         id: "1f5e631f-f00e-48e2-9492-00b3a6186f88",
  //         name: "Esse consectetur qua",
  //         __typename: "ProductColorType",
  //       },
  //     ],
  //     __typename: "ProductModelType",
  //   },
  // ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [colorOptions, setColorOptions] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleProductChange = (event) => {
    console.log("change");
    const productId = event.target.value;
    const product = productModelColors.find((p) => p.id === productId);
    setSelectedProduct(product);
  };

  useEffect(() => {
    if (selectedProduct) {
      setColorOptions(selectedProduct.productcolorSet);
    }
  }, [selectedProduct]);

  const [loading, setLoading] = useState(false);
  // const router = useRouter();
  // const { id } = router.query;

  const onSubmit = async (data) => {
    setLoading(true);

    // console.log(data);
    // // console.log(data.file.length);
    let formData = new FormData();

    setLoading(true);
    const token = localStorage.getItem("token");

    const mutation = {
      query: `mutation ($file:Upload!,$productColorId:String!,$setCover:Boolean!){
        addMultipleProductPicture(file:$file,productColorId:$productColorId,
        setCover:$setCover){product{image}}
    }
      `,
      variables: {
        productColorId: data.productColorId,
        setCover: true,
        file: null,
      },
    };
    if (data.file !== undefined) {
      const map = { 0: ["variables.file"] };
      formData.append("operations", JSON.stringify(mutation));
      formData.append("map", JSON.stringify(map));
      for (let i = 0; i < data.file.length; i++) {
        formData.append(`${i}`, data.file[i]);
      }
      axios
        .post("https://awdma.afroel.com/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `JWT ${token}`,
          },
        })
        .then(() => {
          productImageUploaded();
          showToast("success", "file uploaded successfully!");
          reset();
          setSelectedProduct(null);
        })
        .catch((err) => {
          showToast("error", err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <>
      {/* {id} */}
      <h1 className="text-center text-primary text-2xl">Add Product Images</h1>

      <div className="flex justify-center items-center">
        <form
          className="grid w-full justify-center pt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid my-10">
            <Image
              src="/shopPink.png"
              className="w-full h-fit object-contain"
              alt="product image"
              height={150}
              width={250}
            />
            <div className="grid mt-1">
              <label htmlFor="price">Select a product Model *</label>
              <select
                id="product"
                name="product"
                onChange={handleProductChange}
                required
              >
                <option value="">--Select a product--</option>
                {productModelColors.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedProduct && (
              <>
                <div className="grid mt-1">
                  <label htmlFor="price">Select a product Color *</label>
                  <select
                    id="color"
                    name="color"
                    {...register("productColorId", {
                      required: "Select Product Color required",
                    })}
                  >
                    <option value="">--Select a color--</option>
                    {colorOptions.map((colorOption) => (
                      <option key={colorOption.id} value={colorOption.id}>
                        {colorOption.name}
                      </option>
                    ))}
                  </select>
                  <small className="text-red-500">
                    {errors.productColorId?.message}
                  </small>
                </div>
                {/* 
                <div>
                  <label htmlFor="color">Select a color:</label>
                  <select
                    id="color"
                    name="color"
                    {...register("productColorId", {
                      required: "Select Product Color required",
                    })}
                  >
                    <option value="">--Select a color--</option>
                    {colorOptions.map((colorOption) => (
                      <option key={colorOption.id} value={colorOption.id}>
                        {colorOption.name}
                      </option>
                    ))}
                  </select>
                </div> */}
              </>
            )}
            <div className="grid mt-1">
              <input
                multiple
                type="file"
                accept="image/*"
                name="shopPicture"
                {...register("file", {
                  required: "file is required",
                })}
              />
              <small className="text-red-500">{errors.file?.message}</small>
            </div>
            <button className="bg-primary text-white p5-4 py-2 my-5 flex justify-center items-center">
              <span>Upload</span>
              {loading ? (
                <span className="text-white pl-2">
                  <Spinner />
                </span>
              ) : (
                <span className="text-white pl-2">
                  <IconUpload />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProductImage;
