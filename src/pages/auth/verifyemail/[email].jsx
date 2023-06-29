import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { VERIFY_EMAIL } from "@/graphql";
import Head from "next/head";
const VerifyEmail = () => {
  const [verificationCode, setVerificationCodeEmail] = useState("AAAAAA");
  const router = useRouter();

  const { email } = router.query;
  const { push } = useRouter();

  // request for verification of email
  const [verify_Email, { data, loading, error }] = useMutation(VERIFY_EMAIL);

  const verifyEmail = async () => {
    const data = {
      email,
      verificationCode,
    };
    try {
      await verify_Email({ variables: data });
    } catch (error) {
      // console.log(error);
    }
  };

  // if verifcatio successfull redirect to home page
  if (!loading && data) {
    push("/auth/login");
  }

  return (
    <>
      <Head>
        <title>Email verification</title>
      </Head>
      <div className="h-full flex flex-col items-center px-10">
        <h1 className="text-3xl text-textPrimary m-10">Awdema.com</h1>
        <p className="font-medium text-xl text-primary text-center max-w-2xl">
          You registered an account on awdma.com, before being able to use your
          account you need to verify that this is your email address belongs to
          you.
        </p>
        <p className="font-normal text-textPrimary">
          verification code sent through {email}
        </p>
        <p className="py-3 font-medium text-textPrimary">
          {" "}
          Please Check your email for verification code{". "}
        </p>
        <div className="flex flex-col justify-center">
          <input
            type="text"
            name="verificationCode"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCodeEmail(e.target.value)}
          />
        </div>
        <button
          className="bg-primary text-white font-medium  py-3 px-10 mt-5"
          onClick={verifyEmail}
        >
          Verify
        </button>
        {!loading && error ? (
          <small className="text-red500">{error.message}</small>
        ) : null}{" "}
      </div>
    </>
  );
};

export default VerifyEmail;
