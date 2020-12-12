import React from 'react'
import ProductStores from './productStores.jsx'
import { connect } from 'react-redux'
import {getProductsByBrowseStoresThunkCreator, getAgainProductsThunkCreator, clearStateActionCreator} from '../../../../redux/section-reduser.js'
import {getBrowseInfoThunkCreator,clearBrowseStateActionCreator} from '../../../../redux/browse-reduser.js'

class ProductStoresApi extends React.Component{
    
    componentDidMount=()=>{
        console.log('mount')
        console.log(this.props.match)
        this.props.getBrowseInfo('stores',getParamsId(this.props.match.params.stores))
    }
    componentDidUpdate=()=>{
       console.log('ubdate')
    }
    componentWillUnmount=()=>{
        console.log('unmount')
        this.props.clearState()
    }
    render(){
        console.log('render')
        return(
            <ProductStores {...this.props}/>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        info:state.browse.browseInfo,
        isLoad:state.section.isLoad,
        prevHttp:state.section.prevHttp,
        nextHttp:state.section.nextHttp,
        products:state.section.products
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        getProducts:(order,platform,id)=>{
            dispatch(getProductsByBrowseStoresThunkCreator(order,platform,id))
        },
        getAgainProducts:(nextHttp)=>{
            dispatch(getAgainProductsThunkCreator(nextHttp))
        },
        getBrowseInfo:(browseName,id)=>{
            dispatch(getBrowseInfoThunkCreator(browseName,id))
        },
        clearState:()=>{
            dispatch(clearStateActionCreator())
            dispatch(clearBrowseStateActionCreator())
        }
    }
}
const getParamsId=(params)=>{
    
    const arr=[]
    let arr2=[]

    for(let elem of params){
        arr.push(elem)
    }

    const a=arr.findIndex((el,i)=>{
        if(el==='_')
        return i
    })

    arr2=arr.filter((el,i)=>{
            if(i>a){
            return el
        }
        
    })
    return arr2.join('')

}
const ProductStoresContainer=connect(mapStateToProps,mapDispatchToProps)(ProductStoresApi)

export default ProductStoresContainer