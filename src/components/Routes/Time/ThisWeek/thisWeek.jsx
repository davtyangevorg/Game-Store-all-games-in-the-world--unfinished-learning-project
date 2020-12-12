import React from 'react'
import SectionPage from '../../../Features/sectionPage/sectionPage.jsx'

const ThisWeek=(props)=>{
    
    let date=getThisWeekDateToString()
    console.log(date)
    return( 
        <div>
            <SectionPage 
                            title='This week' 
                            text=''
                            date={date} 
                            count={props.count}
                            isLoad={props.isLoad}
                            prevHttp={props.prevHttp}
                            nextHttp={props.nextHttp}
                            products={props.products}
                            getProducts={props.getProducts}
                            getAgainProducts={props.getAgainProducts}
            />
                            
        </div>
    )
}

const getThisWeekDateToString=()=>{
    let newDate=new Date()
    let thisDay=newDate.getDate()
    let thisMonth=(newDate.getMonth()+1)
    let fullYear=newDate.getFullYear()

    let startDay
    let endDay
    let startMonth=thisMonth
    let endMonth=thisMonth
    let startFullYear=fullYear
    let endFullYear=fullYear
    let getDay=newDate.getDay()
    if(getDay===0){
        getDay=7
    }
    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    startDay=thisDay-getDay+1//-4
    endDay=startDay+6          
    if(endDay>daysInMonth(thisMonth,fullYear)){
        endMonth=thisMonth+1
        endDay=endDay-daysInMonth(thisMonth,fullYear)
    }
    if(startDay<0){
        startMonth=thisMonth-1
        startDay=daysInMonth(startMonth,fullYear)+startDay
    }
    if(thisMonth===12&&endDay>daysInMonth(thisMonth,fullYear)){
        endMonth=1
        endFullYear=fullYear+1
        endDay=endDay-daysInMonth(thisMonth,fullYear)
    }
    if(thisMonth===1&&endDay-7<0){
        startMonth=12
        startFullYear=fullYear-1
        startDay=daysInMonth(startMonth,startFullYear)+startDay
    }
    startDay=startDay.toString()
    endDay=endDay.toString()
    startMonth=startMonth.toString()
    endMonth=endMonth.toString()
    
  
    if(startDay.length===1){
        startDay=0+startDay
    }
    if(endDay.length===1){
        endDay=0+endDay
    }
    if(startMonth.length===1){
        startMonth=0+startMonth
    } 
    if(endMonth.length===1){
        endMonth=0+endMonth
    } 
    
    return startFullYear+'-'+startMonth+'-'+startDay+','+endFullYear+'-'+endMonth+'-'+endDay
}

export default ThisWeek