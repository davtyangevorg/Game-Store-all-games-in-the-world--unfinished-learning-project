import React,{useState} from 'react'
import SectionPage from '../../../Features/sectionPage/sectionPage.jsx'


const ReleaseCalendar=(props)=>{
    

    const monthNames=['January ','February','March','April','May','June','July','August','September','October','November','December']
    let clickedMonth=props.match.params.month
    const [isTrue]=useState(true)
    
    
    let newDate=new Date()
    let year=newDate.getFullYear()
    let date=year+'-'+clickedMonth+'-01,'+year+'-'+clickedMonth+'-'+daysInMonth(clickedMonth,year)
    
    const getThisMonthName=()=>{
        if(clickedMonth<10){
            clickedMonth=clickedMonth[1]
        }
        let name=monthNames.find((el,i)=>{
            return i===clickedMonth-1
        })
        return name
    }
    let monthName=getThisMonthName()
    return( 
        <div>
            <SectionPage    //month={month}
                           // year={year}
                            date={date}
                            isTrue={isTrue}
                            title={`Release calendar - ${monthName} ${year}`} 
                            text=''
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

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

export default ReleaseCalendar