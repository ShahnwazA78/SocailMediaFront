import axios from "axios";
// const BaseUrl = "http://localhost:3000";
const BaseUrl = "https://social-media-backend-pearl.vercel.app";
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });
    const { data } = await axios.post(
      `${BaseUrl}/api/v1/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${BaseUrl}/api/v1/me`, {
      withCredentials: true, // Include cookies with the request
    });

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "PostOfFollowingRequest",
    });
    const { data } = await axios.get(`${BaseUrl}/api/v1/posts`);
    dispatch({
      type: "PostOfFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "PostOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "AllUsersRequest",
      });
      const { data } = await axios.get(`${BaseUrl}/api/v1/users?name=${name}`);
      dispatch({
        type: "AllUsersSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "AllUsersFailure",
        payload: error.response.data.message,
      });
    }
  };

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "MyPostRequest",
    });
    const { data } = await axios.get(`${BaseUrl}/api/v1/my/posts`);
    dispatch({
      type: "MyPostSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "MyPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutRequest",
    });
    const { data } = await axios.get(`${BaseUrl}/api/v1/logout`);
    dispatch({
      type: "LogoutSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LogoutFailure",
      payload: error.response.data.message,
    });
  }
};

export const registerUser =
  (name, avatar, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });
      const { data } = await axios.post(
        `${BaseUrl}/api/v1/register`,
        { name, avatar, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

export const updateUserProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });
    const { data } = await axios.put(
      `${BaseUrl}/api/v1/update/profile`,
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });
      const { data } = await axios.put(
        `${BaseUrl}/api/v1/update/password`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const deleteProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteProfileRequest",
    });
    const { data } = await axios.delete(`${BaseUrl}/api/v1/delete/me`);
    dispatch({
      type: "DeleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const sendToken = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "ForgotPasswordRequest",
    });
    const { data } = await axios.post(
      `${BaseUrl}/api/v1/forgot/password`,

      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "ForgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ForgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const verifyTokenAndReset = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "ResetPasswordRequest",
    });
    const { data } = await axios.put(
      `${BaseUrl}/api/v1/password/reset/${token}`,

      { password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "ResetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ResetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostRequest",
    });
    const { data } = await axios.get(`${BaseUrl}/api/v1/userposts/${id}`);
    dispatch({
      type: "userPostSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "userPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });
    const { data } = await axios.get(`${BaseUrl}/api/v1/user/${id}`);
    dispatch({
      type: "userProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followRequest",
    });
    const { data } = await axios.get(`${BaseUrl}/api/v1/follow/${id}`);
    dispatch({
      type: "followSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followFailure",
      payload: error.response.data.message,
    });
  }
};
