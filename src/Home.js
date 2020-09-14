import React, { useState, useEffect } from 'react'
import Layout from './component/Layout'
import { getProduct } from './actions/product'
import Card from './component/Card'

import {Link} from 'react-router-dom'
import './Home.css'



const Home = () =>{
    const [productBySell,setProductBySell] = useState([])
    const [productByArrival,setProductByArrival] = useState([])
    const [error,setError] = useState([])

    const loadProductBySell = ()=>{
        getProduct('sold').then(data =>{
            if(data.error){
                setError(data.error)
            }else{
                setProductBySell(data)
            }
        })
    }
    const loadProductByArrival = ()=>{
        getProduct('createdAt').then(data =>{
            if(data.error){
                setError(data.error)
            }else{
                setProductByArrival(data)
            }
        })
    }
    useEffect(()=>{
        loadProductByArrival()
        loadProductBySell()
    },[])
    return(
        <>
        <Layout>
        <div className='row'>
                
                <h1>Bring out the best in you</h1>
                <p>improve your style with our quality and luxurious clothings</p>
                <Link className='btn' to='/shop'>Shop now &#8594;</Link>
            
           
        </div>
           <div className='pBySell'>
           <h2>Best seller</h2>
           <div className='pbs-card'>
            {productBySell.map((p,i)=>(
               
                <Card key={i} product={p}/>

               
               
            ))}
            </div>
           
           </div>
           <div className='pByArrival'>
           <h2>new arrival</h2>
           <div className='pbs-card'>
            {productByArrival.map((p,i)=>(
                <Card key={i} product={p}/>
            ))}
            </div>

           </div>
            
            
           
         </Layout>
        </>
    )
}
export default Home