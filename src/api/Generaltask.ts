// Cambia el estado de una tarea general
import axios from "./axios"



export const getGeneralTaskRequest = ()=> axios.get('/generalTask')

export const getGeneralTaskIdRequest =(Id:any)=> axios.get(`/generalTask/${Id}`) 

export const getGeneralTaskStateRequest = ()=> axios.get('/GeneraltaskStates')


export const updateGeneralTaskStateRequest = (id: number, ID_general_task_states: number) =>
    axios.put(`/generalTask/state/${id}`, { ID_general_task_states });

export const createGeneralTaskRequest = (task: any) => {
    const formData = new FormData();
    for (const key in task) {
        if (task.hasOwnProperty(key)) {
            if (key === 'sketch_url') {
                formData.append(key, task[key]);
            } else if (key === 'typeJobIds') {
                task[key].forEach((id: number) => {
                    formData.append('typeJobIds[]', id.toString());
                });
            }
            else {
                formData.append(key, task[key]);
            }
        }
    }
    return axios.post('/generalTask', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};