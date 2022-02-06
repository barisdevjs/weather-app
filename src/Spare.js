import React, {  useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS} from 'chart.js/auto';

// this file is backup for the Chart.js file for older versions of project

const Chart = ({following}) => {
  const date = following.map(item => new Date(item.dt * 1000));
  const dateLocal = date.map(item => item.toLocaleString('default', { weekday: 'long' }));
  const temp = following.map(item => Math.floor(item.temp.day));

 
  const [userData, setUserData] = useState({ 
    labels: dateLocal,
    datasets: [
      { 
        data: temp,       
        label: 'Sıcaklık', 
        backgroundColor: [
          'rgba(0, 0, 0,.5)',
          'rgba(0, 0, 0,.5)',
          'rgba(0, 0, 0,.5)',  
        ],
        color : ['rgba(0,0,0,1)'],
        fill:true,  
        pointRadius: 1,
        pointHitRadius:4,
        pointHoverRadius:8,  
        pointBackgroundColor: 'mediumblue',
        borderWidth: 2,
        pointBorderColor: 'lightblue',
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2, 
        tooltips: {
          mode: 'index',
          intersect: true,
          windowPadding: 10,
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              fontColor: 'green'
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
            }, 
            ticks: { 
              fontColor: 'green' 
            }
          }] 
        }
      } 
    ]   
  });

  return (
    <div className="line" style={{ width:'100%'}}>
    <Line  
      data={userData} // onChange update the chart data 
     />   
    </div>
  ) 
}; 
  
export default Chart;
   