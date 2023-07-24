import axios from "axios";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "LikesRequest",
    });
    const { data } = await axios.get(`/api/v1/post/${id}`);

    dispatch({
      type: "LikesSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LikesFailure",
      payload: error.response.data.message,
    });
  }
};

export const commentPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "CommentRequest",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/post/comment/${id}`,
      { comment },
      config
    );
    dispatch({
      type: "CommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const commentDelete = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "CommentDeleteRequest",
    });
    const { data } = await axios.delete(
      `/api/v1/post/comment/${id}`,
      {
        data: { commentId },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "CommentDeleteSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CommentDeleteFailure",
      payload: error.response.data.message,
    });
  }
};

export const createnewPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });
    const { data } = await axios.post(
      `/api/v1/post/upload`,
      {
        caption,
        image,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateCaption = (id, caption) => async (dispatch) => {
  try {
    dispatch({
      type: " updateCaptionRequest",
    });

    const { data } = await axios.put(
      `/api/v1/post/${id}`,
      { caption },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const { data } = await axios.delete(`/api/v1/post/${id}`);
    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};
