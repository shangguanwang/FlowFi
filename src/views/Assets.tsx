import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../api/firebase';
import Box from '@mui/material/Box';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { AssetsFormType } from '../state/types'

interface AssetsColumnType{
  field:string;
  headerName:string;
  width: number;
  renderCell?:(params:GridCellParams)=>string;
}

export const Assets = () => {
  const [assetsData, setAssetsData] = useState<AssetsFormType[]>([]); // an array of objects
  //calculate assets total
  const totalAmount:number = assetsData.reduce((acc, item)=> acc+item.assetAmount,0)
  
  // prepare columns for Data Grid Table
  const assetsColumns:AssetsColumnType[] = [
    {
      field: "assetName",
      headerName: "Name",
      width: 150
    },
    {
      field: "assetAmount",
      headerName: "Amount",
      width: 150,
      renderCell: (params: GridCellParams)=> `$${params.value}`, //add a dollar sign
    },
    {
      field: "assetType",
      headerName: "Type",
      width: 150
    },
  ]
  // fetch data from Firebase when the component mounts
  useEffect(()=>{
    const fetchData = async() => {
      const data: AssetsFormType[] = await getData();
      const formattedData: AssetsFormType[] = data.map((item)=>({
        ...item,
        assetAmount: Number(item.assetAmount), // ensure Amount has type number
      }))
      setAssetsData(formattedData);
    };

    fetchData();
  },[])

  return (
    <div className="subpage">
      <h1>Assets</h1>
      <Link to="/assets/add">
        <button>+ Add Asset</button>
      </Link>
      <p>Net Assets: ${totalAmount}</p>
      <Box mt="1rem" p="0 0.5rem" sx={{ width: '40%'}}>
        <DataGrid autoHeight rows={assetsData} columns={assetsColumns}
        hideFooter={true}/>
      </Box>
    </div>
  )
}

