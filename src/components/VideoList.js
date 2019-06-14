import React from 'react';
import VideoListItem from '../components/VideoListItem';

function VideoList(props) {

    const videoItems = props.videos.map((video) => {
        return (
            <VideoListItem key={video.etag} video={video} type={props.type} user={video.user} />
        );

    })

    return (
        <div>
            {videoItems}
        </div>
    );
}

export default (VideoList);




