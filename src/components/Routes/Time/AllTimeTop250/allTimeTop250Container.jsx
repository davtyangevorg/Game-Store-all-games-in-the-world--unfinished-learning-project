import AllTimeTop250 from './allTimeTop250.jsx'
import { connect } from 'react-redux'
import { getTop250ProductsThunkCreator, getAgainProductsThunkCreator } from '../../../../redux/section-reduser.js'



const mapStateToProps = (state) => {
    return {
        products: state.section.products,
        isLoad: state.section.isLoad,
        count: state.section.count,
        nextHttp: state.section.nextHttp,
        prevHttp: state.section.prevHttp
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getTop250Products: (order, platform) => {
            dispatch(getTop250ProductsThunkCreator(order, platform))
        },
        getAgainProducts: (nextHttp) => {
            dispatch(getAgainProductsThunkCreator(nextHttp))
        }
    }
}

const AllTimeTop250Container = connect(mapStateToProps, mapDispatchToProps)(AllTimeTop250)
export default AllTimeTop250Container