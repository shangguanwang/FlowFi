import React from 'react'
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { RootState } from '../../redux/store';

interface pieDataType{
  name:string;
  value:number;
  fill:string;
}

const colors = ['#2B0B3F', '#57167E', '#9B3192', '#EA5F89', '#F7B7A3', '#FFF1C9'];

// takes a data prop which is an array of objects with key name and value
const PieCharts = () => {
  const assetsData = useSelector((store: RootState)=>store.assets);
  const chartData = assetsData.map((item,index)=>({name:item['assetName'], value:item['assetAmount'], fill:colors[index]}));
  
  return (
    <>
    <ResponsiveContainer width={700} height={500} >
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
      />
      {chartData.map((item,index)=>(
        <Cell key={`cell-${index}`} fill={colors[index%colors.length]}/>
      ))}
    </PieChart>
  </ResponsiveContainer>
  </>
  )
}

export default PieCharts