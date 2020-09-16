import React, { useState, useEffect } from 'react'
 import Layout from './Layout'
import { getCart } from './cartHelpers'
import Card from './Card'
import { Link } from 'react-router-dom'
import Checkout from './checkout'
import './Cart.css'



 const Cart = () =>{
     const [items,setItems] = useState([])
     const [run,setRun] = useState(false)
     useEffect(()=>{
         setItems(getCart())
     },[run])
     const showItems = (items) =>{
         return (
             <div className='showitems'>
                 <h2> {`${items.length}`} items</h2>
                 <div className='pbs-card'>
                 {items.map((it,i)=>(
                     <Card key={i} product={it} setRun={setRun} run={run} removeproductbtn={true} cartUpdate={true} showAddToCartBtn={false}/>
                 ))}

                 </div>
               
             </div>
         )
     }
     const noItemsMessage = ()=>{
         return <h2 >
             cart is empty. <br/> <Link to="/shop"> continue shopping</Link>
         </h2>
     }
     return(
         <>
             <Layout>
             <div className='cartSection'>

             {items.length > 0 ? showItems(items) : noItemsMessage()}
           

            
             <Checkout products={items} setRun = {setRun} run={run}/>
             </div>

             </Layout>
         </>
     )
 }
 export default Cart