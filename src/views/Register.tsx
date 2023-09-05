import React from 'react'
import { LandingLayout } from '../components/layout/LandingLayout'
import { Link } from 'react-router-dom'

export const Register = () => {
  return (
    <LandingLayout>
        Register
        <Link to='/'>Already have an account? Log In</Link>
    </LandingLayout>
  )
}