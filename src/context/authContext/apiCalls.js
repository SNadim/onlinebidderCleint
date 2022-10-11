import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
} from "./AuthAction";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const api = axios.create({
  baseURL: "https://reignmart.herokuapp.com",
});

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await api.post("auth/login", { ...user }, config);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  try {
    const res = await api.post("auth/logout", [], { withCredentials: true });
    console.log(res);
    dispatch(logoutStart());
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const sellerLogin = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await api.post("auth/seller/login", { ...user }, config);
    dispatch(loginSuccess(res.data));

    return res.data;
  } catch (error) {
    dispatch(loginFailure());
    return null;
  }
};

export const sellerLogout = async (dispatch) => {
  try {
    const res = await api.post("auth/seller/logout", [], {
      withCredentials: true,
    });
    dispatch(logoutStart());
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
