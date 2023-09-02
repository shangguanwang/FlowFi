import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface pieDataType{
  name:string;
  value:number;
  fill:string;
}

const colors = ['#FF5733', '#FFC300', '#4CAF50', '#2196F3', '#9C27B0'];
//test data
const data:pieDataType[] = [
  {name: "Citi", value:500, fill: colors[0]},
  {name:"Coinbase", value: 200, fill: colors[1]},
  {name:"Cold Wallet", value:100, fill:colors[2]}
]

// takes a data prop which is an array of objects with key name and value
const PieCharts = () => {
  return (
    <>
    <ResponsiveContainer width={700} height={500} >
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
      />
      {data.map((item,index)=>(
        <Cell key={`cell-${index}`} fill={colors[index]}/>
      ))}
    </PieChart>
  </ResponsiveContainer>
  </>
  )
}

export default PieCharts