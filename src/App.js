import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

function App() {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    const sendRequest = async () => {
      const res = await fetch(
        "https://redux-http-c474b-default-rtdb.firebaseio.com/cartitems.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );
      const data = await res.json();
      // console.log(data);
    };
    sendRequest();
  }, [cart]);
  return <div className="App">{!isLoggedIn ? <Auth /> : <Layout />}</div>;
}

export default App;
