let token = ""; // Use let or const instead of var
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

const context = {
  headers: {
    authorization: `JWT ${token}`,
  },
};
export default context;
