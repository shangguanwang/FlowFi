import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

interface NumberCardProps {
    totalAssets: number;
  }

const NumberCard:React.FC<NumberCardProps> = ({totalAssets}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardContent>
        <Typography variant="h5" component="div">
            Net Worth
        </Typography>
        <Typography variant="h6">
          Total Assets: {totalAssets}
        </Typography>
        </CardContent>
    </Card>
  )
}

export default NumberCard