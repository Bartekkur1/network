import { LOGIN, LOGOUT } from '../constans/actionTypes';

export default (state = {
    authorized: false,
    jwtToken: "",
}, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                authorized: true,
                jwtToken: action.jwtToken,
            }
        case LOGOUT:
            localStorage.removeItem('auth');
            return {
                authorized: false,
                jwtToken: "",
            }
        default:
            return state
    }
}