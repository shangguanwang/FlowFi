import React, { useEffect, useState } from 'react'
import Logo from '../components/Logo';
import '../styles/Landing.scss'
import { Link } from 'react-router-dom';
import landingImg from '../assets/landing-image-transparent.png'
// Material UI
import {
    OutlinedInput,
    InputLabel,
    FormHelperText,
  } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
// Redux
import { useDispatch } from 'react-redux';
import { authActions } from '../features/auth/authSlice';

export const Landing = () => {
    // Initialize state
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    // Handle email change
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    // Email format validation
    const isValidEmail = (email:string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email)
    }

    // useEffect watches for changes in email state and update the emailError state accordingly
    useEffect(() => {
        if(!isValidEmail(email)){
            setEmailError("Email is invalid")
        }else{
            setEmailError("")
        } //have to have the else state here so the error message disappears when the user types the correct email
    }, [email])

    // Dispatch
    const dispatch = useDispatch();
    // Submit the email and password
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Once the user clicks login, the Layout page will be displayed
        dispatch(authActions.login());
    }
    // show and hide password
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword((show)=> !show);
    }
    //keep the focus on input field even when user clicked the showPassword button
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };

  return (
    <div className='landing-container'>
    <div>
        <nav>
        <Logo />
        </nav>
        <div className='landing-info'>
            <h1>Managing Your Financial Well-being, at Anytime</h1>
            <p> Your all-in-one solution for tracking your wealth portfolio and monthly cash flow. </p>
            <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="email" shrink={false}>Email </InputLabel>
                <OutlinedInput id="email" name="email" value={email} onChange={handleEmailChange} fullWidth required/>
                <FormHelperText error className="helper-text">{email.length > 0 && emailError}</FormHelperText>
                <InputLabel htmlFor="password" shrink={false}>Password </InputLabel>
                <OutlinedInput id="password" name="password" fullWidth required
                type={showPassword? 'text': 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }/>
                <Button className="btn" type="submit" variant="contained" fullWidth sx={{mt:3, mb:2}}>SIGN IN</Button>
            </form>
            <Link to='/register'>Don't have an account? Sign up</Link>
        </div>
    </div>
     <img src={landingImg} alt='financial-dashboard-illustration' className='landing-img'/>
    </div>
  )
};