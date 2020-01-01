import { SET_CLIENT_INFO } from '../constans/actionTypes';

export default (state = {
    ip: "",
    country: "",
    isp: ""
}, action) => {
    switch (action.type) {
        case SET_CLIENT_INFO:
            return {
                ip: action.value.ip,
                country: action.value.country,
                isp: action.value.isp
            };
        default:
            return state;
    }
}