import { SHOW_LOADING, HIDE_LOADING } from '../constans/actionTypes';

export default (state = false, action) => {
    switch (action.type) {
        case SHOW_LOADING:
            return true
        case HIDE_LOADING:
            return false
        default:
            return state
    }
}