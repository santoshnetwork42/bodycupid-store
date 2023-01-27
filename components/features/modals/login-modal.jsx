import React, { useState } from 'react';
import Modal from 'react-modal';


import { Auth } from 'aws-amplify';


Modal.setAppElement( "#__next" );

function LoginModal() {

    return (
        <>
            <a className="login-link d-lg-show" href="/pages/account">
                <i className="d-icon-user"></i>Sign in</a>
            <span className="delimiter">/</span>
            <a className="register-link ml-0" href="/pages/account">Register</a>
        </>
    )
}

export default ( LoginModal );