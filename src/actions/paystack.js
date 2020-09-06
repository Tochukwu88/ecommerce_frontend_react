import fetch from 'isomorphic-fetch'
import { API } from '../config'



export const verifyPayment = (ref)=>{
    const data ={
        reference:ref
    }
   
   
    return(
        fetch (`${API}/paystack/verify`,{
           
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

