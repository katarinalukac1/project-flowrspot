import React from 'react';
import { reduxForm } from 'redux-form';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false
        }
    }

    submit = values => {
        fetch("https://flowrspot-api.herokuapp.com/api/v1/users/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                    });
                    this.props.setEmail(values.email);
                    if (result.auth_token != null) {
                        this.props.loginModal(false);
                        this.props.setApiToken(result.auth_token);
                        this.props.loginSuccessful(true);
                        this.props.loginSuccessModal(true);
                    } else if (result.auth_token == null) {
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
        const { handleSubmit } = this.props;
        return (
            <div className='login-modal new-account-modal'>
                <h2 className="new-account-modal__title">Welcome back</h2>
                <form onSubmit={handleSubmit(this.submit)}>
                    <div className='new-account-modal__field'>
                        <label>Email address</label>
                        <input className="new-account-modal__input" name="email" component="input" type="email" value={this.props.email} required />
                    </div>
                    <div className='new-account-modal__field'>
                        <label>Password</label>
                        <input className="new-account-modal__input"  name="password" component="input" type="password" required />
                    </div>
                    <div className="sign-up-modal">
                        <button type="submit" label="submit" className="new-account-modal__submit">Login to your Account</button>
                    </div>
                </form>
                <a onClick={() =>
                    this.props.loginModal(false)} className="new-account-modal__no-register">I don't want to login</a>
            </div>
        );
    }

}

Login = reduxForm({
    form: 'login'
})(Login);

export default Login;