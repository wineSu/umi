import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Tabs, Table } from 'antd';
import { getIn, is, toJS } from 'immutable';
import EchartsComponentLine from '../../components/LineCharts';
require('./index.less')

const { TabPane } = Tabs;

function Callcount(props: any): JSX.Element {

  let getData = (id: string = '1')=>{
    props.dispatch({
      type:"char/getCharData",
      payload: {
        id
      }
    })
  }

  useEffect(() => {
    //结果
    if(props.charData.size <= 0){
      getData()
    }
  },[]);

  let changeData = (key: string) => {
    getData(key)
  }
  
  if(props.charData.size <= 0 || props.tableList <= 0){
    return (<></>)
  }

  let charList = props.charData.toJS();
  let dataSource = props.tableList.toJS();

  const columns = [
    {
      title: '日期',
      dataIndex: 'time',
    },
    {
      title: '总数量',
      dataIndex: 'total',
    },
    {
      title: '接通数量',
      dataIndex: 'answered_count',
    },
    {
      title: '未接通数量',
      dataIndex: 'noanswer_count',
    },
    {
      title: '接通占比',
      dataIndex: 'per',
    },
  ];  
  return (
    <div className="char"> 
        <div>
          <Tabs defaultActiveKey={props.callSelIndex || '1'} onChange={changeData}>
            <TabPane tab="总数量" key="1"/>
            <TabPane tab="接通数量" key="2"/>
            <TabPane tab="未接通" key="3"/>
          </Tabs>
        </div>
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

// const areEqual = (prevProps: any, nextProps: any) => {
// 	return is(prevProps.charData, nextProps.charData)
// }
 
export default connect(({char}:{char: any}) => ({
  charData: char.getIn(['charData']),
  tableList: char.getIn(['tableList']),
  callSelIndex: char.getIn(['callSelIndex'])
}))(React.memo(Callcount));