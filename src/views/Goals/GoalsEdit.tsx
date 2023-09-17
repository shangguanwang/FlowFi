import React, { useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { GoalFormType } from '../../state/types';
import { updateGoalsData } from '../../api';
// Import Components
import FormRow from '../../components/FormRow';
import SubmitButton from '../../components/layout/SubmitButton';
// Import Redux
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setGoalsData } from '../../redux/goalsSlice';
import { TextField , Button } from '@mui/material';

const GoalsEdit = () => {
    const location = useLocation();
    const goalToEdit = location.state;
    const { id } = useParams();
    const [formData, setFormData] = useState<GoalFormType>(goalToEdit);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const goalsData = useSelector((store: RootState)=>store.goals);
    // handleEdit() function updates formData as we receive user input
    const handleEdit =(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, type} = e.target;
        setFormData(prevData => ({
             ...prevData,
            [name]: type==='number'?parseFloat(value):value,
        }))
    }
    // handleSubmit() updates data in the database
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       try {
           // update the data in firebase
           updateGoalsData(id, formData);
           // update the table on Goals page
           const updatedGoalsData:GoalFormType[] = goalsData.map((item)=>item["id"] === id?formData:item)
           dispatch(setGoalsData(updatedGoalsData))
           
       } catch(error){
           console.log(error);
       }
       navigate("/goals"); //redirects back to Goals page
   };
    //handleCancel() goes back to the Goals page
   const handleCancel = () => {
    navigate("/goals"); 
}
  return (
    <div className="subpage">
        <h1>Edit Goal</h1>
        <form onSubmit={handleSubmit}>
        <FormRow type="text" name="Name" value={formData.Name} handleChange={handleEdit} textLabel="Name"/> 
        <FormRow type="number" name="Amount" value={formData.Amount} handleChange={handleEdit} textLabel="Amount"/>
        <FormRow type="number" name="Saved" value={formData.Saved} handleChange={handleEdit} textLabel="Saved"/>
        <br/>
        <TextField type="date" label="Due Date" name="Due" value={formData.Due} onChange={handleEdit} fullWidth required></TextField>
        <SubmitButton textLabel="Save" />
        <Button onClick={handleCancel}>Cancel</Button>
      </form>
    </div>
  )
}

export default GoalsEdit