import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData, deleteData } from '../api/firebase';
import { AssetsFormType} from '../state/types';
import {calculateAssetTotal} from '../components/functions/functions';

//import redux
import { RootState } from '../redux/store';
import { setAssetsData } from '../redux/assetsSlice';
import { useDispatch, useSelector } from 'react-redux';
//import MUI
import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface AssetsColumnType{
  field:string;
  headerName:string;
  width: number;
  renderCell?:(params:GridCellParams)=>string;
  type?: string;
  getActions?: (params: GridRowParams) => JSX.Element[];
}

export const Assets = () => {
  const dispatch = useDispatch();
  const assetsData = useSelector((store: RootState)=>store.assets);
  //calculate assets total
  const totalAmount = calculateAssetTotal(assetsData);

  //define a delete function
  const handleDelete = (id:string) => {
    deleteData(id, "assets");
    // delete the row from data grid
    const updatedAssets = assetsData.filter((asset)=>asset["id"] !== id);
    dispatch(setAssetsData(updatedAssets));
  }
  //define an edit function
  const handleEdit = (id:string) => {
    console.log("Edit");
  }
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
      width: 150,
    },
    {field: "actions",
    headerName: "Actions",
    type:"actions",
    width: 150,
     getActions: (params) => [
      <GridActionsCellItem
      icon={<EditIcon />}
      label="Edit"
      onClick={()=>handleEdit(String(params.id))}
    />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={()=>handleDelete(String(params.id))}
    />]
    }
  ]

  // fetch data from Firebase when the component mounts
  useEffect(()=>{
    const fetchData = async() => {
      const data: AssetsFormType[] = await getData("assets");
      const formattedData: AssetsFormType[] = data.map((item)=>({
        ...item,
        assetAmount: Number(item.assetAmount), // ensure Amount has type number
      }))
      //setAssetsData(formattedData);
      dispatch(setAssetsData(formattedData));
    };
    fetchData();
  },[dispatch])

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