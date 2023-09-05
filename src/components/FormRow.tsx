import React from 'react'

import {
    OutlinedInput,
    InputLabel,
  } from '@mui/material';

  interface FormRowProps {
    type: 'text' | 'number';
    name: string;
    value: string | number;
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    textLabel: string;
  } 

const FormRow: React.FC<FormRowProps> = ({type, name, value, handleChange, textLabel}) => {
  return (
    <div>
        <InputLabel htmlFor={name} shrink={false}>{textLabel}</InputLabel>
        <OutlinedInput type={type} id={name} name={name} 
        value={value} onChange={handleChange}
        fullWidth required/>
    </div>
  )
}

export default FormRow