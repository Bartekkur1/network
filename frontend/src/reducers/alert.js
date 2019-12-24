import { SHOW_ALERT, HIDE_ALERT } from '../constans/actionTypes';

export default (state = {
    display: false,
    alertType: "warning",
    message: ""
}, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                display: true,
                message: action.message,
                alertType: action.alertType
            };
        case HIDE_ALERT:
            return {
                display: false,
                message: action.message,
                alertType: action.alertType
            };
        default:
            return state;
    }
}