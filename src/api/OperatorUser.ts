import instance from "./axios";

export const getOperatorUserRequest = () => instance.get("/user/operators/all");

export const putOperatorUserRequest = async (
  id: number,
  userData: FormData
) => {
  return await instance.put(`/user/${id}`, userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updateOperatorUserStateRequest = async (id: number, state: boolean) => {
  return await instance.put(`/user/state/${id}`, { state });
};