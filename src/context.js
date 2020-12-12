import React from 'react'

let date=new Date()
let month=(date.getMonth()+1).toString()
    if(month.length===1){
        month=0+month
    }
export const ThisMonthContext=React.createContext(month)
export const IsModalContext=React.createContext(null)
export const YouTubeVideoUrlContext=React.createContext(null)
export const IsSignInBackgroundImageContext=React.createContext(null)