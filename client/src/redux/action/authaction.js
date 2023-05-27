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
} from "../reducers/reducers";
import * as AuthApi from "../API/authrequest";

export const registerUser = (formdata) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const response = await AuthApi.signUp(formdata);
    console.log(response);
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
    dispatch(logoutSuccess(response));
  } catch (error) {
    dispatch(logoutFail(error.response.data));
  }
};

// export const getUser = () => async (dispatch) => {
//   try {
//     dispatch(getUserStart());
//     const response = await AuthApi.getUser();
//     console.log(response);

//     dispatch(getUserSuccess(response));
//   } catch (error) {
//     dispatch(getUserFail(error.response.data));
//   }
// };
