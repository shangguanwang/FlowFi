import React, { useEffect, useState } from 'react'
import '../styles/Landing.scss'
import { Link, useNavigate  } from 'react-router-dom';
// Import firebase Auth
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// Import Components
import { LandingLayout } from '../components/layout/LandingLayout';
import { isValidEmail } from '../components/functions/functions';
import SubmitButton from '../components/layout/SubmitButton';
// Material UI
import {
    OutlinedInput,
    InputLabel,
    FormHelperText,
    IconButton,
    InputAdornment
  } from '@mui/material';

import {Visibility,VisibilityOff} from '@mui/icons-material';


// Redux
import { useDispatch } from 'react-redux';
import { authActions } from '../features/auth/authSlice';

interface UserType {
    email: string;
    password: string;
  };
const initState:UserType = {
    email: '',
    password: '',
}

export const Landing = () => {
    // Initialize state
    const [userInfo, setUserInfo] = useState(initState);
    //const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    // Handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserInfo(oldInfo => ({
            ...oldInfo,
            [name]:value
            })
          );
    }


    // useEffect watches for changes in email state and update the emailError state accordingly
    useEffect(() => {
        if(!isValidEmail(userInfo.email)){
            setEmailError("Email is invalid")
        }else{
            setEmailError("")
        } //have to have the else state here so the error message disappears when the user types the correct email
    }, [userInfo.email])

    const dispatch = useDispatch();
    // Submit the email and password
    const auth = getAuth();
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential)=>{
        const user = userCredential.user;
        });
        // Once the user clicks login, the Layout page will be displayed
        dispatch(authActions.login());
        navigate('/');
    };
    
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
                <OutlinedInput id="email" name="email" value={userInfo.email} onChange={handleChange} fullWidth required/>
                <FormHelperText error className="helper-text">{userInfo.email.length > 0 && emailError}</FormHelperText>
                <InputLabel htmlFor="password" shrink={false}>Password </InputLabel>
                <OutlinedInput id="password" name="password" value={userInfo.password} onChange={handleChange} fullWidth required
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
                <SubmitButton textLabel="SIGN IN" />
            </form>
            <Link to='/register'>Don't have an account? Sign up</Link>
    </LandingLayout> 
   
  )
};