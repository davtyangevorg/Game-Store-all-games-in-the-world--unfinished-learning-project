import React from 'react'
import BrowseProducts from '../../Features/browseProducts/browseProducts.jsx'
import { connect } from 'react-redux'
import { getProductsThunkCreator} from '../../../redux/browse-reduser.js'
import Loader from '../../../img/svg/loader.svg'

class StoresApi extends React.Component{
    
    componentDidMount=()=>{
        this.props.getProducts('stores')
    }

    render(){
        return(
            <> 
                {this.props.isLoad ? <img alt='name' src={Loader}></img> : <BrowseProducts routeText='stores' {...this.props} />}
            </>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        products:state.browse.products,
        isLoad:state.browse.isLoad
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        getProducts:(requestElement)=>{
            dispatch(getProductsThunkCreator(requestElement))
        }
        
    }
}
const StoresContainer=connect(mapStateToProps,mapDispatchToProps)(StoresApi)

export default StoresContainer