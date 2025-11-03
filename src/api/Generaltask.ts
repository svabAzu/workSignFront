// Cambia el estado de una tarea general
import instance from "./axios"



export const getGeneralTaskRequest = ()=> instance.get('/generalTask')

export const getGeneralTaskIdRequest =(Id:any)=> instance.get(`/generalTask/${Id}`) 

export const getGeneralTaskStateRequest = ()=> instance.get('/GeneraltaskStates')


export const updateGeneralTaskStateRequest = (id: number, ID_general_task_states: number) =>
    instance.put(`/generalTask/state/${id}`, { ID_general_task_states });

export const resumeGeneralTaskRequest = (id: number) =>
    instance.put(`/generalTask/resume/${id}`);

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
    return instance.post('/generalTask', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};