import React from 'react'



import Layout from '../component/Layout'
import { isAuth } from '../actions/auth'
import { Link } from 'react-router-dom'

const AdminDashboard = () =>{
    const {name,email,role} =isAuth()
    return(
        <Layout>

            <h1>Dashboard</h1>
            <div>
            <h2>Admin information</h2>
            <ul>
                <li>{name}</li>
                <li>{email}</li>
                <li>{role  === 1 ? "Admin" : "User"}</li>
            </ul>
            </div>
            <div>
            <h2>User links</h2>
            <ul>
                <li><Link to='/create/category'>create category</Link></li>
                <li><Link to='/create/product'>create product</Link></li>
                
            </ul>
            </div>
            
            
        </Layout>
    )
}
export default AdminDashboard