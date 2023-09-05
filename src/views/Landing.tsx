import React, { useEffect, useState } from 'react'
import { LandingLayout } from '../components/layout/LandingLayout';
import '../styles/Landing.scss'
import { Link } from 'react-router-dom';
import { isValidEmail } from '../components/functions/functions';
// Material UI
import {
    OutlinedInput,
    InputLabel,
    FormHelperText,
    IconButton,
    Button,
    InputAdornment
  } from '@mui/material';

import {Visibility,VisibilityOff} from '@mui/icons-material';


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
    <LandingLayout> 
            <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="email" shrink={false}>Email</InputLabel>
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
    </LandingLayout> 
   
  )
};