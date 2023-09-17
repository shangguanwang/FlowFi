import React from 'react';
import PieCharts from '../components/charts/PieCharts';
import ProgressBar from '../components/charts/ProgressBar';
import NetWorthCard from '../components/layout/NetWorthCard';
import { calcGoalsPct } from '../components/functions/functions';

import type { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

export const Home = () => {
  const assetsData = useSelector((store: RootState)=>store.assets);
  const assetsPieData = assetsData.map((item,index)=>({Name:item['Name'], Amount:item['Amount']}));
  const debtData = useSelector((store: RootState)=>store.debt);
  const debtPieData = debtData.map((item,index)=>({Name:item['Name'], Amount:item['Amount']}));
  
  const goalsData = useSelector((store: RootState)=>store.goals);
  const savedPct:number = calcGoalsPct(goalsData);

  return (
    <div className="subpage">
        <header>
            <h1 className="text-4xl font-bold m-4">Welcome, Cocoa</h1>
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
