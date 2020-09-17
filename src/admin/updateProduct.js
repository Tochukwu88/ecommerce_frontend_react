import React, { useState, useEffect } from 'react'
import { isAuth } from '../actions/auth'
import Layout from '../component/Layout'

import { getCategory } from '../actions/category'
import { updateProduct, singleAdminProduct } from '../actions/admin'

const UpdateProduct = ({match}) =>{
    const [values,setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirectoProfile:'',
        formData:''



    })
    const { name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectoProfile,
    formData} = values
    const {user,token} = isAuth()

   const init = (productId) =>{
       singleAdminProduct(productId).then(data =>{
        if(data.error){
            setValues({...values,error:data.error})
        }else{
            setValues({...values, name:data.name, description:data.description,
                price:data.price,category:data.category._id,shipping:data.shipping,quantity:data.quantity,formData: new FormData()})
            initCat()
        }
    })
   }
    const initCat = () =>{
        getCategory().then(data =>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({ categories:data, formData: new FormData()})
            }
        })
    }
     
    useEffect(()=>{
        init(match.params.productId)
        initCat()
    },[])

    const handleChange = name => e =>{
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name,value)
        setValues({...values, [name]: value})

    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        setValues({...values, loading:true})
        updateProduct(match.params.productId,user._id,token,formData)
        .then(data =>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values, name:'',
                description:'',
                price:'',
               
             
                shipping:'',
                quantity:'',
                photo:'',
                loading:false,
               
                createdProduct:data.name
                     })
            }
        })

    }
    const showLoading =()=>(loading?<div><p>loading...</p></div>:'')
    const showError =()=>(error?<div><p>{error}</p></div>:'')
    const showMessage =()=>(createdProduct?<div><p>{`${createdProduct} updated`}</p></div>:'')

    const newPostForm = () =>{
        return <form className='addProduct-form' onSubmit={handleSubmit}>
        <h1>update product</h1>
         <div>
             <h4>upload a photo</h4>
             <input type='file'  onChange={handleChange('photo')} name='photo' accept='image/*'/>
         </div>  
         <div className='form-div-input'>
        
         <label><b>name</b></label>
             <input onChange={handleChange('name')} value={name} type='text'></input>
        
             
             <textarea className='txt-area' onChange={handleChange('description')} value={description} placeholder='product description'></textarea>
             
             
             <label><b>price</b></label>
             <input onChange={handleChange('price')} value={price} type='number'></input>

            
             <label><b>quantity</b></label>
             <input onChange={handleChange('quantity')} value={quantity} type='number'></input>

           
             <label><b>category</b></label>
             <select onChange={handleChange('category')} >
                 <option >please select</option>
                 {categories && categories.map((c,i)=>{
                     return<option key={i} value={c._id}>{c.name}</option>
                 })}
             </select>
            

            
             <label><b>shipping</b></label>
             <select onChange={handleChange('shipping')} >
             <option >please select</option>
                 <option value='0'>no</option>
                 <option value='1'>yes</option>
             </select>
           
             
          
        
           
          

         </div>  

         <button className='btn' type='submit'>update product</button>  



        </form>
    }
    return(
        <Layout>
            
            {showMessage()}
            {showLoading()}
            {showError}
            {newPostForm()}
        </Layout>
    )
}
export default UpdateProduct