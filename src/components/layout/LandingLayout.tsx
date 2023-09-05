import React, { ReactNode }  from 'react'
import Logo from '../../components/Logo';
import '../../styles/Landing.scss'
import landingImg from '../../assets/landing-image-transparent.png'

interface CommonLayoutProps {
    children: ReactNode;
  }

export const LandingLayout:React.FC<CommonLayoutProps> = ({children}) => {
   
  return (
    <div className='landing-container'>
    <div>
        <nav>
        <Logo />
        </nav>
        <div className='landing-info'>
            <h1>Managing Your Financial Well-being, at Anytime</h1>
            <p> Your all-in-one solution for tracking your wealth portfolio and monthly cash flow. </p>
            {children}
        </div>
    </div>
     <img src={landingImg} alt='financial-dashboard-illustration' className='landing-img'/>
    </div>
  )
};