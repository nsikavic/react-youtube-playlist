import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { removeVideoFromPlaylist } from '../actions/index'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: theme.spacing.unit * 3,
  }),
});

class YouTubePlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player: {},
      initialLoad: true
    }

    this._onReady = this._onReady.bind(this);
    this._onEnd = this._onEnd.bind(this);
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    this.setState({ player: event.target });
  }

  _onEnd(event, videoId) {
    this.props.removeVideoFromPlaylist(this.props.playlistVideos[0], videoId);
  }

  render() {
    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: this.props.autoplay ? 1 : 0,
        controls: 0,
      }
    };
    const { classes } = this.props;


    var videoId = ""
    var title = "";
    var description = "";

    var youtubeList = this.props.playlistVideos;

    if (youtubeList && youtubeList.length > 0) {
      videoId = youtubeList[0].id.videoId;
      title = youtubeList[0].snippet.title;
      description = youtubeList[0].snippet.description;
    }

    return (
      <div>
        <div className="videoWrapper">
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={this._onReady}
            onEnd={(e) => this._onEnd(e, videoId)}
          />
        </div>
        <div>
          <Paper className={classes.root} elevation={4}>
            <Typography variant="title" component="h3">
              {title}
            </Typography>
            <Typography component="p">
              {description}
            </Typography>
          </Paper>
        </div>
      </div>
    );
  }


}

function mapStateToProps(state) {
  return {
    playlistVideos: state.playlist,
    autoplay: state.autoplay
  }
}

export default connect(mapStateToProps, { removeVideoFromPlaylist })(withStyles(styles)(YouTubePlayer));