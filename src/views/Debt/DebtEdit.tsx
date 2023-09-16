import React, { useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { DebtFormType } from '../../state/types';
import { updateDebtData } from '../../api';
// Import Components
import FormRow from '../../components/FormRow';
import SubmitButton from '../../components/layout/SubmitButton';
// Import Redux
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setDebtData } from '../../redux/debtSlice';

import { Button, InputLabel } from '@mui/material';

const DebtEdit = () => {
    const location = useLocation();
    const debtToEdit = location.state;
    const { id } = useParams();
    const [formData, setFormData] = useState<DebtFormType>(debtToEdit);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const debtData = useSelector((store: RootState)=>store.debt);
    // handleEdit() function updates formData as we receive user input
    const handleEdit =(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]:value,
            }))
    }
    // handleSubmit() updates data in the database
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       try {
           // update the data in firebase
           updateDebtData(id, formData);
           // update the table on Debt page
           const updatedDebtData:DebtFormType[] = debtData.map((item)=>item["id"] === id?formData:item)
           dispatch(setDebtData(updatedDebtData))
           
       } catch(error){
           console.log(error);
       }
       navigate("/debt"); //redirects back to debt page
   };

   //handleCancel() goes back to the debt page
   const handleCancel = () => {
       navigate("/debt"); 
   }
    return (
    <div className="subpage">
    <h1>Edit Debt</h1>
    <form onSubmit={handleSubmit}>
        <FormRow type="text" name="debtName" value={formData.debtName} handleChange={handleEdit} textLabel="Name"/>   
        <FormRow type="number" name="debtAmount" value={formData.debtAmount} handleChange={handleEdit} textLabel="Amount"/>

        <InputLabel id="debtType" shrink={false}>Type</InputLabel>
        <select id="debtType" name="debtType"
            value={formData.debtType}
            onChange={handleEdit} >
            <option value="Mortgage">Mortgage</option>
            <option value="Carloan">Car Loan</option>
            <option value="Studentloan">Student Loan</option>
            <option value="Creditcard">Credit Card</option>
            <option value="Other">Other</option>
        </select>
        <FormRow type="number" name="debtApr" value={formData.debtApr} handleChange={handleEdit} textLabel="Annual Interest Rate(%)"/>
        <SubmitButton textLabel="Save" />
        <Button onClick={handleCancel}>Cancel</Button>
      </form>
    </div>
  )
}

export default DebtEdit