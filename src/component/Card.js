import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowPhoto from './ShowProductImage'
import moment from 'moment'
import { addItem ,updateItems,removeItem} from './cartHelpers'






const Card = ({product, setRun = f=> f,run=undefined,  showViewProductButton=true, showAddToCartBtn= true, cartUpdate=false,removeproductbtn=false}) =>{
    const [ redirect , setRedirect] = useState(false)
    const [ count , setCount] = useState(product.count)
    const viewButton =(showViewProductButton) =>{
    return   showViewProductButton && ( <button>    <Link to={`/product/${product._id}`}>view product</Link>  </button>)
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
            <button onClick={addtocart}>
                <Link to='/'>Add to cart</Link>
            </button>
        )


    }
    const removeButton = (removeproductbtn) =>{
        return removeproductbtn && (
            <button onClick={() =>{removeItem(product._id); setRun(!run)}}>
                <Link to='/'>remove product </Link>
            </button>
        )

    }
    const showStock = q =>{
        return(
            q > 0 ? <span>in stock</span> :<span>out of stock</span>
        )
    }
    return(
        <div>
            <h5>{product.name}</h5>
            {shouldRedirect(redirect)}
            <ShowPhoto item={product} url='product'/>
            <p>{product.description.substring(0,50)}</p>
            <p>{product.price}</p>
            <p>category:{product.category && product.category.name}</p>
            <p>Added on {moment(product.createdAt).fromNow()} </p>
            {   viewButton(showViewProductButton)}
           {addToCartButton(showAddToCartBtn)}
           {showStock(product.quantity)}
           {removeButton(removeproductbtn)}
           {cartUpdateOptions(cartUpdate)}
           
            
        </div>
    )
}
export default Card