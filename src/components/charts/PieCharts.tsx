import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


type OriginalDataType = {
  Name: string;
  Amount: number;
}
type PieChartsProps = {
  originalData: OriginalDataType[];
  title: string;
}

const colors = ['#2B0B3F', '#57167E', '#9B3192', '#EA5F89', '#F7B7A3', '#FFF1C9'];

// takes a data prop which is an array of objects with key name and value
const PieCharts:React.FC<PieChartsProps> = ({originalData, title}) => {
  const chartData = originalData.map((item,index)=>({name:item['Name'], value:item['Amount'], fill:colors[index]}));
  return (
    <>
    <h3>{title}</h3>
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