
import Types from '../types'

const isLoggedReducer = (state=false,action) => {
    switch (action.type) {
        case Types.isLoggedIn:
            
            break;
    
        default:
            return state;
    }
}