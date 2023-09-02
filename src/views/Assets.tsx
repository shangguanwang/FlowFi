import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../api/firebase';

// Define an interface for the assetFormData object
interface AssetsFormType {
  assetName: string;
  assetAmount: number;
  assetType: string;
  id: string;
}

export const Assets = () => {
  const [assetsData, setAssetsData] = useState<AssetsFormType[]>([]); // an array of objects

  // fetch data from Firebase when the component mounts
  useEffect(()=>{
    const fetchData = async() => {
      const data: AssetsFormType[] = await getData();
      setAssetsData(data);
    };

    fetchData();
  },[])

  return (
    <div className="subpage">
      <h1>Assets</h1>
      <Link to="/assets/add">
        <button>+ Add Asset</button>
      </Link>
      <p>Net Assets: $XXX</p>
      Assets Table
      {assetsData.map((asset)=>(
        <li key={asset.id}>
          {asset.assetName}
          {asset.assetAmount}
          {asset.assetType}
        </li>
      ))}
    </div>
  )
}

