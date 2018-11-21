import { combineReducers } from 'redux';
import Videos from './VideosReducer';
import PlayListVideos from './PlayListVideos';
import ActiveUserReducer from './ActiveUserReducer';
import AutoplayReducer from './AutoplayReducer';

const rootReducer = combineReducers({
    videos: Videos,
    playlist: PlayListVideos,
    youtubeUser: ActiveUserReducer,
    autoplay: AutoplayReducer
});

export default rootReducer;