import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../Actions/user";
import "./register.css";
const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.user);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onloadend = () => {
      //readyState are 0 1 2 0->initial 1->proccessing 2->proccessed
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, avatar, email, password));
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearMessage" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, dispatch]);
  return (
    <div className="register">
      <form className="registerForm" onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <Avatar
          className="avatar"
          src={avatar}
          alt="User"
          sx={{ height: "9vmax", width: "9vmax", marginBottom: "10px" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <TextField
          sx={{ marginBottom: "10px" }}
          label="Name"
          className="input_password"
          variant="outlined"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          sx={{ marginBottom: "10px" }}
          label="Email"
          className="input_password"
          variant="outlined"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          sx={{ marginBottom: "10px" }}
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
        <Link to="/">
          <Typography>Already Register? </Typography>
        </Link>

        <Button
          variant="contained"
          sx={{
            borderRadius: "100px",
            backgroundColor: "rgb(38, 63, 173)",
            width: "38vmax",
          }}
          disabled={loading}
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
