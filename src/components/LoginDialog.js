import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { userLogin } from '../actions/index';
import * as firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class LoginDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            username: ''
        }

        this.uiConfig = {
            signInFlow: 'popup',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccess: () => false
            }
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(!!user && user.email){
                this.setState({open: false});
                this.props.userLogin(user.email)
            }            
        })
    }

    handleChange = (event) => {
        this.setState({ username: event.target.value })
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
                    <DialogTitle id="alert-dialog-title">{"You are not signed in"}</DialogTitle>
                    <DialogContent>

                        <div className="login-container">
                            <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                            />

                        </div>

                        <DialogContentText id="alert-dialog-description">
                            You can vote only once per video in playlist!
                        </DialogContentText>
                    </DialogContent>          
                </Dialog>
            </div>
        );
    }
}

export default connect(null, { userLogin })(LoginDialog);