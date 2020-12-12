import React from 'react'
import SectionPage from '../../../Features/sectionPageForBrowse/sectionPageForBrowse.jsx'

const  ProductPublishers = (props) => {
    console.log(props.info)
    return (
        <div>
            <SectionPage 
                            
                            title={`Published by ${props.info.name} `} 
                            text={props.info.description}
                            browseInfo={props.info}
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

export default  ProductPublishers