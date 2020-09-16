import React, { useState, useEffect } from 'react'



import Layout from '../component/Layout'
import { isAuth } from '../actions/auth'
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from '../actions/user'
import moment from 'moment'
import './UD.css'

const Dashboard = () =>{
    const [purchaseHistory, setPurchaseHistory] = useState([])
    const {user:{name,email,role,_id},token} =isAuth()

    const init = (userId, token) =>{
        getPurchaseHistory(userId,token).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setPurchaseHistory(data)
            }
        })
    }
    useEffect(()=>{
        init(_id,token)
    },[])
    return(
        <Layout>

         <div className='UD-container'>

          
            <div className='user-info'>
            <h2>user information</h2>
            <ul>
                <li>NAME: {name}</li>
                <li>EMAIL: {email}</li>
                <li>{role  === 1 ? "Amin" : "User"}</li>
            </ul>
            </div>
            <div className='purchase-history'>
            <h2>purchase history</h2>
            {purchaseHistory.map((h,i)=>{
                 return   (
                     <div className='p-info'>
                     
                         {h.products.map((p,i)=>{
                        return(
                            <div  key={i}>
                            <ul>
                                <li>product name:  {p.name}</li>
                                <li>product price: NGN{p.price}</li>
                                <li>status: {h.status}</li>
                             
                            </ul>
                            
                            <hr/>

                            </div>
                        )
                    })}
                     </div>
                 )
                })}
         
            </div>
            <div className='user-link'>
            <h2>User links</h2>
            <ul>
                <li><Link className='user-link-list' to='/cart'>My cart</Link></li>
                <li><Link className='user-link-list' to={`/profile/${_id}`}>update profile</Link></li>
                
            </ul>
            </div>
           </div>
         
        </Layout>
    )
}
export default Dashboard