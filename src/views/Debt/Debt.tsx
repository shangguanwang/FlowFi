import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatagridColumnType, DebtFormType} from '../../state/types';
import { getData, deleteData } from '../../api/firebase';
//import MUI
import { Box } from '@mui/material';
import { DataGrid, GridCellParams, GridActionsCellItem} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import components
import AddButton from '../../components/layout/AddButton';
import { calculateDebtTotal, calcMonthlyIntTotal } from '../../components/functions/functions';
// import redux
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setDebtData } from '../../redux/debtSlice';
import NumberCard from '../../components/layout/NumberCard';


export const Debt = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const debtData = useSelector((store: RootState)=>store.debt);
  // Calculation
  const totalAmount = calculateDebtTotal(debtData);
  const totalMonthlyInterest = calcMonthlyIntTotal(debtData);
  //define a delete function
  const handleDelete = (id:string) => {
    deleteData(id, "debt");
    // delete the row from data grid
    const updatedDebt = debtData.filter((item)=>item["id"] !== id);
    dispatch(setDebtData(updatedDebt));
  }
  //define an edit function that directs users to a separate page to edit a particular debt item
  const handleEdit = (id:string) => {
    const debtToEdit = debtData.find((item)=>item["id"] === id);

    if(debtToEdit){
      navigate(`/debt/edit/${id}`, {state: debtToEdit});
    }
  }
  const debtColumns:DatagridColumnType[] = [
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
      field: "debtType",
      headerName: "Type",
      width: 150,
    },
    {
      field: "debtApr",
      headerName: "Interest Rate(%)",
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
  ];
  // fetch data from Firebase when the component mounts
  useEffect(()=>{
    const fetchData = async() => {
      const data: DebtFormType[] = await getData("debt");
      const formattedData: DebtFormType[] = data.map((item)=>({
        ...item,
        Amount: Number(item.Amount), // ensure Amount has type number
        debtApr: Number(item.debtApr),
      }))
      dispatch(setDebtData(formattedData));
    };
    fetchData();
  },[dispatch]);

  return (
    <div className="subpage">
      <h1>Debt</h1>
      <NumberCard label="Total Debt" num={totalAmount} />
      <NumberCard label="Monthly Payment" num={totalMonthlyInterest} />
      <Box mt="1rem" p="0 0.5rem" sx={{ width: '50%'}}>
        <DataGrid autoHeight rows={debtData} columns={debtColumns} hideFooter={true}/>
      </Box>
      <AddButton linkurl="/debt/add" btntxt="Add Debt" />
    </div>
  )
}
