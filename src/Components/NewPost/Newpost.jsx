import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createnewPost } from "../../Actions/post";
import { loadUser } from "../../Actions/user";
import "./newpost.css";
const Newpost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const { loading, error, message } = useSelector(
    (state) => state.likerReducer
  );

  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onloadend = () => {
      //readyState are 0 1 2 0->initial 1->proccessing 2->proccessed
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(createnewPost(caption, image));
    dispatch(loadUser());
    setCaption("");
    setImage(null);

  };

  useEffect(() => {
    if (loading) {
      toast.promise(resolveAfter3Sec, {
        pending: "Please Wait...",
        success: "Post Created Successfully",
        error: "Something Went Wrong",
      });
    }
    dispatch({ type: "clearMessage" });

  }, [error, message, dispatch, loading]);

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={handleSubmit}>
        <Typography variant="h3">New Post</Typography>
        {image && <img src={image} alt="post" />}{" "}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default Newpost;
