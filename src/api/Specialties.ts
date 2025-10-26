import instance from "./axios"

export const getSpecialtiesRequest = ()=> instance.get('/specialty')

export const createSpecialtyRequest = (specialty: { name: string }) => instance.post('/specialty', specialty)

export const updateSpecialtyRequest = (id: number, specialty: { name: string }) => instance.put(`/specialty/${id}`, specialty)

export const deleteSpecialtyRequest = (id: number) => instance.delete(`/specialty/${id}`)