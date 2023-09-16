import React from 'react';

import { DatagridColumnType} from '../../state/types';
//import MUI
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// import components
import AddButton from '../../components/layout/AddButton';

export const Debt = () => {
  const debtData:[] = [];
  const debtColumns:DatagridColumnType[] = [];
  return (
    <div className="subpage">
      <h1>Debt</h1>
      <AddButton linkurl="/debt/add" btntxt="Add Debt" />
      <p>Net Assets: $XX</p> 
      <Box mt="1rem" p="0 0.5rem" sx={{ width: '40%'}}>
        <DataGrid autoHeight rows={debtData} columns={debtColumns} hideFooter={true}/>
      </Box>
    </div>
  )
}
