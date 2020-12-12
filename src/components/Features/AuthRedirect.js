import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom'

const AuthRedirect = (Component) => {
    const IsRedirect=()=>{
        const isAuth = useSelector(state => state.auth.isAuth)
        if(!isAuth) return <Redirect to='/login'></Redirect>
        return <Component />
    }
    
    return IsRedirect
}




export default AuthRedirect
