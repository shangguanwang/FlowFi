import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../components/layout/SubmitButton';
import FormRow from '../../components/FormRow';
import { GoalFormType } from '../../state/types';
import { TextField } from '@mui/material';
import { addGoalsData } from '../../api';

const GoalsAdd = () => {
    const [formData, setFormData] = useState<GoalFormType>({
        Name: '',
        Amount: 0,
        Saved: 0,
        Due: new Date(),
      })

    // handleAdd() function updates formData as we receive user input
    const handleAdd =(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, type} = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: type==='number'?parseFloat(value):value,
        }))
    }
    // useNavigate() redirects users back to Assets page upon successful form submission
      const navigate = useNavigate();

    // handleSubmit() sends formData to the database
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          await addGoalsData(formData);
        } catch(error){
          console.log(error);
        }
        navigate("/goals"); //redirects back to Goals page
      };
  return (
    <div className="subpage">
        <h1>Add Goal</h1>
        <form onSubmit={handleSubmit}>
        <FormRow type="text" name="Name" value={formData.Name} handleChange={handleAdd} textLabel="Name"/> 
        <FormRow type="number" name="Amount" value={formData.Amount} handleChange={handleAdd} textLabel="Amount"/>
        <br/>
        <TextField type="date" label="Due Date" name="Due" value={formData.Due} onChange={handleAdd} fullWidth required></TextField>
        <SubmitButton textLabel="Save" />
      </form>
    </div>
  )
}

export default GoalsAdd