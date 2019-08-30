import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Table, Input, Button, Tooltip, message, Modal } from 'antd';
import { getIn, toJS } from 'immutable';

const { Search: Search } = Input;

function Calling(props: any): JSX.Element {
  
  //输入搜索
  let onSearch: (value: any) => void = (value) => {
    getList({
      'phone': value
    })
  }
  
  //列表数据获取
  let getList = (arg={}) => {
    const { dispatch, pageState } = props
    let newpage = pageState ? pageState.toJS() : {}
    dispatch({
      type: 'calling/getData',
      payload:{
        ...newpage,
        ...arg
      }
    })
  }

  useEffect(() => {
    if(!props.tablelist){
        getList()
    }
    //结果
  },[]);

  const columns: ({
        title: string;
        dataIndex: string;
        render?: undefined;
    } | {
        title: string;
        dataIndex: string;
        render: (rowdata: any, data: any, index: any) => JSX.Element;
    })[] = [
    {
      title: '用户手机号',
      dataIndex: 'client_phone',
    },
    {
      title: '姓名',
      dataIndex: 'client_name',
    },
    {
      title: '场景AI',
      dataIndex: 'proname',
    },
    {
      title: '状态',
      dataIndex: 'calling_tatus',
    },
    {
      title: '呼叫时间',
      dataIndex: 'record_time',
    },
    {
      title: '操作',
      dataIndex: 'address',
      render: (_rowdata, _data, _index) => (
            <div>
                <Tooltip placement="topLeft" title='拨打'>
                  <em className="phone handleem"></em>
                </Tooltip>
                <Tooltip placement="topLeft" title='暂停'>
                  <em className="puse handleem"></em>
                </Tooltip>
                <Tooltip placement="topLeft" title='删除'>
                  <em className="del handleem"></em>
                </Tooltip>
            </div>
        )
    }
  ];

  if(!props.tablelist){
    return (<></>)
  }
  //加载列表数据配置
  let pageState = props.pageState.toJS();
  let data = props.tablelist.toJS();
  let total = props.total;
  const paginationProps: {
        showTotal: () => string;
        current: any;
        pageSize: any;
        total: any;
        showSizeChanger: boolean;
        onShowSizeChange: (current: any, pageSize: any) => void;
        onChange: (current: any, pageSize: any) => void;
  } = {
    showTotal: () => `共${total}条`,
    current: pageState.page,
    pageSize: pageState.limit,
    total,
    showSizeChanger: true,
    onShowSizeChange: (page, limit) => getList({page, limit}),
    onChange: (page, limit) => getList({page, limit}),
  }
  
  //选择的数据项
  let selDataList: string[] = [];
  //选择
  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      selDataList = selectedRowKeys
    }
  };

  //顶部操作
  let handle = (type: string, isStop?: number) => () => {
    if(selDataList.length < 1){
      message.warning('请至少选择一个文件！');
    }else{
      Modal.confirm({
        title: '提示',
        content: '您确定要继续吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () =>{
          props.dispatch({
            type: 'calling/handle',
            payload:{
              type,
              isStop,
              ids: selDataList
            }
          })
        }
      });
    }
  }

  console.log('列表渲染')
  return (
    <div>
        <div className="searchCont clearx">
            <div className="right">
                <Search className="right"
                        defaultValue = {pageState.phone}
                        style={{ width: 300 }} 
                        placeholder="请输入手机号" 
                        onSearch={onSearch} 
                        enterButton />
            </div> 
        </div>
       
        <div className="TableCont">
            <Button type="primary" icon="upload">
              导入数据
            </Button>
            <div className="right btnGroup">
                <Button onClick={handle('task',0)}>开始外呼</Button>
                <Button onClick={handle('task',1)}>全部暂停</Button> 
                <Button onClick={handle('del')} type="danger">删除</Button>
            </div>
            <Table pagination={paginationProps} 
                   rowKey={data=>(data as any).id} 
                   rowSelection={rowSelection} 
                   columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default connect(
    ({calling}:{calling: any}) => ({
        pageState: calling.getIn(['pageState']),
        tablelist: calling.getIn(['data']),
        total    : calling.getIn(['total']),
    })
)(React.memo(Calling));