import { ADD_VIDEO, REMOVE_VIDEO, FETCH_PLAYLIST } from '../actions/index'

export default function(state=[], action) {
    switch (action.type){
        // case ADD_VIDEO:
        //     if(!state.playlist) state.playlist = [];
            
        //     var newVideoId = action.payload.id.videoId;
        //     var contains = false;

        //     for (var i=0; i < state.playlist.length; i++){
        //         if(state.playlist[i].id.videoId === newVideoId) contains = true;
        //     }
            
        //     if(!contains) return {...state, playlist: [...state.playlist, action.payload]};
        //     else return {...state, playlist: [...state.playlist]};         
    
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