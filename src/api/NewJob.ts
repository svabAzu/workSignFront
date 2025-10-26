import instance from "./axios"

export const getJobAndTypeJobRequest = () => instance.get('/job');

export const getClientRequest = () => instance.get('/client');


export const postClientRequest = (client: any) => instance.post('/client', client);