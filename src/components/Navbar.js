import React from 'react';
import { Link } from 'react-router-dom'
import logo from './../images/logo.png';
import Hamburger from './Hamburger';

class Navbar extends React.Component {
    render() {
        let loginState = this.props.loginState;
        let userInfo = this.props.userInfo;
        return (
            <header className='header'>
                <nav className='header__navbar'>
                    <Link to="/" className='header__logo'>
                        <img src={logo} alt="FlowrSpot" />
                    </Link>
                    <Hamburger />
                    <ul className='header__navbar-list'>
                        <li className='header__navbar-item'>
                            <Link to="/flowers" className="header__navbar-link">Flowers</Link>
                        </li>
                        <li className='header__navbar-item'>
                            <Link to="/Sightings" className="header__navbar-link">Latest Sightings</Link>
                        </li>
                        <li className='header__navbar-item'>
                            <Link to="/favorites" className="header__navbar-link">Favorites</Link>
                        </li>
                        <li className='header__navbar-item'>
                            <Link to="/" className="header__navbar-link" onClick={() => this.props.loginModal(true)}>Login</Link>
                        </li>
                        <li className='header__navbar-item'>
                            <Link to="/">
                                <button onClick={() => this.props.signupModal(true)} className="button">New Account</button>
                            </Link>
                        </li>
                    </ul>  
                </nav>
            </header>
        );
    }
}

export default Navbar;