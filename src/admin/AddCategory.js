import React, { useState } from 'react'
import { isAuth } from '../actions/auth'
import Layout from '../component/Layout'
import {createCategory} from '../actions/category'
const AddCategory =()=>{
    const [values, setValues] = useState({
        name:'',
        error:'',
        loading:'',
        success:false
    })
    const {name,error,loading,success} = values
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        setValues({...values, loading:true, error:false})
        const {user,token} =isAuth()
        
        createCategory(user._id,token,{name}).then(data=>{
            
           
            if(data.error){
                console.log(data.error)
                setValues({...values,error:data.error,loading:false})
            }else{
                
                setValues({...values,loading:false,success:true})
               
              
            }
        })
       
    }
    const handleChange=name=>(e)=>{
        setValues({...values,error:false,[name]:e.target.value})
        
    }
    const showLoading =()=>(loading?<div><p>loading...</p></div>:'')
    const showError =()=>(error?<div><p>{error}</p></div>:'')
    const showMessage =()=>(success?<div><p>category created</p></div>:'')
    
    
    const createCatForm=()=>{
        return(
          <div >
          
          <form  onSubmit={handleSubmit} >
          <div >
             

                  
            <label > <b>name</b> </label>
             <input value={name} onChange={handleChange('name')} type="name" className="text"  placeholder="name"  required/>
             
            <button className='form-button'  type="submit">create</button>
       </div>
         
               
          
              
              
          
          </form>
          </div>
            
        )
    }

    return(
        <Layout>
            <h1>create category</h1>
            {showLoading()}
            {showError()}
            {showMessage()}
            {createCatForm()}
        </Layout>
    )
}
 export default AddCategory