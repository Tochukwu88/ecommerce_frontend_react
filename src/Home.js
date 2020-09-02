import React, { useState, useEffect } from 'react'
import Layout from './component/Layout'
import { getProduct } from './actions/product'
import Card from './component/Card'
import Search from './component/Search'



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
            <h1>Home</h1>
            <Search/>
            <h2>Best seller</h2>
            {productBySell.map((p,i)=>(
                <Card key={i} product={p}/>
            ))}
            <h2>new arrival</h2>
            {productByArrival.map((p,i)=>(
                <Card key={i} product={p}/>
            ))}
           
         </Layout>
        </>
    )
}
export default Home