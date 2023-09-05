import React from 'react'

import {
    OutlinedInput,
    InputLabel,
  } from '@mui/material';

  interface FormRowProps {
    name: string;
    value: string;
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    textLabel: string;
  } 

const FormRow: React.FC<FormRowProps> = ({name, value, handleChange, textLabel}) => {
  return (
    <div>
        <InputLabel htmlFor={name} shrink={false}>{textLabel}</InputLabel>
        <OutlinedInput id={name} name={name} 
        value={value} onChange={handleChange}
        fullWidth required/>
    </div>
  )
}

export default FormRow