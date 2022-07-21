import API_BASIC from "../components/utility/api.service";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return (dispatch) => {
    return API_BASIC.get(`/user`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
