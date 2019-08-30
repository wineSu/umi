import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'

const ChartWithEventComponent = (props: any) => {
  const data = props.chardata || [{"value":50,"name":"\u5f3a\u70c8\u610f\u5411"},{"value":20,"name":"\u6709\u610f\u5411"},{"value":30,"name":"\u9700\u7b5b\u9009"},{"value":10,"name":"\u65e0\u610f\u5411"},{"value":10,"name":"\u9700\u8981\u518d\u6b21\u8ddf\u8fdb"},{"value":30,"name":"\u9700\u8981\u91cd\u65b0\u53d1\u8d77\u6216\u653e\u5f03"}];
  const getOtion = () => {
    const option = {
      title: {
        text: null,
        x: 'center',
      },
      color: ["#e6abf9","#5181ff","#ff5d85","#fed100","#c7d1e8","#9d84be"],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: '邀约意向',
          type: 'pie',
          radius: '85%',
          center: ['50%', '50%'],
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    return option
  }

  return <ReactEcharts
            option={getOtion()}
            style={{ height: 450 }}
          />
}
const EchartsComponent = (props: any) => {
    return <ChartWithEventComponent chardata={props.chardatas}/>
}
EchartsComponent.propTypes = {
  chardatas: PropTypes.array,
}
export default EchartsComponent
