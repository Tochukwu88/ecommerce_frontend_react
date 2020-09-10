import fetch from 'isomorphic-fetch'
import { API } from '../config'
import queryString from 'query-string'


export const createProduct = (userId,token,product)=>{
    return(
        fetch (`${API}/product/create/${userId}`,{
            method:'POST',
            headers:{
                Accept:'application/json',
               
                Authorization: `Bearer ${token}`
            },
            body:product
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
export const getProduct = (sortBy)=>{
    return(
        fetch (`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
            method:'GET',
           
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
export const list = (params)=>{
    const query = queryString.stringify(params)
    return(
        fetch (`${API}/products/search?${query}`,{
            method:'GET',
           
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
export const Productfiltered = (skip,limit,filters={})=>{
    const data = {skip, limit,filters}
    return(
        fetch (`${API}/products/by/search`,{
            method:'POST',
            headers:{
                Accept:'application/json',
               
                'Content-Type':'application/json',
               
            },
            body:JSON.stringify(data)
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
export const read = (productId) =>{
    return(
        fetch (`${API}/product/${productId}`,{
            method:'Get',
           
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )

}
export const getRelatedProduct = (productId)=>{
    return(
        fetch (`${API}/products/related/${productId}`,{
            method:'Get',
           
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}

