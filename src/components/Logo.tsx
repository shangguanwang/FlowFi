import React from 'react'
import '../styles/Logo.scss'
// import icons from Material UI
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const Logo = () => {
  return (
    <div className='logo-container'>
        <AutoGraphIcon fontSize="large"/> 
        <h1>FlowFi</h1>
    </div>
  )
}

export default Logo