import React,{ useState, useEffect } from 'react'
import Layout from '../component/Layout'
import {signin,authenticate,isAuth} from '../actions/auth'
import { Redirect } from 'react-router-dom'
import './Form.css'

 const Signin = () =>{
    const [values , setValues]= useState({
        
        email:'teeceemum@gmail.com',
        password:'flower54',
        error:'',
        loading:false,
        redirectUser:false,
        showForm:true

    })
    const {email,password,error,loading,redirectUser,showForm} = values
      

    
    const handleSubmit=(e)=>{
        e.preventDefault()
        setValues({...values, loading:true, error:false})
        const user = {email,password}
        signin(user).then(data=>{
            
           
            if(data.error){
                console.log(data.error)
                setValues({...values,error:data.error,loading:false})
            }else{
                console.log(data)
                authenticate(data,()=>{
                    setValues({...values,redirectUser:true,loading:false})
                })
               
              
            }
        })
       
    }
    const handleChange=name=>(e)=>{
        setValues({...values,error:false,[name]:e.target.value})
        
    }
    const showLoading =()=>(loading?<div><p>loading...</p></div>:'')
    const showError =()=>(error?<div><p>{error}</p></div>:'')
    const redirectUserHome=()=>{
        if(redirectUser){
            if( isAuth() && isAuth().user.role === 1){
                return <Redirect to='/admin/dashboard'/>

            }else{
                return <Redirect to='/user/dashboard'/>
            }
            
        }
        if(isAuth() ){
            return <Redirect to='/'/>

        }
    }
    const signinForm=()=>{
        return(
    
    <div className='form-div'>
          
          <form className='auth-form' onSubmit={handleSubmit} >
          <div className='container'>
          <p>Please sign in.</p>
            

                  
            <label className='label-email'> <b>email</b> </label>
             <input value={email} onChange={handleChange('email')} type="email" className="text"  placeholder="Email"  required/>
             <label className="label-password"><b>password</b> </label>
         
             <input value={password}  onChange={handleChange('password')} type="password" className="text"  placeholder="Password"  required />
           
            <button className='form-button'  type="submit">login</button>
       </div>
         
               
          
              
              
          
          </form>
          </div>
            
        )
    }
     return(
         <>
         <Layout>

           
             {showError()}
        {showLoading()}
        {redirectUserHome()}
       
    
         {showForm &&  signinForm()}
         </Layout>
         </>
     )
 }
 export default Signin








