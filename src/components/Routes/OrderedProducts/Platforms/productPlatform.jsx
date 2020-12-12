import React from 'react'
import SectionPage from '../../../Features/sectionPageForBrowse/sectionPageForBrowse.jsx'

const  ProductPlatform = (props) => {
    
    return (
        <div>
            <SectionPage 
                            
                            title={`Games for ${props.info.name}`} 
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

export default  ProductPlatform
