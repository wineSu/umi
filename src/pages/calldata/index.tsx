import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Table, Input, Button, Tooltip, Modal, message  } from 'antd';
import { getIn, toJS } from 'immutable';
import { Sel } from '../../components/Sel';

const { Search: Search } = Input;

function Calldata(props: any): JSX.Element {
  
  //列表数据获取
  let getList = (arg={}) => {
    const { dispatch, pageState } = props
    let newpage = pageState ? pageState.toJS() : {}
    dispatch({
      type: 'calldata/getData',
      payload:{
        ...newpage,
        ...arg
      }
    })
  }

  useEffect(() => {
    if(!props.tablelist){
        getList()
        props.dispatch({
          type: 'calldata/selData'
        })
    }
    //结果
  },[]);

  if(!props.tablelist){
    return (<></>)
  }

  //删除
  let confirm = () => {
    Modal.confirm({
      title: '提示',
      content: '删除后不可恢复，您确定继续吗？',
      okText: '确认',
      cancelText: '取消',
    });
  }

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
      title: '用户分类',
      dataIndex: 'intension_status_desc',
    },
    {
      title: '通话内容',
      dataIndex: 'record_filename',
      render: (rowdata) => (
        <div>
          <audio controls controlsList="nodownload" src={rowdata}/>
      </div>
      )
    },
    {
      title: '呼叫时间',
      dataIndex: 'start_stamp',
    },
    {
      title: '操作',
      dataIndex: 'any',
      render: (rowdata, data) => (
            <div>
                <Tooltip placement="topLeft" title='导出'>
                  <em className="edit handleem" onClick={exportFile(data.id)}></em>
                </Tooltip>
                <Tooltip placement="topLeft" title='删除'>
                  <em className="del handleem" onClick={confirm}></em>
                </Tooltip>
            </div>
        )
    }
  ];

  
  //加载列表数据配置
  let pageState = props.pageState.toJS();
  let data = props.tablelist.toJS();
  let selState = props.selState.toJS();

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

  let exportFileHandle = () => {
    if(selDataList.length < 1){
      message.warning('请选中文件');
    }else{
      exportFile(selDataList.join(','))()
    }
  }
  //导出数据
  let exportFile = (ids: number | string) => () => {
    props.dispatch({
      type: 'calldata/exportInfor',
      payload:{
        ids
      }
    })
  } 
  //视图 或 语境   选择
  let onSelChange = (key: any) => (value: any) => {
    getList({
      page:1,
      [key]: value
    })
  }
  //输入搜索
  let onSearch: (value: any) => void = (value) => {
    getList({
      page:1,
      'phone': value
    })
  }
  console.log('列表渲染')
  return (
    <div>
        <div className="searchCont clearx">
            <div className="left">
              <label>场景AI</label>
              <Sel onchange={onSelChange('spzc_sceneid')} initState={selState.calltask} defaultState={pageState.spzc_sceneid}/>
              <label style={{marginLeft:20}}>用户分类</label>
              <Sel onchange={onSelChange('intension_status')} initState={selState.calldata} defaultState={pageState.intension_status}/>
            </div> 
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
            <Button type="primary" icon="upload" 
                    style={{marginBottom: 30}}
                    onClick={exportFileHandle}>
              导出数据
            </Button>
            <Table pagination={paginationProps} 
                   rowKey={data=>(data as any).id} 
                   rowSelection={rowSelection} 
                   columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default connect(
    ({calldata}:{calldata: any}) => ({
        pageState: calldata.getIn(['pageState']),
        tablelist: calldata.getIn(['data']),
        total    : calldata.getIn(['total']),
        selState : calldata.getIn(['selState']),
    })
)(React.memo(Calldata));