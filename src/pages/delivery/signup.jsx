import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useState, useRef, useEffect } from "react";
import Spinner from "@/Icons/Spinner";
import IconPersonAdd from "@/Icons/IconPersonAdd";
import Head from "next/head";
import Select from "react-select";
import { CREATE_DELIVERER } from "@/graphql";
import { showToast } from "@/components/showToast ";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
const Signup = () => {
  const { auth } = useContext(AuthContext);
  const { push } = useRouter();

  const checkAuth = () => {
    if (!auth) {
      showToast("info", "Before Becoming a deliverer please first signup");
      push("/auth/signup");
    }
  };

  useEffect(() => {
    checkAuth();
  });

  const options = [
    { value: "Car", label: "Car" },
    { value: "Bicycle", label: "Bicycle" },
    { value: "Motorbike", label: "Motorbike" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      deliveryMethode: [],
      description: "",
      maximumVolume: "",
      maximumMass: "",
    },
  });
  const [addUser, { data, loading, error }] = useMutation(CREATE_DELIVERER);

  const onSubmit = async (values) => {
    selectedOption.map((item) => {
      values.deliveryMethode.push(item.value);
    });
    try {
      await addUser({ variables: values }).then((res) => {
        push("/delivery/dashboard/");
      });
    } catch (err) {
      showToast("error", err.message);
    }
  };
  return (
    <>
      <Head>
        <title>Deliverer Signup</title>
      </Head>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="grid md:flex justify-evenly h-auto md:h-screen">
        <div className="bg-orange hidden md:flex md:w-1/2 justify-center">
          {/* eslint-disable-next-line */}
          <img
            src="/delivery.jpg"
            alt="shop banner"
            className="object-contain h-96 -mt-18 sm:mt-10 sm:pt-20"
          />
        </div>

        <div className="min-w-[500] grid items-center justify-center md:shadow-2xl shadow-gray-400 px-5 sm:px-10 md:px-10 mb-16">
          <form className="grid mb-10" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl mt-10 font-medium text-primary  text-center mb-2">
              Create an account
            </h1>

            <div className="grid sm:flex gap-2">
              <div className="grid">
                <label htmlFor="email">Full Name *</label>
                <input
                  type="text"
                  placeholder="name"
                  {...register("name", {
                    required: "Full Name is required",
                  })}
                />
                <small className="text-red-500">{errors.name?.message}</small>
              </div>
              <div className="grid mt-1">
                <label htmlFor="email">Address *</label>
                <input
                  type="text"
                  id="address"
                  placeholder="address"
                  {...register("address", {
                    required: "address is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.address?.message}
                </small>
              </div>
            </div>
            <div className="grid sm:flex gap-3">
              <div className="grid">
                <label htmlFor="password">Maximum Mass *</label>
                <input
                  type="number"
                  id="maximumMass"
                  placeholder=""
                  {...register("maximumMass", {
                    required: "Maximum Mass is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.maximumMass?.message}
                </small>
              </div>
              <div className="grid">
                <label htmlFor="maximumVolume">Maximum Volume *</label>
                <input
                  type="number"
                  id="maximumVolume"
                  placeholder=""
                  {...register("maximumVolume", {
                    required: "Maximum volume is required",
                  })}
                />
                <small className="text-red-500">
                  {errors.maximumVolume?.message}
                </small>
              </div>
            </div>

            {/* <div className="grid sm:flex gap-3"> */}
            <div className="grid">
              <label htmlFor="deliveryMethode">Delivery Methode *</label>
              <Select
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderColor: "#113F57",
                  }),
                }}
                isMulti={true}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                required
              />
            </div>

            <div className="grid">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                placeholder=""
                {...register("description", {
                  required: "description is required",
                })}
              />
              <small className="text-red-500">
                {errors.description?.message}
              </small>
            </div>
            {/* </div> */}

            <div className="sm:ml-10 sm:mt-3 flex justify-center">
              <button className="bg-primary text-white px-6 py-3  flex justify-center items-center justify-self-center mt-2 hover:-translate-y-px">
                <span className="ml-1">Register </span>
                {loading ? (
                  <Spinner />
                ) : (
                  <span className="pl-1">
                    <IconPersonAdd />
                  </span>
                )}
              </button>
            </div>

            <div className="text-sm mb-10 ">
              <p>
                By creating an account, you agree to our <br />
                <Link
                  href="/auth/signup"
                  className="text-blue-500 cursor-pointer font-normal underline"
                >
                  terms, conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/auth/signup"
                  className="text-blue-500 cursor-pointer font-normal underline"
                >
                  privacy policy.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
