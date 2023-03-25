import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";
export const registration = async (login, password, INN) => {
    const {data} = await $host.post('api/seller/registrationSeller', {login, password, role: 2, INN})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (login, password) => {
    const {data} = await $host.post('api/seller/loginSeller', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/seller/authSeller')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}