import { YOUTUBE_RESULTS } from '../actions/index';

export default function (state = [], action) {
    switch (action.type) {        
        case YOUTUBE_RESULTS:
            return [...action.payload.data.items]    
        default:
            return state;
    }
}