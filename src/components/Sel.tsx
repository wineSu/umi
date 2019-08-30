import React from 'react'
import { Select } from 'antd'

const { Option } = Select;

interface IAppProps {
    onchange: Function;
    initState: Function;
    defaultState: string;
    style?: Object;
}

//选择 组件
export class Sel extends React.Component<IAppProps> {

  //下拉选择
  selChange = (value: any) => {
    const { onchange } = this.props
    //父组件中透传事件
    onchange && onchange(value)
  }

  shouldComponentUpdate(){
    return false
  }

  render() {
    const {initState, defaultState} = this.props
    //初次获取不渲染
    if(!initState){
        return '';
    }
    let seldefault: string = '';
    if(defaultState){
        seldefault = defaultState, (initState as any)[defaultState].name;
    }
    console.log('知识库列表--子选择组建渲染')
    return (
        <Select
            showSearch
            defaultValue={seldefault}
            style={this.props.style || { width: 210,marginLeft: 20 }}
            placeholder="请选择"
            onSelect={this.selChange}
        >
            <Option key='0' value=''>全部</Option>
            {
            Object.keys(initState).map((item)=>
                <Option key={item} value={item}>{(initState as any)[item].name}</Option>
            )
            }
        </Select>
    );
  }
}
