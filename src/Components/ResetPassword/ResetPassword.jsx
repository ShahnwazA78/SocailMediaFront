import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {verifyTokenAndReset } from "../../Actions/user";
import "./resetPassword.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const { error, message, loading } = useSelector(
    (state) => state.likerReducer
  );
  const dispatch = useDispatch();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(verifyTokenAndReset(params.token, newPassword));
    setNewPassword("");
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
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
  }, [error, message, dispatch]);
  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={handleSubmit}>
        <Typography variant="h5" style={{ padding: "2vmax" }}>
          Enter New Password
        </Typography>

        <TextField
          label="New Password"
          className="input_password"
          type={values.showPassword ? "text" : "password"}
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Link to="/forgot/password">
          <Typography>Generate New Token ? </Typography>
        </Link>
        <Typography
          sx={{
            alignSelf: "flex-end",
            marginRight: "6vmax",
            color: " rgba(0, 0, 0, 0.542);",
          }}
        >
          Or
        </Typography>
        <Link to="/">
          <Typography>Click To Login </Typography>
        </Link>
        <Button disabled={loading} type="submit" variant="outlined">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
