import React from 'react';
import PieCharts from '../components/charts/PieCharts';
import ProgressBar from '../components/charts/ProgressBar';
import NetWorthCard from '../components/layout/NetWorthCard';
import { calcGoalsPct } from '../components/functions/functions';
import type { RootState } from '../redux/store';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

import { useNavigate  } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../features/auth/authSlice';

export const Home = () => {
  const assetsData = useSelector((store: RootState)=>store.assets);
  const assetsPieData = assetsData.map((item,index)=>({Name:item['Name'], Amount:item['Amount']}));
  const debtData = useSelector((store: RootState)=>store.debt);
  const debtPieData = debtData.map((item,index)=>({Name:item['Name'], Amount:item['Amount']}));
  
  const goalsData = useSelector((store: RootState)=>store.goals);
  const savedPct:number = calcGoalsPct(goalsData);

  // Log Out
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = ()=> {
    signOut(auth).then(()=>{
      dispatch(authActions.logout());
      navigate("/");
    }).catch((error)=>{
      console.log(error);
    });
  };

  return (
    <div className="subpage">
        <header>
            <h1 className="text-4xl font-bold m-4">Welcome, Cocoa</h1>
            <Button onClick={handleLogout}>Logout</Button>
        </header>
        <main>
          <NetWorthCard />
          <Grid container>
            <Grid item xs={5}>
              <PieCharts originalData={assetsPieData} title="Assets Breakdown"/>
            </Grid>
            <Grid item xs={5}>
              <PieCharts originalData={debtPieData} title="Debt Breakdown"/>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <ProgressBar percent={savedPct} label={"Saved towards Goals"}/>
            </Grid>
          </Grid>
        </main>
    </div>
  )
}
