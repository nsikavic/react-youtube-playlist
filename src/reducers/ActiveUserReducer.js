import { USER_LOGIN, GET_USER } from '../actions/index';

export default function (state = null, action){
    switch (action.type) {
        case USER_LOGIN:
            return action.payload;
        case GET_USER:
            return action.payload;
        default:
            return state;
    }
}