import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import { useState } from "react";
import Footer from "@/components/Navbar/Footer";
import { useEffect } from "react";
import checkToken from "./verifyToken";
import Loading from "@/components/loading";
import { FETCH_USER_DATA } from "@/graphql";
import AuthContextProvider from "@/context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "@/components/Navbar/NavBar";
import Breadcrumbs from "@/components/breadcrumb";
import BottomNav from "@/components/Navbar/bottomNav";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    left: false,
  });
  async function fetchUserData() {
    const res = await client.query({
      query: FETCH_USER_DATA,
    });
    setAuth(true);
  }

  const setAuthTrue = () => {
    setAuth(true);
  };

  const verify_Token = async (token) => {
    if (!token) {
      token = "";
    }
    try {
      await checkToken(token).then(async () => {
        await fetchUserData().then((res) => {
          setLoading(false);
        });
      });
    } catch (error) {
      // if token is invalid
      setLoading(false);
      // push("/");
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    verify_Token(token);
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ left: open });
  };

  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <ToastContainer />
        <div className="overflow-x-hidden">
          <div className="w-screen ">
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="mb-20">
                  <NavBar />
                </div>
                {/* <Breadcrumbs /> */}
                <Component {...pageProps} />
              </>
            )}
            <BottomNav />
            <Footer />
          </div>
        </div>
      </AuthContextProvider>
    </ApolloProvider>
  );
}
