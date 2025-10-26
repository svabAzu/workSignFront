import instance from "./axios"

export const getTaskUssingGeneralTaskIdRequest =(Id:any)=> instance.get(`/task/general/${Id}`) 

export const createTaskRequest = (task: any) => instance.post("/task", task);


export const getMaterialsAllRequest = () => instance.get('/materials');

export const getOperatorWorkloadRequest = () => instance.get('/taskOperator/workload');