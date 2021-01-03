import ProductsPage from './productsPage.jsx'
import { connect } from 'react-redux'
import { getProductsThunkCreator, playActionCreator, notPlayActionCreator } from '../../../redux/section-reduser.js'

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
        },
        getProducts: (order, platform, date) => {
            dispatch(getProductsThunkCreator(order, platform, date))
        }
    }
}

const ProductsPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsPage)

export default ProductsPageContainer