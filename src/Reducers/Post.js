import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
//for users likes
export const LikesReducer = createReducer(initialState, {
  //likes reducer
  LikesRequest: (state) => {
    state.loading = true;
  },
  LikesSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  LikesFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //Comment on post Reducer
  CommentRequest: (state) => {
    state.loading = true;
  },
  CommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //Delete Comment on post Reducer
  CommentDeleteRequest: (state) => {
    state.loading = true;
  },
  CommentDeleteSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CommentDeleteFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //Create new post Reducer
  newPostRequest: (state) => {
    state.loading = true;
  },
  newPostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  newPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //update post caption Reducer
  updateCaptionRequest: (state) => {
    state.loading = true;
  },
  updateCaptionSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateCaptionFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //Delete Post reducer

  deletePostRequest: (state) => {
    state.loading = true;
  },
  deletePostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deletePostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //Update profile Reducer

  updateProfileRequest: (state) => {
    state.loading = true;
  },
  updateProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //Update Password Reducer

  updatePasswordRequest: (state) => {
    state.loading = true;
  },
  updatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updatePasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //Delete user profile reducer
  DeleteProfileRequest: (state) => {
    state.loading = true;
  },
  DeleteProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //forgot password reducer
  ForgotPasswordRequest: (state) => {
    state.loading = true;
  },
  ForgotPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  ForgotPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //reset password reducer
  ResetPasswordRequest: (state) => {
    state.loading = true;
  },
  ResetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  ResetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  
  //Clear error and message from state
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

