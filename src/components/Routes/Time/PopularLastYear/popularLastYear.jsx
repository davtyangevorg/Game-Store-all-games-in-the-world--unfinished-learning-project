import React from 'react'
import SectionPage from '../../../Features/sectionPage/sectionPage.jsx'

const PopularLastYear = (props) => {
    let newDate = new Date()
    let Year = newDate.getFullYear() - 1
    let date = Year + '-01-01,' + Year + '-12-31'
    console.log(date)
    return (
        <div>
            <SectionPage
                title={`Popular in ${Year}`}
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



export default PopularLastYear