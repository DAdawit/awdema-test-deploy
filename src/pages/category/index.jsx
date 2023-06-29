import { useEffect } from "react";
import { useRouter } from "next/router";
const Category = () => {
  const { push } = useRouter();
  useEffect(() => {
    push("/");
  });
  return <>n</>;
};
export default Category;
