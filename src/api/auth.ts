import axios from "./axios"





export const registerRequest = (user: myFormValues) => axios.post(`/register`, user)
export const loginRequest = (user: myFormValuesLog) => axios.post(`/login`, user)
export const verifyTokenRequest = () => axios.get('/verify')

export const logout = () => axios.post(`/logout`)

interface myFormValues {
    name: string,
    last_name: string,
    password: string,
    email: string,
    dni: number,
    phone: string,
    avatar_url: string,
    ID_type_user: string,
    specialties: []
}

interface myFormValuesLog {
    email: string,
    password: string,
}
