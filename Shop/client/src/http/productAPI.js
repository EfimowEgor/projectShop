import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"
import {useContext} from "react";
import {Context} from "../index";
import React from 'react';

export const createProduct = async (product) => {
    const {data} = await $authHost.get('api/product')
    return data
}

export const fetchProducts = async () => {
    const {data} = await $authHost.get('api/product/load' + ':')
    // console.log(data)
    return {data}
}
export const fetchOneProduct = async (id) => {
    const {data} = await $authHost.get('api/product/' + id)
    return data
}

export const deleteProduct = async (id) => {
    await $authHost.get('api/product/delete/' + id)
}


export const editProduct = async (id) => {
    await $authHost.put('api/product/update/' + id)
}