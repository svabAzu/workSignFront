import axios from "./axios"

export const getTaskUssingGeneralTaskIdRequest =(Id:any)=> axios.get(`/task/general/${Id}`) 


