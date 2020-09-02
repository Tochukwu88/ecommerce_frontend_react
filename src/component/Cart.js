import React, { useState, useEffect } from 'react'
 import Layout from './Layout'
import { getCart } from './cartHelpers'
import Card from './Card'
import { Link } from 'react-router-dom'
import Checkout from './checkout'



 const Cart = () =>{
     const [items,setItems] = useState([])
     useEffect(()=>{
         setItems(getCart())
     },[items])
     const showItems = (items) =>{
         return (
             <div>
                 <h2>your cart has {`${items.length}`} items</h2>
                 {items.map((it,i)=>(
                     <Card key={i} product={it} removeproductbtn={true} cartUpdate={true} showAddToCartBtn={false}/>
                 ))}
             </div>
         )
     }
     const noItemsMessage = ()=>{
         return <h2>
             cart is empty. <br/> <Link to="/shop"> continue shopping</Link>
         </h2>
     }
     return(
         <>
             <Layout>
             {items.length > 0 ? showItems(items) : noItemsMessage()}
             <Checkout products={items}/>

             </Layout>
         </>
     )
 }
 export default Cart