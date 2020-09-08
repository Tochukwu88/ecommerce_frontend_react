import fetch from 'isomorphic-fetch'
import { API } from '../config'
import cookie from 'js-cookie'

export const signup = (user)=>{
    return(
        fetch (`${API}/signup`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}

export const signin = (user)=>{
    return(
        fetch (`${API}/signin`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}

export const signout = (next)=>{
    removeCookie('token')
    removelocalStorage('user')
    next()
    return(
        fetch(`${API}/signout`,{
            method:'GET'
        }).then(response=>{
            console.log('signout ok')
        })
        .catch(err => console.log(err))
    )
}

export const setCookie=(key,value)=>{
    if(typeof Window !== 'undefined'){
        cookie.set(key,value,{
            expires:1
        })
    }
}
export const removeCookie=(key)=>{
    if(typeof Window !== 'undefined'){
        cookie.remove(key,{
            expires:1
        })
    }
}
export const getCookie=(key)=>{
    if(typeof Window !== 'undefined'){
       return  cookie.get(key)
    }
}
export const setlocalStorage=(key,value)=>{
    if(typeof Window !== 'undefined'){
        localStorage.setItem(key,JSON.stringify(value))
    }
}
export const removelocalStorage=(key)=>{
    if(typeof Window !== 'undefined'){
        localStorage.removeItem(key)
    }
}
export const authenticate = (data, next) =>{
    setCookie('token',data.token)
    setlocalStorage('user',data)
    next()
}
export const isAuth=()=>{
    if(typeof Window !== 'undefined'){
        const cookiecheck =getCookie('token')
        if(cookiecheck){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false
            }
        }
    }
}
export const clearCart = (next) =>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('cart')
        next()
    }
}
