import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader'
import YouTubePlayer from './components/YouTubePlayer';
import { withStyles } from '@material-ui/core/styles';
import { fetchPlayList, getUser, handleAutoplayChange } from './actions/index';
// import * as actions from "../actions";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import VideoList from './components/VideoList';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: '10px',
    marginRight: '5px'
  }
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      autoplay: false
    }
  }

  handleChange = (event, checked) => {
    this.props.handleAutoplayChange(checked);
  }

  componentWillMount() {
    this.props.fetchPlayList();
  }

  componentDidMount() {
    //this.props.getUser();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <AppHeader />
        <div className={classes.root}>
          <Grid container spacing={0}>

            <Grid item xs={12} sm={8}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={7}>
                  <div className="youtubePlayer">
                    <YouTubePlayer />
                  </div>
                </Grid>
                <Grid item xs={12} sm={5}>

                  <Paper className={classes.paper}>
                    <Typography variant="display1" gutterBottom>
                      Search results:
                        </Typography>
                    <hr />
                    <div className="listBox">
                      <VideoList videos={this.props.videoList} type="searchList" />
                    </div>
                  </Paper>


                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <div className="playlist-header">
                  <div className="playlist-header-text">

                    <Typography variant="display1" gutterBottom>
                      Playlist:
                    </Typography>
                  </div>

                  <div className="autoplay-checkbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.props.autoplay}
                          onChange={(event, checked) => this.handleChange(event, checked)}
                          value="autoplay"
                        />
                      }
                      label="Autoplay"
                    />


                  </div>




                </div>

                <hr />
                <div className="listBox">
                  <VideoList videos={this.props.playlistVideos} type="playList" />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    videoList: state.videos,
    playlistVideos: state.playlist,
    autoplay: state.autoplay
  }
}

export default connect(mapStateToProps, { fetchPlayList, getUser, handleAutoplayChange })(withStyles(styles)(App));
