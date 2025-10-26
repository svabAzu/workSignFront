import instance from "./axios"





export const registerRequest = (user: myFormValues) => instance.post(`/register`, user)
export const loginRequest = (user: myFormValuesLog) => instance.post(`/login`, user)
export const verifyTokenRequest = () => instance.get('/verify')

export const logout = () => instance.post(`/logout`)



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