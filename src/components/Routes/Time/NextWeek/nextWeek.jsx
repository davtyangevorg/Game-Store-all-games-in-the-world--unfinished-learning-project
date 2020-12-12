import React from 'react'
import SectionPage from '../../../Features/sectionPage/sectionPage.jsx'

const NextWeek=(props)=>{
    
    let date=getThisWeekDateToString()
    console.log(date)
    return( 
        <div>
            <SectionPage 
                            title='Next week' 
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
    
    // let thisMonth=12
    // let thisDay=21
    // let fullYear=2020

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
    startDay=thisDay+(7-getDay)+1 
    endDay=startDay+7-1                       

    if(endDay>daysInMonth(thisMonth,fullYear)&&startDay<=daysInMonth(thisMonth,fullYear)){
        console.log(1)
        endDay=endDay-daysInMonth(thisMonth,fullYear)
        endMonth=startMonth+1
    }
    if(endDay>daysInMonth(thisMonth,fullYear)&&startDay>daysInMonth(thisMonth,fullYear)){
        console.log(2)
        startDay=startDay-daysInMonth(thisMonth,fullYear)
        endDay=startDay+7-1
        endMonth=startMonth=thisMonth+1
    }
    if(startMonth===12&&startDay<=daysInMonth(thisMonth,fullYear)){
        console.log(3)
        endMonth=1
        endFullYear=startFullYear+1
        endDay=endDay-daysInMonth(thisMonth,fullYear)
    }
    if(startMonth===12&&startDay>daysInMonth(thisMonth,fullYear)){
        console.log(4)
        endMonth=1
        endFullYear=startFullYear+1
        startDay=startDay-daysInMonth(thisMonth,fullYear)
        endDay=startDay+7-1
    }
    // console.log(startFullYear)
    // console.log(endFullYear)
    // console.log(startMonth)
    // console.log(endMonth)
    // console.log(startDay)
    // console.log(endDay)
   
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

export default NextWeek