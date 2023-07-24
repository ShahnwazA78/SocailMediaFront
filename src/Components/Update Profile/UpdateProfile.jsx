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
import { loadUser, updateUserProfile } from "../../Actions/user";
import Loader from "../Loader/Loader";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);

  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.likerReducer);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [avatar, setAvatar] = useState();
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onloadend = () => {
      //readyState are 0 1 2 0->initial 1->proccessing 2->proccessed
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUserProfile(name, email, avatar));
    dispatch(loadUser());
  };
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateLoading) {
      toast.promise(resolveAfter3Sec, {
        pending: "Please Wait...",
        success: "Profile Updated Successfully",
        error: "Something Went Wrong",
      });
    }
    dispatch({ type: "clearMessage" });
  }, [error, dispatch, updateError, message, updateLoading]);
  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <Avatar
          className="avatar"
          src={avatarPrev}
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

        <Button
          variant="contained"
          sx={{
            borderRadius: "100px",
            backgroundColor: "rgb(38, 63, 173)",
            width: "38vmax",
          }}
          disabled={updateLoading}
          type="submit"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
