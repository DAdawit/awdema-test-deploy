import GeneralReport from "@/components/vendor/reports/generalReport";
import Head from "next/head";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      {/* <h1>dashboard</h1> */}
      <div className="my-5">
        <GeneralReport />
      </div>
    </>
  );
};

export default Dashboard;
