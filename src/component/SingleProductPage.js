import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { read, getRelatedProduct } from '../actions/product'
import Card from './Card'
 const SingleProductPage = (props) =>{
     const [product,setProduct] = useState({})
     const [relatedProduct,setRelatedProduct] = useState([])
     const [error,setError] = useState({})
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
     useEffect(()=>{
         const productId = props.match.params.productId
         LoadSingleProduct(productId)
     },[props])
     return(
         <>
             <Layout>
                 <h1>product</h1>
                {product && product.description &&  <Card product={product} showViewProductButton={false}/>}
               <h1>related product</h1>
               {relatedProduct.map((rp,i)=>{
                   return(
                    <Card key={i} product={rp}/>
                   )
               })}
              

             </Layout>
         </>
     )
 }
 export default SingleProductPage 