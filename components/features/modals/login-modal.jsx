import React, { useState } from 'react';
import Modal from 'react-modal';


import { Auth } from 'aws-amplify';


import ALink from '~/components/features/custom-link';
import AwsAuthenticate from './aws-authenticate';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: "flex"
    },
    content: {
        width: '100%',
        height: '100%',
    },
};

Modal.setAppElement( "#__next" );

function LoginModal() {
    const [ open, setOpen ] = useState( false );

    const [register, setRegister] = useState({given_name:"", password:"", middle_name:"", email:"", phone_number:"",});


    const registerHandleSubmit = (e) =>{
        e.preventDefault();
        signUp();
        console.log('register stauts')
    }


    async function signUp() {
        try {
            const { user } = await Auth.signUp({
                username : register.phone_number,
                password : register.password,
                email: register.email,
                phone_number: register.phone_number,
                attributes: {
                    // email,          // optional
                    // phone_number,   // optional - E.164 number convention
                    // other custom attributes 
                    name: register.phone_number,
                    given_name: register. given_name,
                    middle_name: register.middle_name,
                },
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                }
            });
            console.log(user);
            setOpen(false);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }


    function closeModal() {
        document.querySelector( ".ReactModal__Overlay" ).classList.add( 'removed' );
        document.querySelector( ".login-popup.ReactModal__Content" ).classList.remove( "ReactModal__Content--after-open" );
        document.querySelector( ".login-popup-overlay.ReactModal__Overlay" ).classList.remove( "ReactModal__Overlay--after-open" );
        setTimeout( () => {
            setOpen( false );
        }, 330 );
    }

    function openModal( e ) {
        e.preventDefault();
        setOpen( true );
    }

    return (
        <>
            <a className="login-link d-lg-show" href="#" onClick={ openModal }>
                <i className="d-icon-user"></i>Sign in</a>
            <span className="delimiter">/</span>
            <a className="register-link ml-0" onClick={ openModal } href="#">Register</a>

            {
                open ?
                    <Modal
                        isOpen={ open }
                        onRequestClose={ closeModal }
                        style={ customStyles }
                        contentLabel="Login Modal"
                        className="login-popup"
                        overlayClassName="login-popup-overlay"
                        shouldReturnFocusAfterClose={ false }
                        id="login-modal"
                    >
                        {/* <div style={{ width: '100vw', height: '100vh'}}> */}
                            <AwsAuthenticate />
                        {/* </div> */}

                        <button title="Close (Esc)" type="button" className="mfp-close" onClick={ closeModal }><span>×</span></button>
                    </Modal> : ''
            }
        </>
    )
}

export default ( LoginModal );