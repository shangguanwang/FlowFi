import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddBtnProps {
    linkurl: string;
    btntxt: string;
}

const AddButton:React.FC<AddBtnProps> = ({linkurl, btntxt}) => {
  return (
    <div className="mt-3">
      <Link to={linkurl}>
        <Button startIcon={<AddIcon/>} variant="outlined">{btntxt}</Button>
      </Link>
  </div>
  )
}

export default AddButton