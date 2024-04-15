import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react';
import "./echartsGraph.css"

export default function EchartsGraph() {
    const [option, setOption] = useState({

        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            }
          ]
    })

    return (
        <ReactECharts option={option} className='echartsGraph'/>
    )
}
