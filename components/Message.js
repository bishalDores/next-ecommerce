import { Snackbar, Slide } from "@material-ui/core";
import React from "react";
import Alert from "@material-ui/lab/Alert";
import dynamic from "next/dynamic";

const Message = ({ open, handleClose, message, severity = "success" }) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={2000}
        open={open}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity={severity && severity}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default dynamic(() => Promise.resolve(Message), { ssr: false });
