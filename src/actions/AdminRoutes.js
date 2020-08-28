import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuth } from './auth'
const AdminPrivate = ({component:Component, ...rest}) => {

   return <Route {...rest} render={props => isAuth().user.role === 1 ? (<Component {...props}/>) : (<Redirect to={{pathname:'/signin',state:{from:props.location}}}/>)}/>
}
export default AdminPrivate 