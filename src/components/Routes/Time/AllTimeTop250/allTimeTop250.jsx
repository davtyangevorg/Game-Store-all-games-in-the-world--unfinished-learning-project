import React,{useState} from 'react'
import SectionPage from '../../../Features/sectionPage/sectionPage.jsx'

const AllTimeTop250=(props)=>{
    const [isOrder]=useState(true)
    return( 
        <div>
            <SectionPage 
                            title={`All Time Top 250`} 
                            text=''
                            isOrder={isOrder}
                            count={props.count}
                            isLoad={props.isLoad}
                            prevHttp={props.prevHttp}
                            nextHttp={props.nextHttp}
                            products={props.products}
                            getProducts={props.getTop250Products}
                            getAgainProducts={props.getAgainProducts}
            />
                            
        </div>
    )
}



export default AllTimeTop250