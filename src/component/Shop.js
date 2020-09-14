import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import {getCategory} from '../actions/category'


import Card from './Card'
import Checkbox from './Checkbox'
import { price } from './FixedPrices.js'
import RadioBox from './radioBox'
import  {Productfiltered}  from '../actions/product'


const Shop = ()=>{
    const [category ,setCategory] = useState([])
    const [myFilters, setMyFilters] = useState({
        filters:{category:[],price:[]}
    })
    const [error ,setError] = useState([])
    const [limit ,setLimit] = useState(6)
    const [skip ,setSkip] = useState(0)
    const [filteredresult ,setFilteredresult] = useState([])
    const [size ,setSize] = useState(0)
    const init = () =>{
        getCategory().then(data =>{
            if(data.error){
                setError(data.error)
            }else{
                setCategory(data)
            }
        })
    }
    const loadFilteredResult =  (newf) =>{
        Productfiltered(skip,limit,newf).then(data =>{
           if(data.error){
               setError(data.error)
           }else{
               setFilteredresult(data.data)
               setSize(data.size)
               setSkip(0)
           }
       })
    }
    const loadMore =  () =>{
        let toSkip= skip + limit
        Productfiltered(toSkip,limit,myFilters.filters).then(data =>{
           if(data.error){
               setError(data.error)
           }else{
               setFilteredresult([...filteredresult,...data.data])
               setSize(data.size)
               setSkip(toSkip)
           }
       })
    }
    const loadMoreButton = () =>{
        return(
            size > 0 && size >= limit && (
                <button onClick={loadMore}>load more</button>
            )
        )
    }
    const handleFilters = (filters,filterby) =>{
        const newFilters ={...myFilters}
        newFilters.filters[filterby] = filters


        if(filterby === 'price'){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterby] = priceValues

        }
        loadFilteredResult(myFilters.filters)


       setMyFilters(newFilters)

    }
    const handlePrice = value =>{
        const data = price
        let array = []
        for (let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array
            }
        }
        return array
    }
   
    useEffect(()=>{
        init()
        loadFilteredResult(skip,limit,myFilters.filters)
    },[])
    return (
        <><Layout>
        
          <div>
            <h4>filter by category</h4>
            <ul>
            <Checkbox handleFilters={filters =>handleFilters(filters,'category')} category={category}/>

            </ul>
          </div>
          <div>
              <div>
                  <RadioBox prices={price} handleFilters={filters =>handleFilters(filters,'price')} />
              </div>
          </div>
        <div className='shop-pg'>
            <h4>products</h4>
            <div  className='pbs-card'>
            {filteredresult.map((p,i)=>(
                
                <Card key={i} product={p}/>
            

        ))}

            </div>
           
        </div>
        {loadMoreButton()}
        </Layout>
           
        </>
    )
}
export default Shop