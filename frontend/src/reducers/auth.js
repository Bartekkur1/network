import { LOGIN, LOGOUT } from '../constans/actionTypes';

export default (state = {
    authorized: false,
    jwtToken: "",
    userId: ""
}, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                authorized: true,
                jwtToken: action.jwtToken,
                userId: action.userId
            }
        case LOGOUT:
            localStorage.removeItem('auth');
            return {
                authorized: false,
                jwtToken: "",
                userId: ""
            }
        default:
            return state
    }
}