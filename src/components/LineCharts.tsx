import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'

const SimpleChartComponent = (props: any) => {
  const option = {
    
    tooltip: {
      trigger: 'axis',
    },
    
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        type: 'line',
        stack: '总量',
        itemStyle : {  
          normal : { 
            // 点的颜色。
            color: '#5b98da',
            lineStyle:{  
              color:'#008fdb'  
            }  
          }  
        }, 
        data: props.chardata,
      }
    ],
  }
  
  return <ReactEcharts
            option={option}
            style={{ height: '350px', width: '100%' }}
        />
}
const EchartsComponentLine = (props: any) => {
    return <SimpleChartComponent chardata={props.chardatas}/>
}
EchartsComponentLine.propTypes = {
  chardatas: PropTypes.array,
}
export default EchartsComponentLine
