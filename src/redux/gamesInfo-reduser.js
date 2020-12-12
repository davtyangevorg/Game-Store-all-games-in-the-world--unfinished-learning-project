import axios from 'axios'

const GET_GAMES_INFO='my-app/gamesInfo/GET_GAMES_INFO'
const GET_SEARCH_RESULTS='my-app/gamesInfo/GET_SEARCH_RESULTS'

const initalState={
    gameInfo:null,
    backgroundImg:null,
    searchResult:[]
}

const gamesInfoReduser=(state=initalState,action)=>{
    switch(action.type){
        case GET_GAMES_INFO:{
            return{
                ...state,
                gameInfo:action.info,
                backgroundImg:action.info.background_image
            }
        }
        case GET_SEARCH_RESULTS:{
            return{
                ...state,
                searchResult:action.result
            }
        }
        default:{
            return state
        }
    }
}

export const getGamesInfoActionCreator=(info)=>{
    return{
        type:GET_GAMES_INFO,info:info
    }
}
export const getSearchResultsActionCreator=(result)=>{
    return{
        type:GET_SEARCH_RESULTS,result:result
    }
}
export const getGamesInfoThunkCreator=(id)=>{
    return(
        (dispatch)=>{
            axios.get(`https://api.rawg.io/api/games/${id}`).then((response)=>{
                dispatch(getGamesInfoActionCreator(response.data))
            })
        }
    )
}
export const getSearchResultsThunkCreator=(search)=>{
    return(
        (dispatch)=>{
            axios.get(`https://api.rawg.io/api/games?search=${search}`).then((response)=>{
                dispatch(getSearchResultsActionCreator(response.data.results))
            })
        }
    )
}

export default gamesInfoReduser