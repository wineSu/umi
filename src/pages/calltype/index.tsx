import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Tabs, Table } from 'antd';
import { getIn, is, toJS } from 'immutable';
import EchartsComponent from '../../components/IndexCharts';

const { TabPane } = Tabs;

function Callcount(props: any): JSX.Element {

  let getData = (id: string = '1')=>{
    props.dispatch({
      type:"charPie/getCharData",
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
      title: '强烈意向',
      dataIndex: 'total',
    },
    {
      title: '有意向',
      dataIndex: 'answered_count',
    },
    {
      title: '需筛选',
      dataIndex: 'choose',
    },
    {
      title: '无意向',
      dataIndex: 'nointention',
    },
  ];
  return (
    <div className="char"> 
        <div>
          <Tabs defaultActiveKey={props.callSelIndex || '1'} onChange={changeData}>
            <TabPane tab="错题整理邀约" key="1"/>
            <TabPane tab="青果蚁呼邀约" key="2"/>
            <TabPane tab="小神童英语" key="3"/>
            <TabPane tab="错题邀约" key="4"/>
          </Tabs>
        </div>
        {
          <EchartsComponent chardatas={charList}/>
        }
        <div className="dataTable">
          <p className="line-title">数据明细</p>
          <Table rowKey={data=>(data as any).id} dataSource={dataSource} columns={columns} />
        </div>
    </div>
  )
}

 
export default connect(({charPie}:{charPie: any}) => ({
  charData: charPie.getIn(['charData']),
  tableList: charPie.getIn(['tableList']),
  callSelIndex: charPie.getIn(['callSelIndex'])
}))(React.memo(Callcount));