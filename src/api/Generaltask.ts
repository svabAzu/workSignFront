// Cambia el estado de una tarea general
import axios from "./axios"



export const getGeneralTaskRequest = ()=> axios.get('/generalTask')

export const getGeneralTaskIdRequest =(Id:any)=> axios.get(`/generalTask/${Id}`) 

export const getGeneralTaskStateRequest = ()=> axios.get('/GeneraltaskStates')


export const updateGeneralTaskStateRequest = (id: number, ID_general_task_states: number) =>
    axios.put(`/generalTask/state/${id}`, { ID_general_task_states });