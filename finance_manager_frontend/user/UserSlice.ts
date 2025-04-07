import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDto } from "./UserDto";
import { UserAPI } from "./UserApi";
import * as SecureStore from 'expo-secure-store';

export const signup = createAsyncThunk(
  "auth/signup",
  async (userDto: UserDto, thunkAPI) => {
    return await UserAPI.signup(userDto); // Return the response correctly
  }
);

export const login = createAsyncThunk(
    "auth/login",
    async (userDto: UserDto, thunkAPI) => {
          const response = await UserAPI.login(userDto);
          console.log("login response", response);
          return response;
      }
  );

interface UserState {
  token: string;
  errorMessage: string;
}

const initialState: UserState = {
  token: "",
  errorMessage: "",
};

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    reloadJwtFromStorage: (state, action: PayloadAction<string>) => {
        state.token = action.payload
    },
    logout: (state) => {
      state.token = '';
      SecureStore.setItemAsync('jwt', '');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("signup payload", action.payload);
      state.errorMessage = "";

      // state.newUser.push(action.payload); // action.payload is the new category
    }),
    builder.addCase(signup.rejected, (state, action) => {
      console.log("rejected", action.payload);
      state.errorMessage = "Signup failed";
    }),
    builder.addCase(login.fulfilled, (state, action) => {
        console.log("login payload", action.payload);
        state.token = action.payload.access_token;
        SecureStore.setItemAsync('jwt', (action.payload.access_token));
        state.errorMessage = "";
    }),
    builder.addCase(login.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.errorMessage = "Login failed";
    });
  },
});

// Action creators are generated for each case reducer function
export const { reloadJwtFromStorage, logout } = userSlice.actions

export default userSlice.reducer;
