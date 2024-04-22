import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react';

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
        confine: true,
        valueFormatter:
          type === "Humidity" ?
            (value) => value + '%' // Humidity
            :
            type === "Temperature" ?
              (value) => value + '°C' // Temperature
              :
              type === "Light" ?
                (value) => value + ' lumen' // Lumen
                :
                null
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
            sampling: 'lttb',
            symbol: 'none',
          }
        })
        :
        null
    })

    return () => {

    }
  }, [sensors])


  return (
    <ReactECharts option={option} className='echartsGraph' notMerge={true}/>
  )
}
