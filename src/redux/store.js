import sectionReduser from './section-reduser.js'
import browseReduser from './browse-reduser.js'
import authReduser from './auth-reduser.js'
import gamesInfoReduser from './gamesInfo-reduser.js'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
const { createStore, combineReducers, applyMiddleware } = require("redux");

let redusers=combineReducers({
    section:sectionReduser,
    browse:browseReduser,
    auth:authReduser,
    gamesInfo:gamesInfoReduser,
    form:formReducer
})
const store=createStore(redusers,applyMiddleware(thunk))

export default store