import React, {useEffect, useState} from "react";
import Plot from 'react-plotly.js';
import './index.css'

const Chart = () => {
  const [Xaxis, setXaxis] = useState([])
  const [Yaxis, setYaxis] = useState([])


  useEffect(() => {
    document.title = "My Chart"
    const callingApi = async () => {
      //const apiKey = 'WAVMYKOIKBF6B1UU'
      //const company = 'AMZN'
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo`
      const response = await fetch(url)
      const data = await response.json()
      let xaxisData = []
      let yaxisData = []
      console.log(data["Time Series (Daily)"])
      for (let key in data["Time Series (Daily)"]){
          xaxisData.push(key);
          yaxisData.push(data["Time Series (Daily)"][key]["1. open"])
      }

      setXaxis(xaxisData);
      setYaxis(yaxisData);
      
    }
    callingApi()
  },[])

  return (
    <div className="main-container">
      <h1>My Chart</h1>
      <Plot className="chart-container"
        data={[
          {
            x: Xaxis,
            y: Yaxis,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'blue'},
            
          }
        ]}
        layout={ {title: 'Line chart of Stocks', showlegend: true} }
      />
      <Plot className="chart-container"
        data={[
          {type: 'bar', x: Xaxis, y: Yaxis},
        ]}
        layout={ { title: 'Bar chart of Stocks', showlegend: true} }
      />
    </div>
  );
};

export default Chart;
