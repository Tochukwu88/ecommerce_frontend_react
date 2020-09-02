import React, { useState, useEffect } from 'react'
import {getCategory} from '../actions/category'
import { list } from '../actions/product'
import Card from './Card'
const Search =() =>{
    const [data, setData] = useState({
        categories:[],
        category:'',
        search:'',
        result:[],
        searched:false
    })
    const {categories,category,search,result,searched} = data
    const loadCategories = () =>{
        getCategory().then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setData({...data,categories:data})
            }
        })
    }
    useEffect(()=>{
        loadCategories()
    },[])
    const searchedData = () =>{
        
      if(search){
        list({search:search || undefined,category:category}).then(response =>{
            if(response.error){
                console.log(response.error)
            }else{
                setData({...data,result:response,searched:true})
            }
        })
      }
    }
    const searchedMessage = (searched,result) =>{
        if(searched && result.length > 0){
            return `found ${result.length} products`
        }
        if(searched && result.length < 1){
            return `No products found`
        }
    }
 const searchedProducts =(result = []) =>{
     return(
         <div>
         <h2>
             {searchedMessage(searched,result)}
         </h2>
             <div>{result.map((p,i)=>(<Card key={i} product={p}></Card>))}</div>
         </div>
     )

 }
    const handleSubmit = (e)=>{
        e.preventDefault()
        searchedData()

    }
 const   handleChange = name=> (e) =>{
    
        setData({...data, [name]:e.target.value, searched:false})
        
        

    }
    const searchForm = () =>(
    <form onSubmit={handleSubmit}>
          <span> 
          <select onChange={handleChange('category')}>
              <option value='All'>all category</option>
              {categories.map((c,i)=>(<option key={i} value={c._id}> {c.name} </option>))}
          </select>
          
           <input type='search' onChange={handleChange('search')} placeholder='search by name'></input>
           <button>search</button>
           </span>
        </form>
    )
   return( <>
          <div>{searchForm()}</div>
            {searchedProducts(result)}
        
    </>
   )
}
export default Search