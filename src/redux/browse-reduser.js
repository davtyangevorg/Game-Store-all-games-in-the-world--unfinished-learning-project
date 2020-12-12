import axios from "axios"

const GET_PRODUCTS='my-app/browse/GET_PRODUCTS'
const CHANGE_IS_LOAD='my-app/browse/CHANGE_IS_LOAD'
const BROWSE_INFO='my-app/browse/BROWSE_INFO'
const CLEAR_STATE='my-app/browse/CLEAR_STATE'
const GET_AGAIN_PRODUCTS='my-app/browse/GET_AGAIN_PRODUCTS'

const initalState={
    products:[],
    nextHttp:null,
    prevHttp:null,
    isLoad:false,
    browseInfo:[],
    creatorBackgroundImage:null
}

const browseReduser=(state=initalState,action)=>{
    switch(action.type){
        case GET_PRODUCTS :{
            return{
                ...state,
                products:action.products,
                isLoad:false,
                nextHttp:action.nextHttp,
                prevHttp:action.prevHttp
            }
        }
        case GET_AGAIN_PRODUCTS :{
            return{
                ...state,
                products:action.products,
                isLoad:false,
                nextHttp:action.nextHttp,
                prevHttp:action.prevHttp
            }
        }
        case CHANGE_IS_LOAD:{
            return {
                ...state,
                isLoad:action.is
            }
        }
        case BROWSE_INFO:{
            return{
                ...state,
                browseInfo:action.info,
                creatorBackgroundImage:action.info.image_background
            }
        }
        case CLEAR_STATE:{
            return{
                ...state,
                platformInfo:[]
            }
        }
        default:{
            return state
        }
    }
}
export const clearBrowseStateActionCreator=()=>{
    return{
        type:CLEAR_STATE
    }
}
export const getProductsActionCreator=(products,next,prev)=>{
    return{
        type:GET_PRODUCTS,products:products,nextHttp:next,prevHttp:prev
    }
}
export const getAgainProductsActionCreator=(products,nextHttp,prevHttp)=>{
    return{
        type:GET_AGAIN_PRODUCTS,products:products,nextHttp:nextHttp,prevHttp:prevHttp
    }
}
export const changeIsLoad=(is)=>{
    return{
        type:CHANGE_IS_LOAD,is:is
    }
}
export const getBrowseInfoActionCreator=(info)=>{
    return{
        type:BROWSE_INFO,info:info
    }
}
export const getProductsThunkCreator=(requestElement)=>{
    return(
        dispatch=>{
            dispatch(changeIsLoad(true))
            axios.get(`https://api.rawg.io/api/${requestElement}?page=1&page_size=40`).then((response)=>{
                dispatch(getProductsActionCreator(response.data.results,response.data.next,response.data.previous))

            })
        }
    )
}
export const getAgainProductsThunkCreator=(nextHttp)=>{
    return(
        (dispatch)=>{
            dispatch(changeIsLoad(true))  
            axios.get(nextHttp).then(res=>{
                dispatch(getAgainProductsActionCreator(res.data.results,res.data.next,res.data.previous))
            })
        }
    )
}
export const getBrowseInfoThunkCreator=(browseName,id)=>{
    return(
        dispatch=>{
            axios.get(`https://api.rawg.io/api/${browseName}/${id}`).then((response)=>{
                dispatch(getBrowseInfoActionCreator(response.data))

            })
        }
    )
}

export default browseReduser