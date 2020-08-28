import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuth } from '../../actions/auth'


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
            <div className='header'>
                <nav>
                <div>Logo</div>

                    <ul>
                        <li>
                            <Link style={isActive(history,"/")} to='/'>Home</Link>
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
        </>
    )
}

export default withRouter(Header)