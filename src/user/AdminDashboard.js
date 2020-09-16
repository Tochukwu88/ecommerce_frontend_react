import React from 'react'



import Layout from '../component/Layout'
import { isAuth } from '../actions/auth'
import { Link } from 'react-router-dom'
import './AD.css'

const AdminDashboard = () =>{
    const {user:{name,email,role}} =isAuth()
    return(
        <Layout>

          <div className='AD-container'>
            <div className='admin-info'>
            <h2>Admin information</h2>
            <ul>
                <li>{name}</li>
                <li>{email}</li>
                <li>{role  === 1 ? "Admin" : "User"}</li>
            </ul>
            </div>
            <div className='admin-link'>
            <h2>User links</h2>
            <ul>
                <li><Link className='admin-link-list' to='/create/category'>create category</Link></li>
                <li><Link className='admin-link-list' to='/create/product'>create product</Link></li>
                <li><Link className='admin-link-list' to='/admin/orders'>view orders</Link></li>
                <li><Link className='admin-link-list' to='/admin/products'>manage products</Link></li>
                
            </ul>
            </div>
            </div>
            
            
        </Layout>
    )
}
export default AdminDashboard