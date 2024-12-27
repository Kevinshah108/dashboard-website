import React, { useEffect, useState } from 'react'
import { Line, Bar} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {

  const [chartData, setChartData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios.get("https://test.topengr.com/api/v1/assessment/dashboard").then((response) => {
      const data = response.data;
      setChartData(data);
      setLoading(false);
    }).catch((err)=>{
      console.error("Error fetching data:", err);
      setError("Failed to load data");
      setLoading(false);
    });
  },[]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return<div>{error}</div>;
  }

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Data 1",
        data: chartData.data1,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1, 
      },
      {
        label: "Data 2", 
        data: chartData.data2,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: chartData.chartTitle || "Points Scored",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Teams",
        },
      },
      y: {
        title: {
          display: true,
          text: "Points", 
        },
      },
    },
  };


  return (
    <>
    <div className="bg-[#F0F4F8] text-black p-4 ">
    <h2 className='text-4xl font-semibold mb-4 flex justify-center'>Dashboard</h2>
    <div className='flex flex-row gap-4 text-black justify-center m-4'>
        <div className='bg-white rounded-md flex flex-col p-4 w-[100%] h-[100%] text-4xl'>
          <strong>Data Point 1:</strong> ${chartData.dp1}
        </div>
        <div className='bg-white rounded-md flex p-4 flex-col w-[100%] h-[100%] text-4xl'>
          <strong>Data Point 2:</strong> {chartData.dp2}
        </div>
        <div className='bg-white rounded-md flex flex-col p-4 w-[100%] h-[100%] text-4xl'>
          <strong>Data Point 3:</strong> {chartData.dp3}
        </div>
      </div>
    <div className='h-auto w-auto text-white relative grid sm:grid-cols lg:grid-cols-2 gap-2'>
      
      
      <div className='bg-white shadow rounded p-4 mb-4 '>
        <Line data={data} options={options}/>
      </div>
      <div className='bg-white shadow rounded p-4 mb-4 '>
      <Bar data={data} options={options}/>
      </div>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      </div>
    </div>
    </div>
    </>
  )
}

export default Dashboard