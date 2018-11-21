import { REMOVE_VIDEO, FETCH_PLAYLIST } from '../actions/index'

export default function(state=[], action) {
    switch (action.type){    
        case REMOVE_VIDEO:
            if(!state.playlist) state.playlist = [];
            var newPlayList = state.playlist.filter(video => video.id.videoId !== action.payload.video_id);
            return { ...state, playlist: [...newPlayList]}

        case FETCH_PLAYLIST:
            var newArray = [];
            for(var key in action.payload){
                if(!action.payload.hasOwnProperty(key)) continue;
                
                var obj = action.payload[key];
                var newObj = {};
                for(var prop in obj){
                    if(!obj.hasOwnProperty(prop)) continue;
                    newObj[prop] = obj[prop];
                }
                newObj["dbKey"] = key;
                newArray.push(newObj);
            }

            return [...newArray]
                   
        default: 
            return state;
    }

}