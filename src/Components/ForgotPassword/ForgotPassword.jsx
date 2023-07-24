import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { sendToken } from "../../Actions/user";
import "./ForgotPassword.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const { error, message, loading } = useSelector(
    (state) => state.likerReducer
  );
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendToken(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message,dispatch]);
  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>

        <TextField
          label="Email"
          className="input_password"
          variant="outlined"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Link to="/">
          <Typography>Click To Login </Typography>
        </Link>

        <Button
          disabled={loading}
          type="submit"
          sx={{ color: "red", border: "1px solid red" }}
        >
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
