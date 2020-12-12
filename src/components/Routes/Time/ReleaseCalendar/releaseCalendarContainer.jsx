import React from 'react'
import ReleaseCalendar from './releaseCalendar.jsx'
import {connect} from 'react-redux'
import { getProductsThunkCreator, getAgainProductsThunkCreator} from '../../../../redux/section-reduser.js'
import { ThisMonthContext } from '../../../../context.js';


class ReleaseCalendarApi extends React.Component{

    daysInMonth(month, year){
        return new Date(year, month, 0).getDate();
    }
    
    
    componentDidUpdate(prevProps,prevState){
        console.log('componentDidUpdate')
        if(prevProps.match.params.month!==this.props.match.params.month){
            let newDate=new Date()
            let year=newDate.getFullYear()
            let date=year+'-'+this.props.match.params.month+'-01,'+year+'-'+this.props.match.params.month+'-'+this.daysInMonth(this.props.match.params.month,year)
            this.props.getProducts(this.props.order,this.props.platform,date,this.props.match.params.month)
        }
    }

    render(){
        return(
            <ReleaseCalendar {...this.props}/>
        )
    }
}
ReleaseCalendarApi.contextType = ThisMonthContext;

const mapStateToProps=(state)=>{
    return{
        products:state.section.products,
        isLoad:state.section.isLoad,
        count:state.section.count,
        nextHttp:state.section.nextHttp,
        prevHttp:state.section.prevHttp,
        order:state.section.order,
        platform:state.section.platform
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        getProducts:(order,platform,date,month)=>{
            dispatch(getProductsThunkCreator(order,platform,date,month))
        },
        getAgainProducts:(nextHttp)=>{
            dispatch(getAgainProductsThunkCreator(nextHttp))
        }
    }
}

const ReleaseCalendarContainer=connect(mapStateToProps,mapDispatchToProps)(ReleaseCalendarApi)
export default ReleaseCalendarContainer