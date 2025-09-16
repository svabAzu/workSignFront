import axios from "./axios"

export const getOperatorUserRequest = ()=> axios.get('/user/operators/all')

export const putOperatorUserRequest = (id: number, userData: FormData) => axios.put(`/user/${id}`, userData);