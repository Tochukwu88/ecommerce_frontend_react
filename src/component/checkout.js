import React from 'react'
import { isAuth } from '../actions/auth'
import { Link } from 'react-router-dom'

const Checkout = ({products}) =>{
     
    const getTotal =() =>{
        return products.reduce((currentValue , nextValue) =>{
            return currentValue + nextValue.count * nextValue.price
        },0)
    }
    const showCheckout = () =>{
        return (
            isAuth() ? (<button>Checkout</button>):(<button><Link to='/signin'>signin to Checkout</Link></button>)
        )
    }
    return (
       <>
            <h2>total:N{getTotal()}</h2>
          {showCheckout()}
       </>
    )
  
}
export default Checkout