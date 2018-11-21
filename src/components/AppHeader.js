import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import { youtubeSearch } from '../actions/index'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LoginDialog from '../components/LoginDialog';

const styles = {
  root: {
    flexGrow: 1,
  },
  titleName: {
    textAlign: 'left',
    paddingTop: '30px',
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
  }

};

class AppHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {      
      anchorEl: null
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  videoSearch = _.debounce((term) => {
    this.props.youtubeSearch(term);
  }, 500);

  componentDidMount() {
    this.videoSearch('kalkbrenner')
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
    var a = this.state.anchorEl;
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {    
    this.setState({ anchorEl: null });
    localStorage.removeItem("youtubeUser");
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
                <Typography variant="title" color="inherit" className={classes.titleName}>
                  Upchain YouTube Player
                </Typography>
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
              { this.props.user === null &&
                <LoginDialog open={true} />
              }
              { this.props.user !== null &&
                <Button className={classes.headerButton}
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  // onClick={this.handleMenu}
                  color="inherit">
                  {this.props.user}
                  <AccountCircle className={classes.accountCircle} />
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
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
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

function mapStateToProps(state){
  return {
    user: state.youtubeUser
  }
}


export default connect(mapStateToProps, { youtubeSearch })(withStyles(styles)(AppHeader));