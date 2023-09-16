import React from 'react';
import PieCharts from '../components/charts/PieCharts';
import NetWorthCard from '../components/layout/NetWorthCard';

export const Home = () => {

  return (
    <div className="subpage">
        <header>
            <h1>Welcome, Cocoa</h1>
        </header>
        <main>
          <NetWorthCard />
          <PieCharts />
        </main>
    </div>
  )
}
