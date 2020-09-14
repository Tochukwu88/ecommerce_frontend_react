import React from 'react'
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
    return (
        <>
       
        <div className='container'>
            <div className='navBar'>
                <div><img className='logo' src={logo} alt='logo'></img></div>

                <div><Search/></div>
                
                <nav>
               

                    <ul>
                        <li>
                            <Link style={isActive(history,"/")} to='/'>Home</Link>
                        </li>
                        <li>
                            <Link style={isActive(history,"/cart")} to='/cart'>cart <sup><small>{totalItem()}</small></sup></Link>
                        </li>
                        <li>
                            <Link style={isActive(history,"/shop")} to='/shop'>Shop</Link>
                        </li>
                        <li>
                            <Link style={isActive(history,"/signup")}  to='/signup'>Sign up</Link>
                        </li>
                        <li>
                            <Link style={isActive(history,"/signin")}  to='/signin'>Sign in</Link>
                        </li>
                        <li>
                           { isAuth() && isAuth().user.role === 1 && (<Link style={isActive(history,"/admin/dashboard")}  to='/admin/dashboard'>Dashboard</Link>) }
                        </li>
                        <li>
                           { isAuth() && isAuth().user.role === 0 && (<Link style={isActive(history,"/user/dashboard")}  to='/user/dashboard'>Dashboard</Link>) }
                        </li>
                        <li  style={{cursor:'pointer',color:'black'}} onClick={()=>{signout(()=>{
                            history.push('/')
                        })}}>
                              Sign out
                        </li>
                    </ul>
                </nav>
            </div>
           

          
            </div>
          
        </>
    )
}

export default withRouter(Header)