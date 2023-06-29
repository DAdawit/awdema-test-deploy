import React from "react";
import { RECOMENDED_FORME } from "@/graphql";
import { useQuery } from "@apollo/client";
import context from "../../../context";
const RecomendedForMe = () => {
  const { data, loading, error } = useQuery(RECOMENDED_FORME, {
    context: context,
    variables: { pageNo: 1 },
  });

  return <div></div>;
};

export default RecomendedForMe;
