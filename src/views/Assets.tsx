import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, deleteData } from '../api/firebase';
import { AssetsFormType, DatagridColumnType} from '../state/types';
import {calcAmountTotal} from '../components/functions/functions';
// import components
import AddButton from '../components/layout/AddButton';
//import redux
import type { RootState } from '../redux/store';
import { setAssetsData } from '../redux/assetsSlice';
import { useDispatch, useSelector } from 'react-redux';
//import MUI
import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridActionsCellItem} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NumberCard from '../components/layout/NumberCard';


export const Assets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assetsData:AssetsFormType[] = useSelector((store: RootState)=>store.assets);
  //calculate assets total
  const totalAmount:number = calcAmountTotal<AssetsFormType>(assetsData);

  //define a delete function
  const handleDelete = (id:string) => {
    deleteData(id, "assets");
    // delete the row from data grid
    const updatedAssets = assetsData.filter((asset)=>asset["id"] !== id);
    dispatch(setAssetsData(updatedAssets));
  }
  //define an edit function
  const handleEdit = (id:string) => {
    const assetToEdit = assetsData.find((asset)=>asset["id"] === id);

    if(assetToEdit){
      navigate(`/assets/edit/${id}`, {state: assetToEdit});
    }
  }

  // prepare columns for Data Grid Table
  const assetsColumns:DatagridColumnType[] = [
    {
      field: "Name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "Amount",
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
    width: 100,
     getActions: (params) => {
      const id = String(params.id);

      return[
      <GridActionsCellItem
      icon={<EditIcon />}
      label="Edit"
      onClick={()=>handleEdit(id)}
    />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={()=>handleDelete(id)}
    />  ]
      }
    }
  ]

  // fetch data from Firebase when the component mounts
  useEffect(()=>{
    const fetchData = async() => {
      const data: AssetsFormType[] = await getData("assets");
      const formattedData: AssetsFormType[] = data.map((item)=>({
        ...item,
        assetAmount: Number(item.Amount), // ensure Amount has type number
      }))
      //setAssetsData(formattedData);
      dispatch(setAssetsData(formattedData));
    };
    fetchData();
  },[dispatch])

  return (
    <div className="subpage">
      <h1 className="text-4xl font-bold m-4">Assets</h1>
      <NumberCard label="Total Assets" num={totalAmount} />
      <Box mt="1rem" p="0 0.5rem" sx={{ width: '40%'}}>
        <DataGrid autoHeight rows={assetsData} columns={assetsColumns} hideFooter={true}/>
      </Box>
      <AddButton linkurl="/assets/add" btntxt="Add Asset" />
    </div>
  )
}