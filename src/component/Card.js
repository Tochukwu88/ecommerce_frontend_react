import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowPhoto from './ShowProductImage'
import moment from 'moment'
import { addItem ,updateItems,removeItem} from './cartHelpers'
import './Card.css'






const Card = ({product, setRun = f=> f,run=undefined,  showViewProductButton=true, showAddToCartBtn= true, cartUpdate=false,removeproductbtn=false}) =>{
    const [ redirect , setRedirect] = useState(false)
    const [ count , setCount] = useState(product.count)
    const viewButton =(showViewProductButton) =>{
    return   showViewProductButton && ( <button className='card-btn btn'>    <Link   className='card-link'  to={`/product/${product._id}`}>view product</Link>  </button>)
    }

    const addtocart= () =>{
        addItem(product,()=>{
            setRedirect(true)

        })
    }
    const shouldRedirect =  redirect =>{
        if(redirect){
            return <Redirect to='/cart'/>
        }
    }
    const handleChange =(productId) =>e =>{
        setRun(!run)
        setCount(e.target.value < 1 ? 1 : e.target.value)
        if(e.target.value >= 1){
            updateItems(productId, e.target.value)
        }
    }
     const cartUpdateOptions = cartUpdate =>{
     return cartUpdate && <div><input type='number' value={count} onChange={handleChange(product._id)}/></div>
     }
    
    const addToCartButton = (showAddToCartBtn) =>{
        return showAddToCartBtn && (
            <button className='card-btn btn ' onClick={addtocart}>
                <Link className='card-link' to='/'>Add to cart</Link>
            </button>
        )


    }
    const removeButton = (removeproductbtn) =>{
        return removeproductbtn && (
          
                <Link className='removelnk' onClick={() =>{removeItem(product._id); setRun(!run)}} to='/'>remove product </Link>
           
        )

    }
    const showStock = q =>{
        return(
            q > 0 ? <span className='inSt' >in stock</span> :<span className='outSt'>out of stock</span>
        )
    }
    return(
        <div className='card'>
            
            {shouldRedirect(redirect)}
            <ShowPhoto item={product} url='product'/>
            <h1>{product.name}</h1>
            
            <p className='price'>NGN{product.price}</p>
        
            <p>Added  {moment(product.createdAt).fromNow()} </p>
          
            {   viewButton(showViewProductButton)}
           {addToCartButton(showAddToCartBtn)}
         <div className='rm-ss'>  {removeButton(removeproductbtn)}
           {showStock(product.quantity)}</div>
          
           <div className='updateCart'>{cartUpdateOptions(cartUpdate)}
          </div> 
            
        </div>
    )
}
export default Card