import React, { useState, useEffect } from 'react'
import { isAuth, clearCart } from '../actions/auth'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/createOrder'
import { verifyPayment } from '../actions/paystack'
import { PUBLICKEY } from '../config'
import { PaystackButton } from "react-paystack"





const Checkout = ({products, setRun= f => f,run =undefined}) =>{
    const [success , setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [address ,setAddress] = useState('')
   
  
       

  
    // const userMail = isAuth() && isAuth().user.email
    const userMail = isAuth()? isAuth().user.email : ''
    const name = isAuth() && isAuth().user.name
    const userId = isAuth()? isAuth().user._id : ''
    const token = isAuth()? isAuth().token : ''
     
    const getTotal =() =>{
        return products.reduce((currentValue , nextValue) =>{
            return currentValue + nextValue.count * nextValue.price
        },0)
    }
    const handleChange =  e =>{
        setAddress(e.target.value)
       
    }
    const showAddress = () =>{
      return(  <form>
              <textarea className='addresstxt'
              value={address} onChange={handleChange} placeholder='enter delivery address'></textarea>
             </form>
      )
    }
   
    const componentProps = {
        email:userMail,
        amount:getTotal()*100,
        metadata: {
          name,
        
        },
        publicKey:PUBLICKEY,
        text: "Pay Now",
        onSuccess: (result) =>{
            console.log(result)
            let ref = result.reference
            
            verifyPayment(ref).then(response =>{
                if(response.error){
                    console.log(response.error)
                    setError(response.error)
                }else{
                   console.log(JSON.parse(response).data, )
                   
                   const orderData = {
                       products :products,
                       transaction_id:JSON.parse(response).data.id,
                       amount:JSON.parse(response).data.amount/100,
                       address:address
                   }
                   createOrder(userId,token, orderData)
                   setSuccess(response.status)
                   clearCart(()=>{
                       setRun(!run)
                       console.log('cart cleart')
                   })
                }
            })
          alert("Thanks for doing business with us! Come back soon!!")},
        onClose: () => alert("Wait! Don't leave :("),
      }
      const showError =()=>(error?<div><p>payment unsuccesful</p></div>:'')
      const showMessage=()=>(success?<div><p>payment successful</p></div>:'')
     
   
    const showCheckout = () =>{
        return (
            isAuth() ?  <PaystackButton  className='paybtn' {...componentProps} />:(<button><Link to='/signin'>signin to Checkout</Link></button>)
        )
    }
    return (
       <>
       {showError()}
       {showMessage()}
         {products.length >0 && ( <div>  <h2>total: NGN{getTotal()}</h2>
            {showAddress()}
          {showCheckout()}</div>)}
        
       </>
    )
  
}
export default Checkout
