import { DeleteForeverOutlined } from "@mui/icons-material";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProfile, getMyPosts, getUserLogout } from "../../Actions/user";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";
import "./Account.css";
const Account = () => {
  const dispatch = useDispatch();
  const { error: likeError, message,loading:deleteLoading } = useSelector(
    (state) => state.likerReducer
  );
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { posts, error, loading } = useSelector((state) => state.myPost);

  const [followingDialog, setFollowingDialog] = useState(false);
  const [followerDialog, setFollowerDialog] = useState(false);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      toast.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, likeError, message, dispatch]);

  const handleLogout = () => {
    dispatch(getUserLogout());
    toast.success("Logout Successfully");
  };
  const handleDeleteProfile = async() => {
    await dispatch(deleteProfile());
    dispatch(getUserLogout());


  };

  return loading || userLoading ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              comments={post.comments}
              likes={post.likes}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isDelete={true}
              isAccount={true}
            />
          ))
        ) : (
          <Typography variant="h6">You have not made any post yet</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />

        <Typography variant="h5">{user.name}</Typography>
        <div>
          <button onClick={() => setFollowerDialog(!followerDialog)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user.followers.length}</Typography>
        </div>
        <div>
          <button onClick={() => setFollowingDialog(!followingDialog)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>
        <div>
          <Typography>Posts</Typography>

          <Typography>{user.posts.length}</Typography>
        </div>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>
        <Button
          disabled={deleteLoading}
          onClick={handleDeleteProfile}
          variant="outlined"
          style={{ color: "red", margin: "2vmax", borderColor: "red" }}
        >
          Delete My Profile
          <DeleteForeverOutlined />
        </Button>
        <Dialog
          open={followingDialog}
          onClose={() => setFollowingDialog(!followingDialog)}
        >
          <div className="DialogBox">
            <Typography fontWeight={700} style={{ margin: "1vmax" }}>
              Following:
            </Typography>
            {user && user.following.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ marginLeft: "1vmax" }}>
                You're not following anyone
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followerDialog}
          onClose={() => setFollowerDialog(!followerDialog)}
        >
          <div className="DialogBox">
            <Typography fontWeight={700} style={{ margin: "1vmax" }}>
              Followers:
            </Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ marginLeft: "1vmax" }}>
                You've no Followers
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Account;
