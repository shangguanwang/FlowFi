import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { AssetsFormType } from '../state/types';
import { updateData } from '../api';
// Import MUI 
import { Button, InputLabel } from '@mui/material';
// Import Components
import FormRow from '../components/FormRow';
import SubmitButton from '../components/layout/SubmitButton';
// Import Redux
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setAssetsData } from '../redux/assetsSlice';

interface AssetsEditProps {
    assetToEdit?: AssetsFormType;
}

const AssetsEdit: React.FC<AssetsEditProps> = () => {
    const location = useLocation();
    const assetToEdit = location.state;
    const { id } = useParams();
    const [formData, setFormData] = useState<AssetsFormType>(assetToEdit);
    
    // handleEdit() function updates formData as we receive user input
    const handleEdit =(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]:value,
            }))
    }
    // useNavigate() redirects users back to Assets page upon successful form submission
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const assetsData = useSelector((store: RootState)=>store.assets);
    // handleSubmit() updates data in the database
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();
        try {
            // update the data in firebase
            updateData(id, "assets", formData);
            // update the table on Assets page
            const updatedAssetsData:AssetsFormType[] = assetsData.map((asset)=>asset["id"] === id?formData:asset)
            dispatch(setAssetsData(updatedAssetsData))
            
        } catch(error){
            console.log(error);
        }
        navigate("/assets"); //redirects back to Assets page
    };

    //handleCancel() goes back to the assets page
    const handleCancel = () => {
        navigate("/assets"); 
    }
    return (
        <div className="subpage">
        <h1>Edit Assets</h1>
        <form className="Assets-form" onSubmit={handleSubmit}>
          <FormRow type="text" name="assetName" value={formData.assetName} handleChange={handleEdit} textLabel="Name"/>   
          <FormRow type="number" name="assetAmount" value={formData.assetAmount} handleChange={handleEdit} textLabel="Amount"/>
    
            <InputLabel htmlFor="assetType" shrink={false}>Type</InputLabel>
            <select id="assetType" name="assetType"
            value={formData.assetType}
            onChange={handleEdit} >
              <option value="Cash">Cash</option>
              <option value="Checking">Checking</option>
              <option value="Saving">Saving</option>
              <option value="Stocks">Stocks</option>
              <option value="Crypto">Crypto</option>
              <option value="Other">Other</option>
            </select>
            <SubmitButton textLabel="Save" />
            <Button onClick={handleCancel}>Cancel</Button>
          </form>
        </div>
      )
}

export default AssetsEdit;