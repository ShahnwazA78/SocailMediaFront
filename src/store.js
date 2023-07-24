import { configureStore } from "@reduxjs/toolkit";
import { LikesReducer } from "./Reducers/Post";
import {
  allusersReducer,
  followReducer,
  myPostReducer,
  postOfFollowingReducer,
  userPostReducer,
  userProfileReducer,
  userReducers,
} from "./Reducers/User";

const store = configureStore({
  reducer: {
    user: userReducers,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allusersReducer,
    likerReducer: LikesReducer,
    myPost: myPostReducer,
    userPost:userPostReducer,
    userProfile:userProfileReducer,
    followReducer:followReducer

  },
});

export default store;
