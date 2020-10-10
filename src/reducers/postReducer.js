import { ACTION_TYPES } from "../actions/PostActions"

const initialState = {
    list:[]
}


export const posts = (state=initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list:[...action.payload]
            }
    
        default:
            return state;
    }
}