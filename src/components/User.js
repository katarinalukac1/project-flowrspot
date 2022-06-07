import React from 'react';
import closeIcon from './../images/close-icon.png';

class User extends React.Component {
    render() {
        return (
            <div className='user__wrapper'>
                <button onClick={this.props.onHide} className="user__close-button">
                    <img src={closeIcon}/>
                </button>
                <div className="user__header">
                    <div className="user__image"></div>
                    <div className="user__header-text">
                        <h3 className="user__header-names">{this.props.userData.first_name} {this.props.userData.last_name}</h3>
                        <p className="user__sightings">Sightings</p>
                    </div>
                </div>
                <div className="user__field">
                    <p className="user__label">First Name</p>
                    <h5 className="user__text">{this.props.userData.first_name}</h5>
                </div>
                <div className="user__field">
                    <p className="user__label">Last Name</p>
                    <h5 className="user__text">{this.props.userData.last_name}</h5>
                </div>
                <div className="user__field">
                    <p className="user__label">Date of Birth</p>
                    <h5 className="user__text">{this.props.dateOfBirth}</h5>
                </div>
                <div className="user__field">
                    <p className="user__label">Email Address</p>
                    <h5 className="user__text">{this.props.email}</h5>
                </div>
                <div className="user__logout">
                    <button onClick={() => {
                        this.props.loginSuccessful(true);
                        this.props.onHide(false);
                        this.props.setEmail('');
                        this.props.setDate('');
                        this.props.setApi('');
                    }} className="button user__logout-button">Logout</button>
                </div>
            </div>
        );
    }
}

export default User;