import { Alert } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";

const Notification = ({ type, message }) => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const handleClose = () => {
    dispatch(uiActions.showNotificaton({ open: false }));
  };
  return (
    <div>
      <Alert severity={type}>{message}</Alert>
    </div>
  );
};

export default Notification;
