import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import "./echartsGraph.css"

export default function EchartsGraph({ sensors, type }) {
  const [option, setOption] = useState({})

  useEffect(() => {
    setOption({
      xAxis: {
        type: 'time',
      },
      yAxis: {
        type: 'value',
        max: type === "Humidity" ? 100 : null,
        min: type === "Humidity" ? 0 : null
      },
      tooltip: {
        trigger: 'axis',
        valueFormatter:
          type === "Humidity" ?
            (value) => value + '%' // Humidity
            :
            type === "Temperature" ?
              (value) => value + '°c' // Temperature
              :
              (value) => value + ' lumen' // Lumen
      },
      legend: {
        show: true
      },
      series: sensors ?
        sensors.map(sensor => {

          return {
            name: sensor.type,
            data: sensor.sensorValues.map(value => [value.unixTime, value.value]),
            type: 'line',
          }
        })
        :
        null
    })

    return () => {

    }
  }, [sensors])


  return (
    <ReactECharts option={option} className='echartsGraph' />
  )
}
