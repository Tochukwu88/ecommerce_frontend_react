import React from 'react'
import { isAuth } from '../actions/auth'
import { Link } from 'react-router-dom'
// import { createOrder } from '../actions/createOrder'
import { verifyPayment } from '../actions/paystack'
import { PUBLICKEY } from '../config'
import { PaystackButton } from "react-paystack"




const Checkout = ({products}) =>{
  
       

    const userId = isAuth() && isAuth().user._id
    const token = isAuth().token
    const userMail = isAuth() && isAuth().user.email
    const name = isAuth() && isAuth().user.name
    
     
    const getTotal =() =>{
        return products.reduce((currentValue , nextValue) =>{
            return currentValue + nextValue.count * nextValue.price
        },0)
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
                }else{
                   console.log(response)
                }
            })
          alert("Thanks for doing business with us! Come back soon!!")},
        onClose: () => alert("Wait! Don't leave :("),
      }
   
    const showCheckout = () =>{
        return (
            isAuth() ? (<button  >Checkout</button>):(<button><Link to='/signin'>signin to Checkout</Link></button>)
        )
    }
    return (
       <>
            <h2>total:N{getTotal()}</h2>
          {showCheckout()}
          <PaystackButton {...componentProps} />
       </>
    )
  
}
export default Checkout
