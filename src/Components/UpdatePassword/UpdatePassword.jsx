import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getUserLogout, updatePassword } from "../../Actions/user";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [oldvalues, setoldValues] = React.useState({
    Oldpassword: "",
    showOldPassword: false,
  });
  const [Newvalues, setNewValues] = React.useState({
    Newpassword: "",
    showNewPassword: false,
  });

  const { loading, error, message } = useSelector(
    (state) => state.likerReducer
  );
  const dispatch = useDispatch();
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    await dispatch(updatePassword(oldPassword, newPassword));
    setOldPassword("");
    setNewPassword("");
  };

  const handleClickShowOldPassword = () => {
    setoldValues({ ...oldvalues, showOldPassword: !oldvalues.showOldPassword });
  };
  const handleClickShowNewPassword = () => {
    setNewValues({ ...Newvalues, showNewPassword: !Newvalues.showNewPassword });
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
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={handleUpdatePassword}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <TextField
          sx={{ marginBottom: "2vmax" }}
          label="Old Password"
          className="input_password"
          type={oldvalues.showOldPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowOldPassword}>
                  {oldvalues.showOldPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="New Password"
          className="input_password"
          type={Newvalues.showNewPassword ? "text" : "password"}
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowNewPassword}>
                  {Newvalues.showNewPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Link to="/forgot/password">
          <Typography
            onClick={() => {
              dispatch(getUserLogout());
              toast.error("Please enter your email to reset password");
            }}
          >
            Forgot Password?
          </Typography>
        </Link>

        <Button
          disabled={loading}
          variant="contained"
          sx={{ borderRadius: "100px", width: "35vmax" }}
          type="submit"
        >
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
