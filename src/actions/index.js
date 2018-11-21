import axios from 'axios';

import { youtubePlaylistDB } from '../config/firebase';

export const API_KEY = 'AIzaSyD4dg05Fhou6FZR3uHnT7asegUzB5PgnP4';
export const YOUTUBE_RESULTS = 'youtube_results';
export const FETCH_PLAYLIST = 'fetch_playlist';
export const ADD_VIDEO = 'add_video';
export const REMOVE_VIDEO = 'remove_video';
export const USER_LOGIN = 'user_login';
export const GET_USER = 'get_user';
export const AUTH_CHANGED = 'auth_changed';
export const AUTOPLAY = 'autoplay';
const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

export function youtubeSearch(term) {

    var params = {
        part: 'snippet',
        key: API_KEY,
        q: term,
        type: 'video'
    };

    const request = axios.get(ROOT_URL, { params: params })

    return {
        type: YOUTUBE_RESULTS,
        payload: request
    }
}

export const ratePlaylistVideo = (action, videoId, user) => async dispatch => {
    youtubePlaylistDB.child(videoId).transaction((video) => {
        if (video) {                        
            if(action === "like"){
                video.likes++;
                video.usersVoted.push(user)
            } else {
                video.dislikes++;
                video.usersVoted.push(user)
            }

            video.likes = video.likes || 0;
            video.dislikes = video.dislikes || 0; 
            
            if(video.dislikes - video.likes >= 3) {
                video = {};
            }
            return video;
        }
    });
}

export const addVideoToPlaylist = (video, username) => async dispatch => {
    video["likes"] = 0;
    video["dislikes"] = 0;
    video["usersVoted"] = ["default"];
    video["user"] = username;
    youtubePlaylistDB.push().set(video);
}

export const removeVideoFromPlaylist = (video, videoId) => async dispatch => {
    if (video && video["dbKey"] && video.id.videoId === videoId) {
        youtubePlaylistDB.child(video["dbKey"]).remove();            
    }
}

export function fetchPlayList(){
    return dispatch => {
        youtubePlaylistDB.on("value", snapshot => {
            dispatch({
                type: FETCH_PLAYLIST,
                payload: snapshot.val()
            });
        });
    }    
}

export function userLogin(userName){
    return {
        type: USER_LOGIN,
        payload: userName
    }
}

export function handleAutoplayChange(autoplay) {
    return {
        type: AUTOPLAY,
        payload: autoplay
    }
}

export function getUser(){
    return {
        type: GET_USER,
        payload: localStorage.getItem("youtubeUser")
    }
}