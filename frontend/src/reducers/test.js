import { DOWNLOAD_TEST_PROGRESS, UPLOAD_TEST_PROGRESS, 
    RESET_TEST, RESULT, UPLOAD_SPEED_PROGRESS, 
    DOWNLOAD_SPEED_PROGRESS, 
    SET_STATUS,
    SET_RESULTS,
    ADD_RESULT} from '../constans/actionTypes';

export default (state = {
    uploadProgress: 0,
    downloadProgress: 0,
    download: 0,
    upload: 0,
    state: null,
    results: []
}, action) => {
    switch (action.type) {
        case DOWNLOAD_TEST_PROGRESS:
            return {
                ...state,
                downloadProgress: action.value
            }
        case UPLOAD_TEST_PROGRESS:
            return {
                ...state,
                uploadProgress: action.value
            }
        case RESET_TEST:
            return {
                ...state,
                uploadProgress: 0,
                downloadProgress: 0,
                download: 0,
                upload: 0,
                state: "WAITING"
            }
        case RESULT:
            return {
                ...state,
                download: (action.download/8).toFixed(2),
                upload: (action.upload/8).toFixed(2),
                results: [ action.value, ...state.results ]
            }
        case UPLOAD_SPEED_PROGRESS:
            return {
                ...state,
                upload: (action.upload/8).toFixed(2)
            }
        case DOWNLOAD_SPEED_PROGRESS:
            return {
                ...state,
                download: (action.download/8).toFixed(2)
            }
        case SET_STATUS:
            return {
                ...state,
                state: action.value
            }
        case SET_RESULTS:
            return {
                ...state,
                results: action.value
            }
        default:
            return state
    }
}