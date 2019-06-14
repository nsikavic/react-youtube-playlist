import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import _ from 'lodash';
import { youtubeSearch, userLogin } from '../actions/index'
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LoginDialog from '../components/LoginDialog';
import * as firebase from 'firebase';

const styles = {
  root: {
    flexGrow: 1,
  },
  titleName: {
    textAlign: 'left',
    // paddingTop: '30px',
    cursor: 'default'
  },
  userHeader: {
    textAlign: 'right',
    marginTop: '25px'
  },
  headerMenu: {
    marginTop: '40px'
  },
  headerButton: {
    textTransform: 'none'
  },
  accountCircle: {
    marginLeft: 10
  },
  avatar: {
    marginLeft: 10
  },
  logo: {
    width: 100,
    backgroundColor: 'transparent'
  }
};

class AppHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }

  }

  videoSearch = _.debounce((term) => {
    this.props.youtubeSearch(term);
  }, 500);

  componentDidMount() {
    // this.videoSearch('kalkbrenner')
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSignOut = () => {
    this.setState({ anchorEl: null });
    firebase.auth().signOut();
    this.props.userLogin(null);
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container spacing={0}>

              <Grid item xs={3} sm={3}>
                <div className="header-title">
                  <img className="logo-img" src='upchain_logo.jpg' alt='logo' />
                  <Typography variant="title" color="inherit" className={classes.titleName}>
                    Playlist
                </Typography>
                </div>
              </Grid>

              <Grid item xs={6} sm={6}>
                <TextField
                  id="searchTerm"
                  className="searchTerm"
                  label="Youtube search"
                  margin="normal"
                  type="search"
                  onChange={(term) => this.videoSearch(term.target.value)}
                />
              </Grid>

              <Grid item xs={3} sm={3} className={classes.userHeader}>
                {this.props.user === null &&
                  <LoginDialog open={true} />
                }
                {this.props.user !== null &&
                  <Button className={classes.headerButton}
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit">
                    {this.props.user}
                    <Avatar
                      alt="avatar"
                      src={firebase.auth().currentUser.photoURL}
                      className={classes.avatar}
                    />
                  </Button>

                }

                <div>
                  <Menu className={classes.headerMenu}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleSignOut}>Sign out</MenuItem>
                  </Menu>
                </div>
              </Grid>

            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.youtubeUser
  }
}


export default connect(mapStateToProps, { youtubeSearch, userLogin })(withStyles(styles)(AppHeader));