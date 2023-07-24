import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/user";
import User from "../User/User";
import "./Search.css";
const Search = () => {
  const { users, loading } = useSelector((state) => state.allUsers);

  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };
  return (
    <div className="search">
      <form className="searchForm" onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

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

        <Button
          disabled={loading}
          variant="contained"
          sx={{
            borderRadius: "100px",
            backgroundColor: "rgb(38, 63, 173)",
            width: "38vmax",
          }}
          type="submit"
        >
          Search
        </Button>
        <div className="searchResults">
          {users &&
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
