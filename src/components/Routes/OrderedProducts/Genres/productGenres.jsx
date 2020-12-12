import React from 'react'
import SectionPage from '../../../Features/sectionPageForBrowse/sectionPageForBrowse.jsx'

const  ProductGenres = (props) => {
    return (
        <div>
            <SectionPage 
                            
                            title={`${props.info.name} Games`} 
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

export default  ProductGenres