import React, { useState }  from 'react'
import './AssetsAdd.styles.scss'
import { useNavigate } from 'react-router-dom';
import { addData } from '../api/firebase'

// Define an interface for the assetFormData object
interface AssetsFormType {
    assetName: string;
    assetAmount: number;
    assetType: string;
  }
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
        <label htmlFor="assetName">Name</label>
        <input type="text" id="assetName" name="assetName" 
        value={formData.assetName} 
        onChange={handleAdd}
        required></input>
        
        <label htmlFor="assetAmount">Amount</label>
        <input type="number" id="assetAmount" name="assetAmount"
        value={formData.assetAmount} 
        onChange={handleAdd}
        required></input>

        <label htmlFor="assetType">Type</label>
        <select id="assetType" name="assetType"
        value={formData.assetType}
        onChange={handleAdd} >
          <option value="cash">Cash</option>
          <option value="checking">Checking</option>
          <option value="saving">Saving</option>
          <option value="stocks">Stocks</option>
          <option value="crypto">Crypto</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
