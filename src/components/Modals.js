import React from 'react';
import Navbar from './Navbar';
import Register from './Register';
import Login from './Login';
import GetFlowers from './GetFlowers';
import { Modal } from 'react-bootstrap';
import searchIcon from './../images/search-icon.png';

class Modals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err: null,
            showSignupModal: false,
            isSignupSuccessful: false,
            showLoginModal: false,
            isLoginSuccessful: false,
            showProfileModal: false,
            isLoaded: false,
            userFromDatabase: [],
            clientToken: '',
            email: '',
            dateOfBirth: '',
            sightings: ''
        };
    }

    componentDidMount() {
        this.checkUser();
    }

    render() {
        return (
            <div>
                <Navbar
                    signupModal={this.showSignupModal}
                    loginModal={this.showLoginModal}
                    loginState={this.state.isLoginSuccessful}
                    userData={this.state.userFromDatabase}
                />
                <div className='banner'>
                    <h1 className='banner__title'>Discover flowers around you</h1>
                    <p className='banner__subtitle'>Explore between more than {this.state.sightings.length} sightings</p>
                    <div className='banner__search'>
                        <input className="banner__search-box" type="text" placeholder="Looking for something specific?" />
                        <img src={searchIcon} className='banner__search-icon'/>
                    </div>
                </div>

                <GetFlowers authToken={this.state.clientToken} loginState={this.state.isLoginSuccessful} />

                <SignupModal
                    show={this.state.showSignupModal}
                    onHide={() => this.showSignupModal(false)}
                    signupModal={this.showSignupModal}
                    signupSuccess={this.signupSuccessful}
                    setEmail={this.setEmail}
                    setDate={this.setDate}
                    setApiToken={this.setApiToken}
                />

                <SuccessSignupModal
                    show={this.state.isSignupSuccessful}
                    onHide={() => this.signupSuccessful(false)}
                    showLogin={this.showLoginModal} 
                />

                <LoginModal
                    show={this.state.showLoginModal}
                    onHide={() => this.showLoginModal(false)}
                    loginModal={this.showLoginModal}
                    loginSuccessful={this.loginSuccessful}
                    loginSuccessModal={this.showLoginSuccessModal}
                    email={this.state.email}
                    setEmail={this.setEmail}
                    setApiToken={this.setApiToken}
                />
            </div>
        );
    }

    async getUserDetails() {
        fetch("https://flowrspot-api.herokuapp.com/api/v1/users/me", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.state.clientToken,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        userFromDatabase: result.user
                    });
                },
                (err) => {
                    this.setState({
                        isLoaded: true,
                        err
                    });
                }
            )
    }

    signupSuccessful = (value) => {
        this.setState({
            isSignupSuccessful: value
        });
        this.checkUserToken();
    }

    showSignupModal = (value) => {
        this.setState({
            showSignupModal: value
        });
    }

    showLoginModal = (value) => {
        this.setState({
            showLoginModal: value
        });
    }

    loginSuccessful = (value) => {
        this.setState({
            isLoginSuccessful: value
        });
        this.checkUserToken();
    }

    showLoginSuccessModal = (value) => {
        this.setState({
            loginSuccessModal: value
        });
    }

    setEmail = (value) => {
        this.setState({
            email: value
        });
    }

    setDate = (value) => {
        this.setState({
            dateOfBirth: value
        });
    }

    setApi = (value) => {
        this.setState({
            clientToken: value
        });
    }

    checkUser() {
        if (this.state.clientToken.length > 0) {
            this.getUserDetails();
        }
    }
}

function SignupModal(props) {
    return (
        <Modal centered show={props.show} onHide={props.onHide}>
            <Register
                signupModal={props.signupModal}
                signupSuccess={props.signupSuccess}
                setEmail={props.setEmail}
                setDate={props.setDate}
                setApiToken={props.setApi}
            />
            
        </Modal>
    );
}

function SuccessSignupModal(props) {
    return (
        <Modal show={props.show} onHide={props.onHide} centered>
            <div className="new-account-modal">
                <h2 className="new-account-modal__title">Congratulations! You have successfully signed up for FlowrSpot!</h2>
                <div>
                    <button onClick={() => {
                        props.onHide(false);
                        props.showLogin(true);
                    }} className="new-account-modal__submit">OK</button>
                </div>
            </div>
        </Modal>
    );
}

function LoginModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            centered>
            <div>
                <Login
                    email={props.email}
                    setEmail={props.setEmail}
                    setApiToken={props.setApi}
                    loginModal={props.loginModal}
                    loginSuccessful={props.loginSuccessful}
                />
            </div>
        </Modal>
    );
}

export default Modals;