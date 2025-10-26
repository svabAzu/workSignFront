import axios from "axios";


const instance = axios.create({
    baseURL: 'https://api.pabloproyectos.com.ar/api',
    withCredentials:true
})

export default instance