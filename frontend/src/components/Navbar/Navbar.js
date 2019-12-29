import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Auth } from '../../api/auth';
import React from 'react';
import './Navbar.css';

export const Navbar = () => {
    return(
        <div className="navbar-container">
            <div className="navbar-logo-container">
                <h3>Network</h3>
            </div>
            <div className="navbar-buttons">
                <NavbarButton action={() => Auth.logout()} icon="power-off" />
            </div>
        </div>
    );
};

function NavbarButton(props) {
    return(
        <div className="navbar-button" onClick={props.action} >
            <FontAwesomeIcon icon={props.icon} />
        </div>
    )
}