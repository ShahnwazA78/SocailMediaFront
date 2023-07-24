import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/user";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.likerReducer);
  const dispatch = useDispatch();
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
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
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <TextField
          sx={{ marginBottom: "2vmax" }}
          label="Email"
          className="input_password"
          variant="outlined"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          className="input_password"
          type={values.showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
          <Typography>Forgot Password?</Typography>
        </Link>

        <Button
          variant="contained"
          sx={{ borderRadius: "100px", width: "35vmax" }}
          type="submit"
        >
          Login
        </Button>

        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
