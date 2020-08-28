import React from 'react'



import Layout from '../component/Layout'
import { isAuth } from '../actions/auth'
import { Link } from 'react-router-dom'
const Dashboard = () =>{
    const {name,email,role} =isAuth()
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
                <li>name</li>
                <li>email</li>
                <li>role</li>
            </ul>
            </div>
            <div>
            <h2>User links</h2>
            <ul>
                <li><Link to='/cart'>My cart</Link></li>
                <li><Link to='/profile/update'>update profile</Link></li>
                
            </ul>
            </div>
        </Layout>
    )
}
export default Dashboard