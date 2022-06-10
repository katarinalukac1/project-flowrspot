import React from 'react';
import Navbar from './Navbar';
import Register from './Register';
import Login from './Login';
import GetFlowers from './GetFlowers';
import User from './User';
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
            showUserProfile: false,
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
                    showProfile={this.showUserProfile}
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
                    o0Hide={() => this.showSignupModal(false)}
                    signupModal={this.showSignupModal}
                    signupSuccess={this.signupSuccessful}
                    setEmail={this.setEmail}
                    setDate={this.setDate}
                    setApi={this.setApi}
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
                    setApi={this.setApi}
                />

                <UserProfile
                    show={this.state.showUserProfile}
                    onHide={() => this.showUserProfile(false)}
                    userData={this.state.userFromDatabase}
                    email={this.state.email}
                    dateOfBirth={this.state.dateOfBirth}
                    setEmail={this.setEmail}
                    setDate={this.setDate}
                    setApi={this.setApi}
                    loginSuccessful={this.loginSuccessful}
                    showProfile={this.showUserProfile}
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
        this.checkUser();
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
        this.checkUser();
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

    showUserProfile = (value) => {
        this.setState({
            showUserProfile: value
        });
    }

    async getSightings() {
        fetch("https://flowrspot-api.herokuapp.com/api/v1/sightings", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        sightings: result.sightings
                    });
                },
                (err) => {
                    this.setState({
                    err
                });
            }
        )
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
                setApi={props.setApi}
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
                    setApi={props.setApi}
                    loginModal={props.loginModal}
                    loginSuccessful={props.loginSuccessful}
                />
            </div>
        </Modal>
    );
}

function UserProfile(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            centered>
            <div className="user">
                <User
                    onHide={props.onHide}
                    userData={props.userData}
                    email={props.email} 
                    dateOfBirth={props.dateOfBirth} 
                    setEmail={props.setEmail}
                    setDate={props.setDate}
                    setApi={props.setApi}
                    loginSuccessful={props.loginSuccessful}
                    showProfile={props.showUserProfile}
                />
            </div>
        </Modal>
    );
}

export default Modals;