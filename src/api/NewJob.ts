import axios from "./axios"

export const getJobAndTypeJobRequest = () => axios.get('/job');

export const getClientRequest = () => axios.get('/client');


export const postClientRequest = (client: any) => axios.post('/client', client);