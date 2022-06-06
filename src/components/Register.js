import React from 'react';
import { reduxForm } from 'redux-form';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err: null,
            isLoading: false
        }
    }

    submit = values => {
        fetch("https://flowrspot-api.herokuapp.com/api/v1/users/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(r => r.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                    });

                    this.props.setEmail(values.email);
                    this.props.setDate(values.date_of_birth);

                    if (result.auth_token != null) {
                        this.props.setApiToken(result.auth_token);
                        this.props.signupModal(false);
                        this.props.signupSuccess(true);
                    } 
                    else if (result.auth_token == null) {
                        this.setState({
                            err: result.err
                        })
                    }
                },

                (err) => {
                    this.setState({
                    isLoaded: true,
                    err
                });
            }
        )
    }

    render() {

        const { 
            err, 
            isLoading, 
            handleSubmit 
        } = this.props;

        return (
            <div className='new-account-modal'>
                <h2 className="new-account-modal__title">
                    Create an Account
                </h2>
                <form onSubmit={handleSubmit(this.submit)}>
                    <div className="new-account-modal__names">
                        <div className='new-account-modal__field'>
                            <label>First name</label>
                            <input className="new-account-modal__input" name="first_name" component='input'
                                required type="text" />
                        </div>
                        <div className='new-account-modal__field'>
                            <label>Last name</label>
                            <input className="new-account-modal__input" name="last_name" component="input"  required type="text" />
                        </div>
                    </div>
                    <div className='new-account-modal__field'>
                        <label>Date of Birth</label>
                        <input className="new-account-modal__input" name="date_of_birth" component="input" required type="text" />
                    </div>
                    <div className='new-account-modal__field'>
                        <label>Email address</label>
                        <input className="new-account-modal__input" name="email" component="input" required type="email" />
                    </div>
                    <div className='new-account-modal__field'>
                        <label>Password</label>
                        <input className="new-account-modal__input" name="password" component="input" type="password" required />
                    </div>
                    <div className="new-account-modal__field">
                        <button type="submit" label="submit" className="new-account-modal__submit">{isLoading ? 'Loading...' : 'Create Account'}</button>
                    </div>
                </form>
                <a onClick={() =>
                    this.props.signupModal(false)} className="new-account-modal__no-register">I don't want to register</a>
            </div>
        );
    }
}

Register = reduxForm({
    form: 'signUp'
})(Register);

export default Register;