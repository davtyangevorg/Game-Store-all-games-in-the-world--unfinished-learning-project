import React from 'react'
import BrowseProducts from '../../Features/browseProducts/browseProducts.jsx'
import { connect } from 'react-redux'
import { getProductsThunkCreator} from '../../../redux/browse-reduser.js'
import Loader from '../../../img/svg/loader.svg'

class PlatformsApi extends React.Component{
    
    componentDidMount=()=>{
        this.props.getProducts('platforms')
    }

    render(){
        return(
            <> 
                {this.props.isLoad ? <img alt='name' src={Loader}></img> : <BrowseProducts routeText='platforms' {...this.props} />}
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
const PlatformsContainer=connect(mapStateToProps,mapDispatchToProps)(PlatformsApi)

export default PlatformsContainer