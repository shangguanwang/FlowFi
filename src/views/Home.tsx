import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import NumberCard from '../components/layout/NumberCard';
import PieCharts from '../components/charts/PieCharts';
import { calculateAssetTotal } from '../components/functions/functions';

export const Home = () => {
  const assetsData = useSelector((store: RootState)=>store.assets);
  const totalAssets = calculateAssetTotal(assetsData);
  return (
    <div className="subpage">
        <header>
            <h1>Welcome, Cocoa</h1>
        </header>
        <main>
          <NumberCard totalAssets={totalAssets}/>
          <PieCharts />
        </main>
    </div>
  )
}
