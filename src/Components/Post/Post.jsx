import {
  ChatBubbleOutline,
  DeleteOutline,
  Favorite,
  FavoriteBorder,
  MoreVert,
} from "@mui/icons-material";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  commentPost,
  deletePost,
  likePost,
  updateCaption,
} from "../../Actions/post";
import "./post.css";
import "react-toastify/dist/ReactToastify.css";
import {
  getFollowingPosts,
  getMyPosts,
  getUserPosts,
  loadUser,
} from "../../Actions/user";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";

const Post = ({
  postId,
  caption,
  postImage,
  comments = [],
  likes = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
  isProfile = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setcommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  const params=useParams();
  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));
    if (isAccount) {
      dispatch(getMyPosts());
    }
    else if (isProfile) {
      dispatch(getUserPosts(params.id));
    } 
    else {
      dispatch(getFollowingPosts());
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    await dispatch(commentPost(postId, commentValue));
    setCommentValue("");
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const handleUpdateCaption = (e) => {
    e.preventDefault();
    dispatch(updateCaption(postId, captionValue));
    setCaptionValue("");
    dispatch(getMyPosts());
  };

  const handleDeletePost = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };
  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setCaptionToggle(true)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>
      <img src={postImage} alt="post" />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="user"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />

        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(true)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} Like</Typography>
      </button>
      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button onClick={() => setcommentToggle(true)}>
          <ChatBubbleOutline />
        </Button>
        {isDelete ? (
          <Button onClick={handleDeletePost}>
            <DeleteOutline />
          </Button>
        ) : null}
      </div>
      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography fontWeight={700} style={{ margin: "1vmax" }}>
            Likes:
          </Typography>
          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setcommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography fontWeight={700} style={{ margin: "1vmax" }}>
            Comments:
          </Typography>
          <form onSubmit={handleComment} className="commentForm">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              required
            />
            <Button type="submit" variant="contained">
              Post
            </Button>
          </form>
          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox_caption">
          <Typography fontWeight={700} style={{ margin: "1vmax" }}>
            Edit Caption:
          </Typography>
          <form onSubmit={handleUpdateCaption} className="commentForm">
            <input
              type="text"
              placeholder="Update Caption..."
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              required
            />
            <Button type="submit" variant="contained">
              Post
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
