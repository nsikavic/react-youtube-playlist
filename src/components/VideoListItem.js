import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Media } from 'reactstrap';
import { addVideoToPlaylist, ratePlaylistVideo } from '../actions/index';
import Snackbar from '@material-ui/core/Snackbar';
import LikeIcon from '@material-ui/icons/ThumbUp';
import DislikeIcon from '@material-ui/icons/ThumbDown';

class VideoListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            vertical: 'top',
            horizontal: 'right',
            messageText: ''
        }
        this.addVideo = this.addVideo.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.rateVideo = this.rateVideo.bind(this);
    }

    handleClose() {
        this.setState({ open: false });
    }

    addVideo(video) {

        console.log(this.props.loggedUser);
        if (this.props.loggedUser && this.props.loggedUser.includes('upchain')) {
            var contains = false;
            if (this.props.playlist.length > 0) {
                for (var i = 0; i < this.props.playlist.length; i++) {
                    if (this.props.playlist[i].id.videoId === video.id.videoId) contains = true;
                }
            }

            if (!contains) {
                this.props.addVideoToPlaylist(video, this.props.loggedUser)
            } else {
                this.setState({ open: true, messageText: 'Video is already in the playlist!' });
                setTimeout(() => { this.setState({ open: false }) }, 2000)
            }
        } else {
            this.setState({ open: true, messageText: 'You must be logged with upchain domain!' });
            setTimeout(() => { this.setState({ open: false }) }, 2000)
        }
    }

    rateVideo(action, videoKey, video) {
        var user = this.props.loggedUser;
        if (user === null) {
            this.setState({ open: true, messageText: 'You must be logged in application!' });
            setTimeout(() => { this.setState({ open: false }) }, 2000)
        } else {
            var alreadyVoted = false;
            for (var i = 0; i < video.usersVoted.length; i++) {
                if (video.usersVoted[i] === user) alreadyVoted = true;
            }
            if (!alreadyVoted) {
                this.props.ratePlaylistVideo(action, videoKey, user);
            } else {
                this.setState({ open: true, messageText: 'You already voted for this video!' });
                setTimeout(() => { this.setState({ open: false }) }, 2000)
            }

        }

    }

    render() {
        const video = this.props.video;
        const imageUrl = video.snippet.thumbnails.default.url;
        const title = video.snippet.title;
        const likes = video.likes;
        const dislikes = video.dislikes;
        const dbKey = video.dbKey;
        const user = this.props.user;

        return (
            <div className={this.props.type === "searchList" ? 'videoListItem' : ''}
                onClick={() => this.props.type === "searchList" ? this.addVideo(video) : () => { }}>
                <Media className={this.props.type === "searchList" ? 'mediaDiv videoListMedia' : 'mediaDiv'}>
                    <Media left>
                        <Media object src={imageUrl} alt="Image" />
                    </Media>
                    <Media body className="videoListItemBody">
                        <p><span className="videoListItemText">Title:</span> {title}</p>
                        {this.props.type !== "searchList" && <p><span className="videoListItemText">Requested by:</span> {user}</p>}
                    </Media>
                    {this.props.type === "playList" &&
                        <div>
                            <div>
                                <LikeIcon className="thumbIcon" onClick={() => this.rateVideo('like', dbKey, video)} />
                                <div className="likeCounter">{likes}</div>
                            </div>
                            <div>
                                <DislikeIcon className="thumbIcon" onClick={() => this.rateVideo('dislike', dbKey, video)} />
                                <div className="dislikeCounter">{dislikes}</div>
                            </div>
                        </div>
                    }
                </Media>
                <hr />
                <Snackbar
                    anchorOrigin={{ ...this.state }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="messageid">{this.state.messageText}</span>}
                />
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        playlist: state.playlist,
        loggedUser: state.youtubeUser
    }
}

export default connect(mapStateToProps, { addVideoToPlaylist, ratePlaylistVideo })(VideoListItem);