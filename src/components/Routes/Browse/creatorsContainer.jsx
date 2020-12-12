import React from 'react'
import BrowseProducts from '../../Features/browseProducts/browseProducts.jsx'
import { connect } from 'react-redux'
import { getProductsThunkCreator,getAgainProductsThunkCreator} from '../../../redux/browse-reduser.js'
import Loader from '../../../img/svg/loader.svg'

class CreatorsApi extends React.Component{
    
    componentDidMount=()=>{
        this.props.getProducts('creators')
    }

    render(){
        return(
            <> 
                {this.props.isLoad ? <img alt='name' src={Loader}></img> : <BrowseProducts routeText='creators' {...this.props} />}
            </>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        products:state.browse.products,
        isLoad:state.browse.isLoad,
        nextHttp:state.browse.nextHttp,
        prevHttp:state.browse.prevHttp
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        getProducts:(requestElement)=>{
            dispatch(getProductsThunkCreator(requestElement))
        },
        getAgainProducts:(Http)=>{
            dispatch(getAgainProductsThunkCreator(Http))
        }
        
    }
}
const CreatorsContainer=connect(mapStateToProps,mapDispatchToProps)(CreatorsApi)

export default CreatorsContainer