import axios from "./axios";

export const getOperatorUserRequest = () => axios.get("/user/operators/all");

export const putOperatorUserRequest = async (
  id: number,
  userData: FormData
) => {
  return await axios.put(`/user/${id}`, userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updateOperatorUserStateRequest = async (id: number, state: boolean) => {
  return await axios.put(`/user/state/${id}`, { state });
};