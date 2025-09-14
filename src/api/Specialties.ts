import axios from "./axios"

export const getSpecialtiesRequest = ()=> axios.get('/specialty')

export const createSpecialtyRequest = (specialty: { name: string }) => axios.post('/specialty', specialty)

export const updateSpecialtyRequest = (id: number, specialty: { name: string }) => axios.put(`/specialty/${id}`, specialty)

export const deleteSpecialtyRequest = (id: number) => axios.delete(`/specialty/${id}`)