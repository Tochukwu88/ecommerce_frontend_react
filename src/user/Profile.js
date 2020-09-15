import React, { useState, useEffect } from 'react'



import Layout from '../component/Layout'
import { isAuth } from '../actions/auth'
import { Link ,Redirect} from 'react-router-dom'
import { getUser, updateUser,UpdateUserLS } from '../actions/user'
import './Form.css'

const Profile = ({match}) =>{
    const [values,setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false,
       
    })
    const { name,
        email,
    password,
    error,
    
    success} = values
    const {token} = isAuth()
    const init = (userId) =>{
        getUser(userId,token).then(data =>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,name:data.name,email:data.email})
            }
        })
       
        

    }
    useEffect(()=>{
        init(match.params.userId)
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault()
        setValues({...values,error:false})
        const user = {name,email,password}
        updateUser(match.params.userId,token,user).then(data=>{
            
           
            if(data.error){
               
                setValues({...values,error:data.error})
            }else{
                console.log(data)
                UpdateUserLS(data,()=>{
                    setValues({...values,name:data.name,email:data.email,success:true})
                })
               
              
            }
        })
       
    }
    const handleChange=name=>(e)=>{
        setValues({...values,error:false,[name]:e.target.value})
        
    }
  
    const showError =()=>(error?<div><p>{error}</p></div>:'')
    const redirectUser=(success)=>{
        if(success){
            return <Redirect to='/cart'/>
          
            
        }
      
    }
    const profileUpateForm=()=>{
        return(
            <div className='form-div'>
            <form className='auth-form' onSubmit={handleSubmit} >
            <div className='container'>
    
    
               
              <p>Please fill in the field(s) you wish to update.</p>
              <hr/>
              <div>
               
                 </div>
               <label className='label-email'> <b>name</b> </label>
               <input value={name} onChange={handleChange('name')} type="text" className="text"  placeholder="name"  required/>
              <label className='label-email'> <b>email</b> </label>       
         
               <input value={email} onChange={handleChange('email')} type="email" className="text"  placeholder="Email"  required/>
               <label className="label-password"><b>password</b> </label>
           
               <input value={password}  onChange={handleChange('password')} type="password" className="text"  placeholder="Password"   />
              <button className='form-button'  type="submit">update</button>
         </div>
           
                 
            
                
                
            
            </form>
            </div>
            
        
   
        )
    }
    return(
        <>
            <Layout>

              
                {showError()}
               
                {profileUpateForm(name,password)}
                {redirectUser(success)}
            </Layout>
        </>
    )
}
export default Profile