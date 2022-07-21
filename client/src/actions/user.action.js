import API_BASIC from "../components/utility/api.service";

export const GET_USER = "GET_USER";

export const getUser = (uid) => {
  console.log(uid);
  return (dispatch) => {
    return API_BASIC.get(`/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
