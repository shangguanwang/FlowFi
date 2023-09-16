import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

interface NumberCardProps {
  label: string;  
  num: number;
  }

const NumberCard:React.FC<NumberCardProps> = ({label, num}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardContent>
        <Typography variant="h6" component="div">
            {label}
        </Typography>
        <Typography variant="h5">
          ${num}
        </Typography>
        </CardContent>
    </Card>
  )
}

export default NumberCard