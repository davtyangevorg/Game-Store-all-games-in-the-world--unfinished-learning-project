import React,{useEffect} from 'react'
import { connect } from 'react-redux'
// import style from './searchGames.module.scss'
import ProductsPage from '../../Features/productsPage/productsPageContainer.jsx'
import {isPlayActionCreator,isPlayFalseActionCreator,getAgainProductsThunkCreator} from '../../../redux/section-reduser.js'

const SearchGames=(props)=>{
    return(
        <div>
            <ProductsPage 
                            getAgainProducts={props.getAgainProducts} 
                            products={props.products} />
        </div>
    )
    
}

const mapStateToProps=(state)=>{
    return{
        products:state.section.products,
        // nextHttp:state.section.nextHttp,
        // prevHttp:state.section.prevHttp
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        // getAgainProducts:(Http)=>{
        //     dispatch(getAgainProductsThunkCreator(Http))
        // },
        change:(id)=>{
            dispatch(isPlayActionCreator(id))
        },
        changeFalse:(id)=>{
            dispatch(isPlayFalseActionCreator(id))
        }
    }
}

const SearchGamesContainer=connect(mapStateToProps,mapDispatchToProps)(SearchGames)
export default SearchGamesContainer
