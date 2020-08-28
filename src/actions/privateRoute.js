import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuth } from './auth'
const Private = ({component:Component, ...rest}) => {

   return <Route {...rest} render={props => isAuth() ? (<Component {...props}/>) : (<Redirect to={{pathname:'/signin',state:{from:props.location}}}/>)}/>
}
export default Private 