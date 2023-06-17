import React, {  useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS, defaults, LinearScale} from 'chart.js';
import {  registerables } from 'chart.js';
ChartJS.register(LinearScale);
ChartJS.register(...registerables);
defaults.font.size=24;
defaults.color='lightblue';
const Chart1 = ({following}) => {
  const date = following.map(item => new Date(item.dt * 1000));
  const dateLocal = date.map(item => item.toLocaleString('default', { weekday: 'long' }));
  const temp = following.map(item => Math.floor(item.temp.day));
  // if userData changes then the chart will re-render
    useEffect(() => {
      setUserData({ 
        labels: dateLocal,
        datasets: [
          { 
            data: temp,       
            label: 'Sıcaklık', 
            backgroundColor: [
              'rgba(0, 0, 0,.5)', 
            ],
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
                  display: true,
                },
                ticks: {
                  fontColor: 'red',
                  fontSize: 33
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[following]);


 
  const [userData, setUserData] = useState({ 
    labels: dateLocal,
    datasets: [ 
      { 
        data: temp,       
        label: 'Temperature', 
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

    <Line 
      data={userData}
      redraw={true}
      options={{responsive:true}}
      />    
  ) 
}; 
  
export default Chart1;
   