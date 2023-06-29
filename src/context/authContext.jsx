import { ThreeSixty } from "@mui/icons-material";
import { Component } from "react";
import { createContext } from "react";
export const AuthContext = createContext();
class AuthContextProvider extends Component {
  state = {
    auth: false,
    user: {},
    seller: {},
    deliverer: {},
    loading: true,
  };
  // setUserInfo in context
  setUserData = (user) => {
    this.setState({ user: user, auth: true, loading: false });
  };

  // unauthenticatu user
  setUserNull = () => {
    this.setState({ user: {}, auth: false, loading: false });
  };
  setSellerInfo = (data) => {
    this.setState({ seller: data });
  };
  removeSellerInfo = () => {
    this.setState({ seller: {} });
  };
  setDelivererInfo = (data) => {
    this.setState({ deliverer: data });
  };
  removeDelivererInfo = () => {
    this.setState({ deliverer: {} });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          setUserData: this.setUserData,
          setUserNull: this.setUserNull,
          setSellerInfo: this.setSellerInfo,
          removeSellerInfo: this.removeSellerInfo,
          setDelivererInfo: this.setDelivererInfo,
          removeDelivererInfo: this.removeDelivererInfo,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
