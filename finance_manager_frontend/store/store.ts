import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './../categories/CategorySlice';
import entryReducer from './../entries/EntrySlice'
// import userReducer from './../login/LogInSlice';
import userReducer from './../user/UserSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    entry: entryReducer,
    user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch