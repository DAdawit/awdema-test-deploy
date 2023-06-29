import Head from "next/head";
import styles from "@/styles/Home.module.css";
import client from "../../apollo-client";
import { CATEGORIES, RECOMENDED_FORME } from "@/graphql";
import { GROSSERIES } from "@/graphql";
import { ELECTRONICS } from "@/graphql";
import { NEW_ARRIVALES } from "@/graphql";
import HomePage from "@/components/HomePage";
import RecomendedForMe from "@/components/Home/RecomendedForMe";
import { useState } from "react";
import SearchDialog from "@/components/SearchDialog";
import { Tab, TabList, TabPanel } from "react-tabs";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
export default function Home({
  categories,
  grosseries,
  electronics,
  newArrivalse,
}) {
  const [shop, setShop] = useState(false);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {/* <pre>{JSON.stringify(electronics, null, 2)}</pre> */}
      <Head>
        <title>Home | Awdma.com</title>
        <meta
          name="description"
          content="Awdma.com online shopping | e-commerce"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HomePage
          categories={categories}
          grosseries={grosseries}
          electronics={electronics}
          newArrivalse={newArrivalse}
        />
      </main>
    </>
  );
}
export async function getStaticProps() {
  const params = {
    startDate: "",
    endDate: "",
    filterSubcategoryName: "",
    filterBy: "",
    pageNo: 1,
    perPage: 20,
  };
  const { data } = await client.query({
    query: CATEGORIES,
  });

  const grosseries = await client.query({
    query: GROSSERIES,
  });

  const electronics = await client.query({
    query: ELECTRONICS,
  });
  const newArrivalse = await client.query({
    query: NEW_ARRIVALES,
    variables: params,
  });

  return {
    props: {
      categories: data.listAllCategory,
      grosseries: grosseries.data.PaginatedProductByCategory,
      electronics: electronics.data.PaginatedProductByCategory,
      newArrivalse: newArrivalse.data.PaginatedProduct,
    },
    revalidate: 10,
  };
}

// e12d6bfb-52e8-4f7a-b85b-5317357dfe7b
