import React, { useState, useEffect } from 'react'



import Layout from '../component/Layout'
import { isAuth } from '../actions/auth'
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from '../actions/user'
import moment from 'moment'

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

            <h1>Dashboard</h1>
            <div>
            <h2>user information</h2>
            <ul>
                <li>{name}</li>
                <li>{email}</li>
                <li>{role  === 1 ? "Amin" : "User"}</li>
            </ul>
            </div>
            <div>
            <h2>purchase history</h2>
           
            <ul>
           
                <li>
                {purchaseHistory.map((h,i)=>{
                 return   (
                     <div>
                     <hr/>
                         {h.products.map((p,i)=>{
                        return(
                            <div key={i}>
                            <h6>product name:{p.name}</h6>
                            <h6>product price: NGN{p.price}</h6>
                            <h6>product date:{moment(p.createdAt).fromNow()}</h6>

                            </div>
                        )
                    })}
                     </div>
                 )
                })}
              

                </li>
               
               
            </ul>
            </div>
            <div>
            <h2>User links</h2>
            <ul>
                <li><Link to='/cart'>My cart</Link></li>
                <li><Link to={`/profile/${_id}`}>update profile</Link></li>
                
            </ul>
            </div>
        </Layout>
    )
}
export default Dashboard