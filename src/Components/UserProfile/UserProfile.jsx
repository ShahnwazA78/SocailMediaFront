import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
} from "../../Actions/user";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { error: likeError, message: likeMessage } = useSelector(
    (state) => state.likerReducer
  );

  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.followReducer);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);
  const { user: me } = useSelector((state) => state.user);
  const { posts, error, loading } = useSelector((state) => state.userPost);

  const [followingDialog, setFollowingDialog] = useState(false);
  const [followerDialog, setFollowerDialog] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const params = useParams();

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, params.id]);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(params.id));
    dispatch(getUserProfile(params.id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      toast.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (followError) {
      toast.error(followError);
      dispatch({ type: "clearErrors" });
    }
    if (userError) {
      toast.error(userError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (likeMessage) {
      toast.success(likeMessage);
      dispatch({ type: "clearMessage" });
    }
  }, [
    error,
    likeError,
    followError,
    likeMessage,
    userError,
    message,
    dispatch,
  ]);

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
              isProfile={true}
            />
          ))
        ) : (
          <Typography variant="h6">User has not made any post yet</Typography>
        )}
      </div>
      <div className="accountright">
        {user && (
          <>
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
            {myProfile ? null : (
              <Button
                variant="contained"
                disabled={followLoading}
                sx={{
                  transition: "all 0.5s",
                  backgroundColor: following ? "rgb(255, 0, 0,0.8)" : "",
                  ":hover": { backgroundColor: following ? "red" : "" },
                }}
                onClick={followHandler}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}
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

export default UserProfile;
