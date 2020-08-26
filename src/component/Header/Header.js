import React from 'react'
import {Link, withRouter} from 'react-router-dom'

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
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default withRouter(Header)