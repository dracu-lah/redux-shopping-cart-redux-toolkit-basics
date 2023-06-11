import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import uiSlice, { uiActions } from "./store/ui-slice";
let isFirstRender = true;
function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    const sendRequest = async () => {
      dispatch(
        uiActions.showNotificaton({
          open: true,
          type: "warning",
          message: "Sending request...",
        })
      );
      const res = await fetch(
        "https://redux-http-c474b-default-rtdb.firebaseio.com/cartitems.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );
      const data = await res.json();
      dispatch(
        uiActions.showNotificaton({
          open: true,
          type: "success",
          message: "Request Sucess",
        })
      );
    };
    sendRequest().catch((err) => {
      dispatch(
        uiActions.showNotificaton({
          open: true,
          type: "error",
          message: "Request Failed",
        })
      );
    });
  }, [cart]);

  return (
    <div className="App">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!isLoggedIn ? <Auth /> : <Layout />}
    </div>
  );
}

export default App;
