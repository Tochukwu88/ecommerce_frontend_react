import React from 'react'
import { Link } from 'react-router-dom'
import ShowPhoto from './ShowProductImage'





const Card = ({product}) =>{
    return(
        <div>
            <h5>{product.name}</h5>
            <ShowPhoto item={product} url='product'/>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button>
                <Link to='/'>view product</Link>
            </button>
            <button>
                <Link to='/'>Add to cart</Link>
            </button>
        </div>
    )
}
export default Card