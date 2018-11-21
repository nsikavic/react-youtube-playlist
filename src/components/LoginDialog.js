import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import {connect} from 'react-redux';
import {userLogin} from '../actions/index';

class LoginDialog extends Component {
   

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            username: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({username: event.target.value})
    }

    handleSubmit = () => {
        localStorage.setItem("youtubeUser", this.state.username)
        this.setState({ open: false });
        this.props.userLogin(this.state.username)
    };

    render() {
        return (
            <div>                
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Enter your username:"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="username"
                            label="Username"
                            InputProps={{
                                // shrink: true,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircle />
                                  </InputAdornment>
                                )
                            }}                                                
                            fullWidth
                            margin="normal"   
                            onChange={this.handleChange}                             
                        />
                        <DialogContentText id="alert-dialog-description">
                            You can vote only once per video in playlist!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} color="primary" autoFocus>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connect(null, {userLogin})(LoginDialog);