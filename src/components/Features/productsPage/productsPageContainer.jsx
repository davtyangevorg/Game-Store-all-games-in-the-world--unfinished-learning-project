import ProductsPage from './productsPage.jsx'
import { connect } from 'react-redux'
import {getProductsThunkCreator, isPlayActionCreator,isPlayFalseActionCreator } from '../../../redux/section-reduser.js'

const mapStateToProps=(state)=>{
    return{
        products:state.section.products
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        change:(id)=>{
            dispatch(isPlayActionCreator(id))
        },
        changeFalse:(id)=>{
            dispatch(isPlayFalseActionCreator(id))
        },
        getProducts:(order,platform,date)=>{
            dispatch(getProductsThunkCreator(order,platform,date))
        }
    }
}

const ProductsPageContainer=connect(mapStateToProps,mapDispatchToProps)(ProductsPage)

export default ProductsPageContainer