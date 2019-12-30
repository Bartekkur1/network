import { SET_BEST_SERVER } from '../constans/actionTypes';

export default (state = {
    id: "",
    url: "",
    lat: "",
    lon: "",
    name: "",
    country: "",
    host: "",
    bestPing: 0
}, action) => {
    switch (action.type) {
        case SET_BEST_SERVER:
            return {
                ...action.value
            }
        default:
            return state
    }
}