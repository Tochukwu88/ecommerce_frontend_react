import fetch from 'isomorphic-fetch'
import { API } from '../config'

export const singleAdminProduct = (productId) =>{
    return(
        fetch (`${API}/product/${productId}`,{
            method:'GET',
           
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )

}
export const allAdminProduct = () =>{
    return(
        fetch (`${API}/products?limit=undefined`,{
            method:'GET',
           
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )

}
export const deleteProduct = (productId,userId,token)=>{
    return(
        fetch (`${API}/product/delete/${productId}/${userId}`,{
            method:'DELETE',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
           
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
export const updateProduct = (productId,userId,token,product)=>{
    return(
        fetch (`${API}/product/update/${productId}/${userId}`,{
            method:'PUT',
            headers:{
                Accept:'application/json',
               
                Authorization:`Bearer ${token}`
            },
            body:product
           
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}