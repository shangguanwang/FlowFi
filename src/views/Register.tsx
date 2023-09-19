import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// Import firebase Auth
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// Import Components
import { LandingLayout } from '../components/layout/LandingLayout'
import { isValidEmail } from '../components/functions/functions';
import FormRow from '../components/FormRow';
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

interface newUserType {
  name: string;
  email: string;
  password: string;
  isMember: boolean;
}

const initState:newUserType = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
export const Register = () => {
  const [userInfo, setUserInfo] = useState(initState);
  const [emailError, setEmailError] = useState('');

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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
        // Set the displayName for the newly created user
        updateProfile(user, {
          displayName: userInfo.name,
        })})
        .then(()=>{
            // Once the user successfully created an account, the Layout page will be displayed
          dispatch(authActions.login());
          navigate('/');
        })
      .catch((error)=>{
        console.log("Error creating user:", error);
      });
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
                <InputLabel htmlFor="email" shrink={false}>Email </InputLabel>
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
                <FormRow type="text" name="name" value={userInfo.name} handleChange={handleChange} textLabel="Name" />
                <SubmitButton textLabel="CREATE ACCOUNT" />
            </form>
        <Link to='/'>Already have an account? Log In</Link>
    </LandingLayout>
  )
}