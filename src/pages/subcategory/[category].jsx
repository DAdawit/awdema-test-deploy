import client from "../../../apollo-client";
import { SUB_CATEGORIES } from "@/graphql";
import { PRODUCT_BYSUBCATEGORY } from "@/graphql";
import { PRODUCT_BYSUBCATEGORIES } from "@/graphql";
export default function categoryProducts(products) {
  return (
    <>
      <div>catProducts</div>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </>
  );
}
export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: SUB_CATEGORIES,
  });
  const paths = data.listAllSubCategory.map((category) => {
    return {
      params: { category: category.name },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const category = context.params.category;
  let filterProperties = {
    filterSubcategoryName: category,
    filterBy: "no",
    startDate: "no",
    endDate: "no",
    pageNo: 1,
    perPage: 20,
  };

  const { data } = await client.query({
    query: PRODUCT_BYSUBCATEGORIES,
    variables: filterProperties,
  });

  return {
    props: { products: data.PaginatedProduct },
  };
};
