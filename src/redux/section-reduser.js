import axios from 'axios'

const GET_PRODUCTS = 'my-app/section/GET_PRODUCTS'
const CHANGE_ISLOAD = 'my-app/section/CHANGE_ISLOAD'
const GET_AGAIN_PRODUCTS = 'my-app/section/GET_AGAIN_PRODUCTS'
const CHANGE_TRUE = 'my-app/section/CHANGE_TRUE'
const CHANGE_FALSE = 'my-app/section/CHANGE_FALSE'
const GET_PRODUCTS_BY_BROWSE = 'my-app/section/GET_PRODUCTS_BY_BROWSE'
const CLEAR_STATE = 'my-app/section/CLEAR_STATE'
const SET_IS_LEFT_SIDBAR_SHOW = 'my-app/section/SET_IS_LEFT_SIDBAR_SHOW'

let date = new Date()
let month = (date.getMonth() + 1).toString()
if (month.length === 1) {
    month = 0 + month
}

const initalState = {
    products: [],
    isLoad: false,
    count: null,
    nextHttp: '',
    prevHttp: '',
    order: null,
    platform: null,
    month: month,
    date: null,
    isModal: false,
    isLeftSidbarShow: false
}
const secionReduser = (state = initalState, action) => {
    switch (action.type) {
        case GET_PRODUCTS: {
            for (let product of action.products) {
                product.isPlay = false
            }
            return {
                ...state,
                products: action.products,
                isLoad: false,
                count: action.count,
                nextHttp: action.nextHttp,
                prevHttp: action.prevHttp,
                order: action.order,
                platform: action.platform,
                month: action.month,
                date: action.date
            }
        }
        case GET_PRODUCTS_BY_BROWSE: {
            for (let product of action.products) {
                product.isPlay = false
            }
            return {
                ...state,
                products: action.products,
                isLoad: false,
                nextHttp: action.nextHttp,
                prevHttp: action.prevHttp
            }
        }
        case CHANGE_TRUE: {
            for (let product of state.products) {
                if (product.id === action.id) {
                    if (product.isPlay === false) {
                        product.isPlay = true
                    } else {
                        product.isPlay = false
                    }
                }
            }

            let newProducts = state.products
            return {
                ...state,
                products: [...newProducts]
            }
        }
        case CHANGE_FALSE: {
            for (let product of state.products) {
                product.isPlay = false
            }
            let newProducts = state.products
            return {
                ...state,
                products: [...newProducts]
            }
        }
        case GET_AGAIN_PRODUCTS: {
            for (let product of action.products) {
                product.isPlay = false
            }
            return {
                ...state,
                products: action.products,
                isLoad: false,
                nextHttp: action.nextHttp,
                prevHttp: action.prevHttp
            }
        }
        case CHANGE_ISLOAD: {
            return {
                ...state,
                isLoad: action.bool
            }
        }
        case CLEAR_STATE: {
            return {
                ...state,
                products: []
            }
        }
        case SET_IS_LEFT_SIDBAR_SHOW: {
            return {
                ...state,
                isLeftSidbarShow: action.trueOrFalse
            }
        }
        default: {
            return state
        }
    }
}
export const setIsLeftSidbarShowActionCreator = (trueOrFalse) => {
    return {
        type: SET_IS_LEFT_SIDBAR_SHOW, trueOrFalse: trueOrFalse
    }
}
export const clearStateActionCreator = () => {
    return {
        type: CLEAR_STATE
    }
}
export const playActionCreator = (id) => {
    return {
        type: CHANGE_TRUE, id: id
    }
}
export const notPlayActionCreator = (id) => {
    return {
        type: CHANGE_FALSE, id: id
    }
}
export const changeIsLoadActionCreator = (bool) => {
    return {
        type: CHANGE_ISLOAD, bool: bool
    }
}
export const getProductsActionCreator = (products, nextHttp, prevHttp, order, platform, month, date) => {
    return {
        type: GET_PRODUCTS, products: products, nextHttp: nextHttp, prevHttp: prevHttp, order: order, platform: platform, month: month, date: date
    }
}
export const getAgainProductsActionCreator = (products, nextHttp, prevHttp) => {
    return {
        type: GET_AGAIN_PRODUCTS, products: products, nextHttp: nextHttp, prevHttp: prevHttp
    }
}
export const getProductsByBrowseActionCreator = (products, nextHttp, prevHttp) => {
    return {
        type: GET_PRODUCTS_BY_BROWSE, products: products, nextHttp: nextHttp, prevHttp: prevHttp
    }
}
//name -added 
//&dates=2020-01-01,2021-12-31
export const getSearchGamesThunkCreator = (gameName) => {
    return (
        (dispatch) => {
            axios.get(`https://api.rawg.io/api/games?search=${gameName}`).then((response) => {
                dispatch(getProductsActionCreator(response.data.results, response.data.next, response.data.previous))
            })
        }
    )
}
export const getProductsThunkCreator = (order, platform, date, month) => {
    return (
        (dispatch) => {
            dispatch(changeIsLoadActionCreator(true))
            axios.get(`https://api.rawg.io/api/games?page=1&dates=${date}&${platform ? `parent_platforms=${platform} ` : ''}&ordering=${order}`).then(res => {
                dispatch(getProductsActionCreator(res.data.results, res.data.count, res.data.next, res.data.previous, order, platform, month, date))
            })
        }
    )
}
export const getProductsByBrowsePlatformsThunkCreator = (order, platform, id) => {
    if (id) {
        platform = null
    }
    return (
        (dispatch) => {
            dispatch(changeIsLoadActionCreator(true))
            axios.get(`https://api.rawg.io/api/games?page=1&${platform ? `parent_platforms=${platform} ` : ''}&${id ? `platforms=${id}` : ''}&ordering=${order}`).then(res => {
                dispatch(getProductsByBrowseActionCreator(res.data.results, res.data.next, res.data.previous))
            })
        }
    )
}
export const getProductsByBrowseStoresThunkCreator = (order, platform, id) => {
    return (
        (dispatch) => {
            dispatch(changeIsLoadActionCreator(true))
            axios.get(`https://api.rawg.io/api/games?page=1&${platform ? `parent_platforms=${platform} ` : ''}&${id ? `stores=${id}` : ''}&ordering=${order}`).then(res => {
                dispatch(getProductsByBrowseActionCreator(res.data.results, res.data.next, res.data.previous))
            })
        }
    )
}
export const getProductsByBrowseGenresThunkCreator = (order, platform, id) => {
    return (
        (dispatch) => {
            dispatch(changeIsLoadActionCreator(true))
            axios.get(`https://api.rawg.io/api/games?page=1&${platform ? `parent_platforms=${platform} ` : ''}&${id ? `genres=${id}` : ''}&ordering=${order}`).then(res => {
                dispatch(getProductsByBrowseActionCreator(res.data.results, res.data.next, res.data.previous))
            })
        }
    )
}
export const getProductsByBrowseTagsThunkCreator = (order, platform, id) => {
    return (
        (dispatch) => {
            dispatch(changeIsLoadActionCreator(true))
            axios.get(`https://api.rawg.io/api/games?page=1&${platform ? `parent_platforms=${platform} ` : ''}&${id ? `tags=${id}` : ''}&ordering=${order}`).then(res => {
                dispatch(getProductsByBrowseActionCreator(res.data.results, res.data.next, res.data.previous))
            })
        }
    )
}
export const getProductsByBrowseDevelopersThunkCreator = (order, platform, id) => {
    return (
        (dispatch) => {
            dispatch(changeIsLoadActionCreator(true))
            axios.get(`https://api.rawg.io/api/games?page=1&${platform ? `parent_platforms=${platform} ` : ''}&${id ? `developers=${id}` : ''}&ordering=${order}`).then(res => {
                dispatch(getProductsByBrowseActionCreator(res.data.results, res.data.next, res.data.previous))
            })
        }
    )
}
export const getProductsByBrowsePublishersThunkCreator = (order, platform, id) => {
    return (
        (dispatch) => {
            dispatch(changeIsLoadActionCreator(true))
            axios.get(`https://api.rawg.io/api/games?page=1&${platform ? `parent_platforms=${platform} ` : ''}&${id ? `publishers=${id}` : ''}&ordering=${order}`).then(res => {
                dispatch(getProductsByBrowseActionCreator(res.data.results, res.data.next, res.data.previous))
            })
        }
    )
}
export const getProductsByBrowseCreatorsThunkCreator = (order, platform, id) => {
    return (
        (dispatch) => {
            dispatch(changeIsLoadActionCreator(true))
            axios.get(`https://api.rawg.io/api/games?page=1&${platform ? `parent_platforms=${platform} ` : ''}&${id ? `creators=${id}` : ''}&ordering=${order}`).then(res => {
                dispatch(getProductsByBrowseActionCreator(res.data.results, res.data.next, res.data.previous))
            })
        }
    )
}


export const getAgainProductsThunkCreator = (nextHttp) => {
    return (
        (dispatch) => {
            dispatch(changeIsLoadActionCreator(true))
            axios.get(nextHttp).then(res => {
                dispatch(getAgainProductsActionCreator(res.data.results, res.data.next, res.data.previous))
            })
        }
    )
}
export const getTop250ProductsThunkCreator = (order, platform) => {
    return (
        (dispatch) => {
            dispatch(changeIsLoadActionCreator(true))
            axios.get(` https://rawg.io/api/games/lists/popular?discover=true&page=1&page_size=20&${platform ? `parent_platforms=${platform} ` : ''}`).then(res => {
                dispatch(getProductsActionCreator(res.data.results, res.data.count, res.data.next, res.data.previous, order, platform, month))
            })
        }
    )
}
//https://rawg.io/api/games/lists/popular?discover=true&page=1&parent_platforms=5
export default secionReduser