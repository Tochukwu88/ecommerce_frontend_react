import fetch from 'isomorphic-fetch'
import { API } from '../config'
import queryString from 'query-string'

export const updateUser = (userId,token,userData)=>{
    return(
        fetch (`${API}/user/${userId}`,{
            method:'PUT',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
               
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify(userData)
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
export const getUser = (userId,token)=>{
    return(
        fetch (`${API}/user/${userId}`,{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
               
                Authorization: `Bearer ${token}`
            }
           
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
export const getPurchaseHistory = (userId,token)=>{
    return(
        fetch (`${API}/user/orders/by/user/${userId}`,{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
               
                Authorization: `Bearer ${token}`
            }
           
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
export const UpdateUserLS = (user,next) =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('user')){
            let auth = JSON.parse(localStorage.getItem('user'))
            auth.user = user
            localStorage.setItem('user',JSON.stringify(auth))
            next()
        }
    }
}