import {
  getUserFail,
  getUserStart,
  getUserSuccess,
} from "../reducers/reducers";
import * as UserApi from "../API/userrequest";

export const getProfile = () => async (dispatch) => {
  try {
    dispatch(getUserStart());
    const response = await UserApi.getMyProfile();
    dispatch(getUserSuccess(response));
  } catch (error) {
    dispatch(getUserFail(error.response.data));
  }
};
