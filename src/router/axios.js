import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: `${process.env.VUE_APP_SOCKET_BACKEND}`,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}