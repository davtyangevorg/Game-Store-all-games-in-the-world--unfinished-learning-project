import React from 'react'
import SectionPage from '../../../Features/sectionPage/sectionPage.jsx'

const LastMonth = (props) => {

    let date = getLast30DateToThisMomentToString()
    console.log(date)
    return (
        <div>
            <SectionPage
                title='Last 30 days'
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

const getLast30DateToThisMomentToString = () => {
    let newDate = new Date()
    let thisDay = newDate.getDate()
    let thisMonth = (newDate.getMonth() + 1)
    let fullYear = newDate.getFullYear()

    let startDay
    let endDay
    let startMonth = thisMonth
    let endMonth = thisMonth
    let startFullYear = fullYear
    let endFullYear = fullYear
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    if (thisDay === 31) {
        startDay = 1
        endDay = 30
    }
    if (thisDay - 30 <= 0) {
        startMonth = (startMonth - 1)
        startDay = (daysInMonth(startMonth, fullYear) - (30 - thisDay))
        endDay = thisDay - 1
        if (endDay === 0) {
            endDay = daysInMonth(startMonth, fullYear)
            endMonth = startMonth
        }
    }
    if (thisMonth === 1 && thisDay < 31) {
        startFullYear = (fullYear - 1)
        startMonth = 12
        endMonth = 1
        startDay = (daysInMonth(startMonth, startFullYear) - (30 - thisDay))
        endDay = thisDay - 1
        if (endDay === 0) {
            endDay = daysInMonth(startMonth, startFullYear)
            endMonth = 12
            endFullYear = startFullYear
        }
    }
    startDay = startDay.toString()
    endDay = endDay.toString()
    startMonth = startMonth.toString()
    endMonth = endMonth.toString()


    if (startDay.length === 1) {
        startDay = 0 + startDay
    }
    if (endDay.length === 1) {
        endDay = 0 + endDay
    }
    if (endMonth.length === 1) {
        endMonth = 0 + endMonth
    }
    if (startMonth.length === 1) {
        startMonth = 0 + startMonth
    }

    return startFullYear + '-' + startMonth + '-' + startDay + ',' + endFullYear + '-' + endMonth + '-' + endDay
}

export default LastMonth