import React, { useState, useEffect } from 'react'
 import Layout from '../component/Layout'
import { isAuth } from '../actions/auth'
import moment from 'moment'
import './orders.css'
import ShowPhoto from '../component/ShowProductImage'
 
const { listOrders,getStatusValues, updateStatusValues } = require("../actions/createOrder")


const AllOrders = () =>{
    const {user,token} = isAuth()

    const [orders,setOrder] = useState([])
    const [statusValues,setStatusValues] = useState([])
    const loadOrders = () =>{
        listOrders(user._id,token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setOrder(data)
            }
        })

    }
    const loadStatusValues = () =>{
        getStatusValues(user._id,token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setStatusValues(data)
            }
        })

    }
    useEffect(()=>{
        loadOrders()
        loadStatusValues()
    },[])
    const showNumOfOrders = () =>{
        if(orders.length>0){
            return <h1>total orders:{orders.length}</h1>
        }else{
            return <h1>No orders</h1>
        }
    }

  const showInput = (key,value) =>{
      return(
          <div>
              <div>{key}</div>
              <input type='text' value={value} readOnly></input>
          </div>
      )
  }
  const handleStatusChange = (e,orderId) =>{
      updateStatusValues(user._id,token,orderId,e.target.value).then(data =>{
          if(data.error){
              console.log('status update failed')
          }else{
              loadOrders()
          }
      })
  }
  const showStatus = (o) =>(
      <div>
          <h3>{o.status}</h3>
          <select onChange={(e)=>{handleStatusChange(e,o._id)}}>
              <option>Update status</option>
              {statusValues.map((s,i)=>{
                  return<option key={i} value={s}>{s}</option>
              })}
          </select>
      </div>
  )

   return(
       <Layout>
         <div className='tnod'>  {showNumOfOrders()}</div>
           <div className='orders-wrappers'>
         {orders.map((o,oi)=>{
             return(
                <div className='od' key={oi}>

                    <ul>
                        <li>{showStatus(o)}</li>
                        <li><b>Transaction Id: </b>{o.transaction_id}</li>
                        <li><b> Amount: </b> NGN{o.amount}</li>
                        <li><b>ordered by</b>: {o.user.name}</li>
                        <li><b>ordered on</b>: {moment(o.createdAt).fromNow()}</li>
                        <li><b>Delivery address</b>: {o.address}</li>
                    </ul>
                    <h3>
                        total number of ordered products :{o.products.length}
                    </h3>
                    {o.products.map((p,pi)=>{
                     return   <div key={pi}>
                     <div className='order-img' > <ShowPhoto item={p} url='product'/></div>
                            {showInput('product name', p.name)}
                            {showInput('product price',`NGN${p.price}`)}
                            {showInput('product total', p.count)}
                            {showInput('product id', p._id)}
                            <hr/>
                        </div>
                    })}
                </div>
             )
         })}
         </div>

       </Layout>
   ) 
    
}
export default AllOrders