// src/components/Form.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginSuccess } from '../redux/authSlice';
import { AccountCircle, Email, Lock } from '@mui/icons-material';
import './Form.css';

const Form = ({ isSignInPage = true }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState({
        ...(!isSignInPage && {
            fullName: ''
        }),
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any existing error messages
    
        try {
            if (isSignInPage) {
                const res = await axios.post('https://platform-dsa-1.onrender.com/api/users/login', data);
                const token = res.data.token;
                if (token) {
                    localStorage.setItem('token', token);
                    dispatch(loginSuccess(res.data.user));
                    navigate('/');
                } else {
                    setErrorMessage('Invalid credentials');
                }
            } else {
                const res = await axios.post('https://platform-dsa-1.onrender.com/api/users/register', data);
                if (res.status === 200) {
                    navigate('/users/sign_in'); // Redirect to sign-in after successful registration
                } else {
                    setErrorMessage('Registration failed: ' + res.data.msg);
                }
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.msg || 'Invalid credentials');
        }
    };

    return (
        <div className="Form-outerbox">
            <div className="close-div">Welcome {isSignInPage && 'Back'} <span className="close">×</span></div>
            <div className="inner-div">
                <div className="inner-inner-div">
                    <div className="toggle-button">
                        <div
                            className={isSignInPage ? "active" : "inactive"}
                            onClick={() => navigate('/users/sign_in')}
                        >
                            Sign In
                        </div>
                        <div
                            className={!isSignInPage ? "active" : "inactive"}
                            onClick={() => navigate('/users/sign_up')}
                        >
                            Sign Up
                        </div>
                    </div>
                    <section className="context">
                        <form onSubmit={handleSubmit}>
                            {!isSignInPage && (
                                <div className="modal-form-group">
                                    <i className="input-icon material-icons"><AccountCircle /></i>
                                    <input
                                        onChange={(e) => setData({ ...data, fullName: e.target.value })}
                                        value={data.fullName}
                                        name="name"
                                        placeholder="Full name"
                                        id="Name"
                                    />
                                </div>
                            )}
                            <div className="modal-form-group">
                                <i className="input-icon material-icons"><Email /></i>
                                <input
                                    type="email"
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    value={data.email}
                                    name="email"
                                    placeholder="E-mail"
                                />
                            </div>
                            <div className="modal-form-group">
                                <i className="input-icon material-icons"><Lock /></i>
                                <input
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    type="password"
                                    value={data.password}
                                    name="password"
                                    placeholder="Password"
                                />
                            </div>
                            {errorMessage && <p style={{color: "red", marginTop: "0px"}} className="error-message">{errorMessage}</p>}
                            <div className="modal-form-group1">
                                <div className="left">
                                    <input name="rem" type="checkbox" defaultChecked />
                                    <label className="modal-form-label" htmlFor="remember">Remember me</label>
                                </div>
                                <button className="pull-right forgot-link">Forgot Password</button>
                            </div>

                            <button
                                className="btn btn-green signin-button"
                                type="submit"
                            >{isSignInPage ? 'Sign in' : 'Sign up'}</button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Form;
