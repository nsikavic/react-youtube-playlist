import { AUTOPLAY } from '../actions/index';

export default function (state = false, action) {
    switch(action.type) {
        case AUTOPLAY: 
            return action.payload;
        default:
            return state;
    }
}