import axios from "./axios"





//export const registerRequest = (user: myFormValues) => axios.post(`/register`, user)
export const loginRequest = (user: myFormValuesLog)=> axios.post(`/login`, user)
export const verifyTokenRequest = () => axios.get('/verify')

export const logout = () => axios.post(`/logout`)

// interface myFormValues {
//     full_name: string,
//     password: string,
//     address: string,
//     phone: string,
//     dni: string,
//     email: string,
//     //status: string,
//     roleId: string
// }

interface myFormValuesLog {
    email: string,
    password: string,
}
