import React, { useState, useEffect } from 'react'
import Layout from '../component/Layout'
import { allAdminProduct, deleteProduct } from '../actions/admin'
import { isAuth } from '../actions/auth'
import { Link } from 'react-router-dom'


const ManageProducts = () =>{
    const[product,setProduct] = useState([])
    const {user:{_id},token} = isAuth()
    const loadProducts = () =>{
        allAdminProduct().then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setProduct(data)
            }
        })
    }
    const removeProduct = (productId) =>{
        deleteProduct(productId,_id,token).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
               loadProducts()
            }
        })
    }
    useEffect(()=>{
        loadProducts()
    },[])
    return(
        <>
            <Layout>
              <div>
              <h2>Total : {product.length} products</h2>
                  <ul>
                  {product.map((p,i)=>(
                      <li key={i}>
                          {p.name}
                          <Link to={`/admin/product/update/${p._id}`}>Update</Link>
                          <button onClick={()=>removeProduct(p._id)}>Delete product</button>
                      </li>
                  ))}
                      <li></li>
                  </ul>
              </div>
            
            </Layout>
        </>
    )
}
export default ManageProducts