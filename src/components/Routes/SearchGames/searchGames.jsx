import React from 'react'
import { connect } from 'react-redux'
// import style from './searchGames.module.scss'
import ProductsPage from '../../Features/productsPage/productsPageContainer.jsx'
import { playActionCreator, notPlayActionCreator } from '../../../redux/section-reduser.js'

const SearchGames = (props) => {
    return (
        <div>
            <ProductsPage
                getAgainProducts={props.getAgainProducts}
                products={props.products} />
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        products: state.section.products
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        play: (id) => {
            dispatch(playActionCreator(id))
        },
        notPlay: (id) => {
            dispatch(notPlayActionCreator(id))
        }
    }
}

const SearchGamesContainer = connect(mapStateToProps, mapDispatchToProps)(SearchGames)
export default SearchGamesContainer
