const AUTHENTICATION='my-app/auth/AUTHENTICATION'
const LOG_OUT='my-app/auth/LOG_OUT'

const initalState={
    isAuth:false,
    userName:null
}

const authReduser=(state=initalState,action)=>{
    switch(action.type){
        case AUTHENTICATION :{
            return{
                ...state,
                isAuth:true,
                userName:action.userName
            }
        }
        case LOG_OUT:{
            return{
                ...state,
                isAuth:false,
                userName:null
            }
        }
        default:{
            return state
        }
    }
}

export const authenticationActionCreator=(userName)=>{
    return{
        type:AUTHENTICATION,userName:userName
    }
}
export const logOutActionCreator=()=>{
    return{
        type:LOG_OUT
    }
}

export default authReduser