import {
  registerStart,
  registerSuccess,
  registerFail,
  loginFail,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFail,
  getUserFail,
  getUserStart,
  getUserSuccess,
} from "../reducers/reducers";
import * as AuthApi from "../API/authrequest";
import * as UserApi from "../API/userrequest";

export const registerUser = (formdata) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const response = await AuthApi.signUp(formdata);
    dispatch(registerSuccess(response));
  } catch (error) {
    dispatch(registerFail(error.response.data));
  }
};

export const logInUser = (formdata) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await AuthApi.logIn(formdata);
    dispatch(loginSuccess(response));
  } catch (error) {
    dispatch(loginFail(error.response));
  }
};

export const logOutUser = () => async (dispatch) => {
  try {
    dispatch(logoutStart());
    const response = await AuthApi.logOut();
    console.log(response);
    dispatch(logoutSuccess(response));
  } catch (error) {
    dispatch(logoutFail(error.response.data));
  }
};

export const getProfile = (formdata) => async (dispatch) => {
  try {
    dispatch(getUserStart());
    const response = await UserApi.getMyProfile(formdata);
    dispatch(getUserSuccess(response));
  } catch (error) {
    dispatch(getUserFail(error.response.data));
  }
};
