import React from 'react'
import PieCharts from '../components/charts/PieCharts';

export const Home = () => {
  return (
    <div className="subpage">
        <header>
            <h1>Welcome, Cocoa</h1>
            Net Worth 
            <PieCharts />
        </header>
    </div>
  )
}
