import React from "react";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Navbar from "./components/user/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Signup />
    </>
  );
}

export default App;
