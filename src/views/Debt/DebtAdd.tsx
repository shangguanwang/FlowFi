import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import component
import SubmitButton from '../../components/layout/SubmitButton';
import FormRow from '../../components/FormRow';
import { DebtFormType } from '../../state/types';
// import MUI
import { InputLabel } from '@mui/material';
import { addDebtData } from '../../api';

const DebtAdd = () => {
    const [formData, setFormData] = useState<DebtFormType>({
        Name: '',
        Amount: 0,
        debtType: 'Mortgage',
        debtApr: 0,
    })
    // handleAdd() function updates formData as we receive user input
    const handleAdd =(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        setFormData(prevData => ({
        ...prevData,
        [name]:type==='number'?parseFloat(value):value,
        }))
    }
    const navigate = useNavigate();
    // handleSubmit() sends formData to the database
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addDebtData(formData);
          
        } catch(error){
            console.log(error);
        }
        navigate("/debt"); //redirects back to Debt page
        };
  return (
    <div className="subpage">
    <h1>Add Debt</h1>
    <form onSubmit={handleSubmit}>
        <FormRow type="text" name="Name" value={formData.Name} handleChange={handleAdd} textLabel="Name"/>   
        <FormRow type="number" name="Amount" value={formData.Amount} handleChange={handleAdd} textLabel="Amount"/>

        <InputLabel id="debtType" shrink={false}>Type</InputLabel>
        <select id="debtType" name="debtType"
            value={formData.debtType}
            onChange={handleAdd} >
            <option value="Mortgage">Mortgage</option>
            <option value="Carloan">Car Loan</option>
            <option value="Studentloan">Student Loan</option>
            <option value="Creditcard">Credit Card</option>
            <option value="Other">Other</option>
        </select>
        <FormRow type="number" name="debtApr" value={formData.debtApr} handleChange={handleAdd} textLabel="Annual Interest Rate(%)"/>
        <SubmitButton textLabel="Save" />
      </form>
    </div>
  )
}

export default DebtAdd