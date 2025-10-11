import axios from "./axios"

export const getTaskUssingGeneralTaskIdRequest =(Id:any)=> axios.get(`/task/general/${Id}`) 

export const createTaskRequest = (task: any) => axios.post("/task", task);


export const getMaterialsAllRequest = () => axios.get('/materials');