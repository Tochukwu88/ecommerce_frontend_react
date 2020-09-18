import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { read, getRelatedProduct } from '../actions/product'
import Card from './Card'
import ShowPhoto from './ShowProductImage'
import { addItem, getCart } from './cartHelpers'
import { Link, Redirect } from 'react-router-dom'
import './SingleProduct.css'
import { isAuth } from '../actions/auth'
import {  deleteProduct } from '../actions/admin'


 const SingleProductPage = (props) =>{
     const [product,setProduct] = useState({})
     const [relatedProduct,setRelatedProduct] = useState([])
     const [error,setError] = useState({})
     const [inCart,setInCart] = useState(false)
     const[deleted, setDeleted] =useState(false)
     const LoadSingleProduct = productId =>{
         read(productId).then(data =>{
             if(data.error){
                 setError(data.error)
             }else{
                 setProduct(data)
                 getRelatedProduct(data._id).then(data =>{
                    if(data.error){
                        setError(data.error)
                     
                 }else{
                     setRelatedProduct(data)
                 }
                }
                 )
             }
         })

     }
     const addtocart= () =>{
        addItem(product,()=>{
            // setRedirect(true)
            console.log('added')

        })
    }
    const checkCart = (productId) =>{
        getCart().map((item,i)=>{
            if(item._id === productId){
                setInCart(true)
            }
        })
     
    }
    const addToCartButton = () =>{
        return  (
         
            <button className='card-btn btn ' onClick={addtocart}>
                <Link className='card-link' to='/'>Add to cart</Link>
            </button>
        )


    }
    const removeProduct = (productId) =>{
        const {user:{_id},token} = isAuth()
        deleteProduct(productId,_id,token).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
             setDeleted(true)
            }
        })
    }
    const showMessage=()=>(deleted?<div>
        <Redirect to='/signin'></Redirect></div>:'')
   
     useEffect(()=>{
        const productId = props.match.params.productId
        checkCart(productId)
      
         
         LoadSingleProduct(productId) 
     },[props])
     return(
         <>
        
             <Layout>
             {showMessage()}
                
                {product && product.description && (<div className='singleProduct-container'>
                <div className='singleProduct-img'> <ShowPhoto item={product} url='product'/></div>
               <div> <h1>{product.name}</h1>
               <p className='price'>NGN{product.price}</p>
                <p>{product.description}</p>
                 {inCart?(<button className='card-btn btn '> <Link className='card-link' to='/cart'>go to cart</Link></button>):(addToCartButton())}
                 {isAuth() && isAuth().user.role === 1 && ( <div>
                           
                           <Link className='mp-btn mp-btn-up' to={`/admin/product/update/${product._id}`}>Update </Link>
                           <button className='mp-btn mp-btn-del' onClick={()=>removeProduct(product._id)}>Delete </button>
                         </div>)}
                 
                 
                 </div>
                </div>) }
                
              <div className='relatedP-container'>
              <h2>related product</h2>
              <div className='pbs-card'>
              
              {relatedProduct.map((rp,i)=>{
                  return(
                   <Card key={i} product={rp}/>
                  )
              })}
              </div>

              </div>
            
              

             </Layout>
         </>
     )
 }
 export default SingleProductPage 
 //<Card product={product} showViewProductButton={false}/>