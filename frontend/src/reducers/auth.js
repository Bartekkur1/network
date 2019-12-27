import { LOGIN, LOGOUT } from '../constans/actionTypes';

export default (state = {
    authorized: false,
    token: "",
}, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                authorized: true,
                token: action.token,
            }
        case LOGOUT:
            localStorage.removeItem('auth');
            return {
                authorized: false,
                token: "",
            }
        default:
            return state
    }
}