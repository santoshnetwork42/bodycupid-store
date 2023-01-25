import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Modal from 'react-modal';

import { Auth } from 'aws-amplify';


import ALink from '~/components/features/custom-link';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: "flex"
    }
};

let index = 0;

Modal.setAppElement( "#__next" );

function LoginModal() {

    const [ open, setOpen ] = useState( false );
    
    const [registeruser, setRegisterUser] = useState({name:"", phone:"", email:"", password:""})
    const [signinuser, setSigninUser] = useState({phone:""})



    const registerHandleSubmit = (e) =>{
        e.preventDefault();
        signUp();
        console.log('register stauts')
    }

    const signinHandleSubmit = (e) =>{
        e.preventDefault();
        signIn();
        console.log('register stauts')
    }

    async function signUp() {
        try {
            const { user } = await Auth.signUp({
                username: registeruser.name,
                phone_number: registeruser.phone,
                email : registeruser.email,
                password : registeruser.password,
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                }
            });
            console.log(user);
        } catch (error) {
            alert('error signing up:', error);
        }
    }


    async function signIn() {
        try {
            const phone_number = signinuser.phone;
            console.log(phone_number)
            const user = await Auth.signIn(phone_number);
        } catch (error) {
            alert('error signing in', error);
            
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

    function openModal( e, loginIndex = 0 ) {
        e.preventDefault();
        index = loginIndex;
        setOpen( true );
    }

    return (
        <>
            <a className="login-link d-lg-show" href="#" onClick={ openModal }>
                <i className="d-icon-user"></i>Sign in</a>
            <span className="delimiter">/</span>
            <a className="register-link ml-0" onClick={ ( e ) => openModal( e, 1 ) } href="#">Register</a>

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
                        <div className="form-box">
                            <div className="tab tab-nav-simple tab-nav-boxed form-tab">
                                <Tabs selectedTabClassName="active" selectedTabPanelClassName="active" defaultIndex={ index }>
                                    <TabList className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5">
                                        <Tab className="nav-item">
                                            <span className="nav-link border-no lh-1 ls-normal">Sign in</span>
                                        </Tab>
                                        <li className="delimiter">or</li>
                                        <Tab className="nav-item">
                                            <span className="nav-link border-no lh-1 ls-normal">Register</span>
                                        </Tab>
                                    </TabList>

                                    <div className="tab-content">
                                        <TabPanel className="tab-pane">
                                            <form action="#">
                                                {/* <div className="form-group mb-3">
                                                    <input type="text" className="form-control" id="singin-email" name="singin-email" placeholder="Username or Email Address *" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control" id="singin-password" placeholder="Password *" name="singin-password" required />
                                                </div> */}
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="singin-phonenumber" placeholder="Phone Number *" name="singin-phonenumber" value={signinuser.phone} onChange={(e)=>{setSigninUser(e)}} required />
                                                </div>
                                                <div className="form-footer">
                                                    <div className="form-checkbox">
                                                        <input type="checkbox" className="custom-checkbox" id="signin-remember" name="signin-remember" />
                                                        <label className="form-control-label" htmlFor="signin-remember">Remember me</label>
                                                    </div>
                                                    {/* <ALink href="#" className="lost-link">Lost your password?</ALink> */}
                                                </div>
                                                <button className="btn btn-dark btn-block btn-rounded" type="button" onClick={(e) => signinHandleSubmit(e)}>Login</button>
                                            </form>
                                            <div className="form-choice text-center">
                                                <label className="ls-m">or Login With</label>
                                                <div className="social-links">
                                                    <ALink href="#" className="social-link social-google fab fa-google border-no"></ALink>
                                                    <ALink href="#" className="social-link social-facebook fab fa-facebook-f border-no"></ALink>
                                                    <ALink href="#" className="social-link social-twitter fab fa-twitter border-no"></ALink>
                                                </div>
                                            </div>
                                        </TabPanel>

                                        <TabPanel className="tab-pane">
                                            <form action="#">
                                            <div className="form-group">
                                                    <label htmlFor="singin-username">Your Name:</label>
                                                    <input type="text" className="form-control" id="register-name" name="register-name" placeholder="Your Name *" value={registeruser.name} onChange={(e)=>{setRegisterUser({...registeruser, name:e.target.value})}} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="singin-phonenumber">Your Phone Number:</label>
                                                    <input type="text" className="form-control" id="register-phone" name="register-phone" placeholder="Your Phone number *" value={registeruser.phone} onChange={(e)=>{setRegisterUser({...registeruser, phone:e.target.value})}} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="singin-email">Your email address:</label>
                                                    <input type="email" className="form-control" id="register-email" name="register-email" placeholder="Your Email address *" value={registeruser.email} onChange={(e)=>{setRegisterUser({...registeruser, email:e.target.value})}} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="singin-password">Password:</label>
                                                    <input type="password" className="form-control" id="register-password" name="register-password" placeholder="Password *" value={registeruser.password} onChange={(e)=>{setRegisterUser({...registeruser, password:e.target.value})}} required />
                                                </div>
                                                <div className="form-footer">
                                                    <div className="form-checkbox">
                                                        <input type="checkbox" className="custom-checkbox" id="register-agree" name="register-agree"
                                                            required />
                                                        <label className="form-control-label" htmlFor="register-agree">I agree to the privacy policy</label>
                                                    </div>
                                                </div>
                                                <button className="btn btn-dark btn-block btn-rounded" type="button" onClick={(e)=>registerHandleSubmit(e)}>Register</button>
                                            </form>
                                            <div className="form-choice text-center">
                                                <label className="ls-m">or Register With</label>
                                                <div className="social-links">
                                                    <ALink href="#" className="social-link social-google fab fa-google border-no"></ALink>
                                                    <ALink href="#" className="social-link social-facebook fab fa-facebook-f border-no"></ALink>
                                                    <ALink href="#" className="social-link social-twitter fab fa-twitter border-no"></ALink>
                                                </div>
                                            </div>
                                        </TabPanel>
                                    </div>
                                </Tabs>
                            </div>
                        </div>

                        <button title="Close (Esc)" type="button" className="mfp-close" onClick={ closeModal }><span>×</span></button>
                    </Modal> : ''
            }
        </>
    )
}

export default ( LoginModal );