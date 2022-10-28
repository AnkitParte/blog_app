import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth/auth.reducer";
import getAllBlogs from "./blog/blog.reducer";
import getAllComm from "./comment/comments.reducer";

const rootReducer = combineReducers({
    auth : authReducer,
    blogs: getAllBlogs,
    comms: getAllComm
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));