import React from 'react'

import {Button} from '@mui/material';

interface SubmitButtonProps {
    textLabel: string;
  }

const SubmitButton:React.FC<SubmitButtonProps> = ({textLabel}) => {
  return (
    <Button className="btn" type="submit" variant="contained" fullWidth sx={{mt:3, mb:2}}>{textLabel}</Button>
  )
}

export default SubmitButton