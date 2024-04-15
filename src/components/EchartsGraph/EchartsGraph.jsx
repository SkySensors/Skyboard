import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import "./echartsGraph.css"

export default function EchartsGraph({ sensors }) {
  const [option, setOption] = useState({})

  useEffect(() => {
    setOption({
      xAxis: {
        type: 'time',
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis',
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
