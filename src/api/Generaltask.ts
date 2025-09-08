import axios from "./axios"

export const getGeneralTaskRequest = ()=> axios.get('/generalTask')

export const getGeneralTaskIdRequest =(Id:any)=> axios.get(`/generalTask/${Id}`) 

export const getGeneralTaskStateRequest = ()=> axios.get('/GeneraltaskStates')