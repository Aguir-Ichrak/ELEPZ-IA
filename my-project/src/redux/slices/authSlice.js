import { createSlice } from "@reduxjs/toolkit";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
} from "../../axios/authAxios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const login = (payload) => async (dispatch) => {
  try {
    const data = await apiLogin(payload);
    dispatch(setUser(data));
    return {
      succes: true,
      msg: "Login succesuffly",
    };
  } catch (error) {
    return {
      succes: false,
      msg: error.response.data.msg,
    };
  }
};
export const register = (payload) => async (dispatch) => {
  try {
    const data = await apiRegister(payload);
    dispatch(setUser(data));
    return {
      succes: true,
      msg: "Login succesuffly",
    };
  } catch (error) {
    return {
      succes: false,
      msg: error.response.data.msg,
    };
  }
};
export const logout = () => (dispatch) => {
  apiLogout();
  dispatch(clearUser());
};

export default authSlice.reducer;
