import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddButton from '../../components/layout/AddButton';
import NumberCard from '../../components/layout/NumberCard';
import { getData, deleteData } from '../../api/firebase';
import { DatagridColumnType, GoalFormType } from '../../state/types';
//import redux
import type { RootState } from '../../redux/store';
import { setGoalsData } from '../../redux/goalsSlice';
import { useDispatch, useSelector } from 'react-redux';
//import MUI
import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridActionsCellItem} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import functions
import { calcAmountTotal, calcSavedTotal } from '../../components/functions/functions';

export const Goals = () => {
  const goalsData: GoalFormType[] = useSelector((store: RootState)=>store.goals);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // calculation
  const totalAmount:number = calcAmountTotal<GoalFormType>(goalsData);
  const totalSaved:number = calcSavedTotal(goalsData);
  const totalToGo:number = totalAmount - totalSaved;
  //define a delete function
  const handleDelete = (id:string) => {
    deleteData(id, "goals");
    // delete the row from data grid
    const updatedGoals = goalsData.filter((item)=>item["id"] !== id);
    dispatch(setGoalsData(updatedGoals));
  }
  //define an edit function that directs users to a separate page to edit a particular debt item
  const handleEdit = (id:string) => {
    const goalsToEdit = goalsData.find((item)=>item["id"] === id);

    if(goalsToEdit){
      navigate(`/goals/edit/${id}`, {state: goalsToEdit});
    }
  }
  const goalsColumns: DatagridColumnType[] = [
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
      field: "Saved",
      headerName: "Saved So Far",
      width: 150,
      renderCell: (params: GridCellParams)=> `$${params.value}`, 
    },
    {
      field: "Due",
      headerName: "Due Date",
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
      const data: GoalFormType[] = await getData("goals");
      const formattedData: GoalFormType[] = data.map((item)=>({
        ...item,
        Amount: Number(item.Amount), // ensure Amount has type number
      }))
      dispatch(setGoalsData(formattedData));
    };
    fetchData();
  },[dispatch]);

  return (
    <div className="subpage">
      <h1 className="text-4xl font-bold m-4">Goals</h1>
      <div className="flex space-x-6">
      <NumberCard label="Total Needed" num={totalAmount} /> 
      <NumberCard label="Total Saved" num={totalSaved} />
      <NumberCard label="To Go" num={totalToGo} /> 
      </div>
      <Box mt="1rem" p="0 0.5rem" sx={{ width: '50%'}}>
        <DataGrid autoHeight rows={goalsData} columns={goalsColumns} hideFooter={true}/>
      </Box>
      <AddButton linkurl="/goals/add" btntxt="Add Goal" />
    </div>
  )
}

export default Goals