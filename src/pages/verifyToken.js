import client from "../../apollo-client";
import { VERIFY_TOKEN } from "@/graphql";

async function checkToken(token) {
  const res = await client.mutate({
    mutation: VERIFY_TOKEN,
    variables: { token },
  });
  return res.data.verifyToken;
}

export default checkToken;
