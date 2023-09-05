import React, { useState }  from 'react'
import './AssetsAdd.styles.scss'
import { AssetsFormType } from '../state/types'
import { useNavigate } from 'react-router-dom';
import { addData } from '../api/firebase'

// Import MUI 
import { InputLabel } from '@mui/material';
// Import Components
import FormRow from '../components/FormRow';
import SubmitButton from '../components/layout/SubmitButton';

export const AssetsAdd = () => {
    const [formData, setFormData] = useState<AssetsFormType>({
        assetName: '',
        assetAmount: 0,
        assetType: 'cash', // initialize cash as the default type
      });
      // handleAdd() function updates formData as we receive user input
      const handleAdd =(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]:value,
        }))
      }
      // useNavigate() redirects users back to Assets page upon successful form submission
      const navigate = useNavigate();

      // handleSubmit() sends formData to the database
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          await addData(formData);
          
        } catch(error){
          console.log(error);
        }
        navigate("/assets"); //redirects back to Assets page
      };
  return (
    <div className="subpage">
    <h1>Add Assets</h1>
    <form className="Assets-form" onSubmit={handleSubmit}>
      <FormRow type="text" name="assetName" value={formData.assetName} handleChange={handleAdd} textLabel="Name"/>   
      <FormRow type="number" name="assetAmount" value={formData.assetAmount} handleChange={handleAdd} textLabel="Amount"/>

        <InputLabel htmlFor="assetType" shrink={false}>Type</InputLabel>
        <select id="assetType" name="assetType"
        value={formData.assetType}
        onChange={handleAdd} >
          <option value="Cash">Cash</option>
          <option value="Checking">Checking</option>
          <option value="Saving">Saving</option>
          <option value="Stocks">Stocks</option>
          <option value="Crypto">Crypto</option>
          <option value="Other">Other</option>
        </select>
        <SubmitButton textLabel="Save" />
      </form>
    </div>
  )
}
