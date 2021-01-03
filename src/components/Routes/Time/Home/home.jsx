import React from 'react'
import SectionPage from '../../../Features/sectionPage/sectionPage.jsx'

const Home = (props) => {

    let date = '2020-01-01,2020-12-31' //getThisYearStartDateToThisMomentToString()
    return (
        <div>
            <SectionPage
                title='New and trending'
                text='Based on player counts and release date'
                date={date}
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

export default Home



// const getThisYearStartDateToThisMomentToString = () => {
//     let newDate = new Date()
//     let thisDay = newDate.getDate().toString()
//     let thisMonth = (newDate.getMonth() + 1).toString()

//     if (thisDay.length === 1) {
//         thisDay = 0 + thisDay
//     }
//     if (thisMonth.length === 1) {
//         thisMonth = 0 + thisMonth
//     }
//     return newDate.getFullYear() + '-01-01,' + newDate.getFullYear() + '-' + thisMonth + '-' + thisDay
// }
//--------------------------------------------------jamanaki pahov----------------------------------------------------------