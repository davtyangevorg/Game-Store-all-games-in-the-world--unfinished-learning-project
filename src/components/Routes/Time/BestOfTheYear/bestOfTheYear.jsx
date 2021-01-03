import React from 'react'
import SectionPage from '../../../Features/sectionPage/sectionPage.jsx'

const BestOfTheYear = (props) => {
    let newDate = new Date()
    let date = newDate.getFullYear() + '-01-01,' + newDate.getFullYear() + '-12-31'
    console.log(date)
    return (
        <div>
            <SectionPage
                title='Best of the year'
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



export default BestOfTheYear