import React, { useState, useEffect } from 'react'
import Layout from '../component/Layout'
import { allAdminProduct, deleteProduct } from '../actions/admin'
import { isAuth } from '../actions/auth'
import { Link } from 'react-router-dom'
import ShowPhoto from '../component/ShowProductImage'
import './ManageProducts.css'



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
            <h2>Total : {product.length} products</h2>
              <div className='product-wrapper'>
                     
                 
                  {product.map((p,i)=>(
                      <div  key={i}>
                     <div className='product-img' > <ShowPhoto item={p} url='product'/>
                       {p.name}
                        <div>
                           
                            <Link className='mp-btn mp-btn-up' to={`/admin/product/update/${p._id}`}>Update </Link>
                            <button className='mp-btn mp-btn-del' onClick={()=>removeProduct(p._id)}>Delete </button>
                          </div>
                       
                     </div>
                        
                      </div>
                  ))}
                     
                
              </div>
            
            </Layout>
        </>
    )
}
export default ManageProducts