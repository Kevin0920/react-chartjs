import React from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js';

class PieChart extends React.Component {

    state = {
        dataStore: {
            labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
            datasets: [
                {
                    label: 'Population',
                    data:[
                        617594,
                        181045,
                        153060,
                        106519,
                        105162,
                        95072
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ]
                }
            ]
        },
        dataChart: []
    }

    componentDidMount() {
        axios.get("http://api.population.io:80/1.0/population/1980/aged/18/")
        .then(res => {
            console.log(res);
            const populationDatas = res.data;
            let showM = [];
            let showCountries = [];
            const updatedData = populationDatas.map(element => {
                let maleData = element.males;
                let femaleData = element.females;
                let countries = element.country;
                showM.push(maleData);
                showCountries.push(countries);            
            });
            console.log(showCountries);

            let dataChart = this.state.dataChart;
            dataChart = new Chart('canvas', {
                type: 'pie',
                data: {
                    datasets: [
                        {
                            label: '# of showCountries',
                            data: showM,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    }
                }
                
            })
            
            console.log(dataChart);
        })
        .catch(error => {
            console.log(error);
        });

        
    }

    render() {
        return (
            <div className='chart'>
                <Bar 
                 data={this.state.dataStore}
                 options={{
                    title: {
                        display: true,
                        text: 'Largest Cities in Massachusetts',
                        fontSize: 25
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                 }}
                />
                <canvas
                    style={{ width: 800, height: 300 }}
                    id="canvas"
                />
            </div>
        )
    }
}


export default PieChart;
