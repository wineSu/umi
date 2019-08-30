import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import { getIn, toJS } from 'immutable';
import EchartsComponentLine from '../../components/LineCharts';

function Calltime(props: any): JSX.Element {

  let getData = (id: string = '1')=>{
    props.dispatch({
      type:"chartime/getCharData"
    })
  }

  useEffect(() => {
    //结果
    if(props.charData.size <= 0){
      getData()
    }
  },[]);

  if(props.charData.size <= 0 || props.tableList.size <= 0){
    return (<></>)
  }

  let charList = props.charData.toJS();
  let dataSource = props.tableList.toJS();

  const columns: {
      title: string;
      dataIndex: string;
  }[] = [
    {
      title: '日期',
      dataIndex: 'time',
    },
    {
      title: '总时长(分钟)',
      dataIndex: 'total',
    },
    {
      title: '平均时长(分钟)',
      dataIndex: 'answered_count',
    }
  ];
  return (
    <div className="char"> 
        {
          <EchartsComponentLine chardatas={charList}/>
        }
        <div className="dataTable">
          <p className="line-title">数据明细</p>
          <Table rowKey={data=>(data as any).id} dataSource={dataSource} columns={columns} />
        </div>
    </div>
  )
}

export default connect(({chartime}:{chartime: any}) => ({
  charData: chartime.getIn(['charData']),
  tableList: chartime.getIn(['tableList'])
}))(React.memo(Calltime));