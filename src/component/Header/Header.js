import React, { useState } from 'react'
import { FaAlignRight } from 'react-icons/fa';
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuth } from '../../actions/auth'
import { totalItem } from '../cartHelpers'

import './Header.css'

import logo from './img/logo.png'
import Search from '../Search'




const isActive = (history,path) =>{
    if(history.location.pathname === path){
        return {color:"#ff9900"}
    }else{
        return{color:"black"}
    }
}
const Header = ({history}) =>{
    const [toggle,setToggle] = useState(false)
    const Toggle = () =>{
        setToggle(!toggle)
    }
    return (
        <>
       
        <div className='container'>
            <div className='navBar'>
                <div><img className='logo' src={logo} alt='logo'></img></div>
                <div onClick={Toggle} className={toggle ? "nav open" : "nav"}>

                </div>

               
               
                
                <nav onClick={Toggle} className={toggle ? "nav open" : "nav"}>
               
               

                    <ul className="nav-list">
                        <li className='nav-item'>
                            <Link   className='nav-item-link'  style={isActive(history,"/")} to='/'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link   className='nav-item-link' style={isActive(history,"/cart")} to='/cart'>cart <sup><small>{totalItem()}</small></sup></Link>
                        </li>
                        <li className='nav-item'>
                            <Link  className='nav-item-link'  style={isActive(history,"/shop")} to='/shop'>Shop</Link>
                        </li>
                        {!isAuth() && (<li className='nav-item'>
                            <Link className='nav-item-link' style={isActive(history,"/signup")}  to='/signup'>Sign up</Link>
                        </li>)}
                       {!isAuth() && ( <li className='nav-item'>
                            <Link  className='nav-item-link'  style={isActive(history,"/signin")}  to='/signin'>Sign in</Link>
                        </li>)}
                        <li className='nav-item'>
                           { isAuth() && isAuth().user.role === 1 && (<Link   className='nav-item-link' style={isActive(history,"/admin/dashboard")}  to='/admin/dashboard'>Dashboard</Link>) }
                        </li>
                        <li className='nav-item'>
                           { isAuth() && isAuth().user.role === 0 && (<Link  className='nav-item-link'  style={isActive(history,"/user/dashboard")}  to='/user/dashboard'>Dashboard</Link>) }
                        </li>
                       {isAuth() && ( <li  className='nav-item' style={{cursor:'pointer',color:'black'}} onClick={()=>{signout(()=>{
                            history.push('/')
                        })}}>
                              Sign out
                        </li>)}
                    </ul>
                </nav> 
                <nav className='desktop-nav'>
               
               

               <ul>
                   <li>
                       <Link  className='nav-item-link'  style={isActive(history,"/")} to='/'>Home</Link>
                   </li>
                   <li>
                       <Link  className='nav-item-link'  style={isActive(history,"/cart")} to='/cart'>cart <sup><small>{totalItem()}</small></sup></Link>
                   </li>
                   <li>
                       <Link  className='nav-item-link'  style={isActive(history,"/shop")} to='/shop'>Shop</Link>
                   </li>
                  {!isAuth() &&(
                    <li>
                       <Link  className='nav-item-link' style={isActive(history,"/signup")}  to='/signup'>Sign up</Link>
                   </li>
                  )}
                   {!isAuth() &&(<li>
                       <Link  className='nav-item-link'  style={isActive(history,"/signin")}  to='/signin'>Sign in</Link>
                   </li>)}
                   <li>
                      { isAuth() && isAuth().user.role === 1 && (<Link  className='nav-item-link'  style={isActive(history,"/admin/dashboard")}  to='/admin/dashboard'>Dashboard</Link>) }
                   </li>
                   <li>
                      { isAuth() && isAuth().user.role === 0 && (<Link  className='nav-item-link'  style={isActive(history,"/user/dashboard")}  to='/user/dashboard'>Dashboard</Link>) }
                   </li>
                   {isAuth() && ( <li  className='nav-item' style={{cursor:'pointer',color:'black'}} onClick={()=>{signout(()=>{
                            history.push('/')
                        })}}>
                              Sign out
                        </li>)}
               </ul>
           </nav>
                <button className='nav-btn' onClick={Toggle}>
                        <FaAlignRight />
                    </button>
            </div>
            {/* <div><Search/></div> */}
           

          
            </div>
          
        </>
    )
}

export default withRouter(Header)