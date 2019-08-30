import React from 'react';
import { connect } from 'dva';
import EchartsComponent from '../../components/IndexCharts';
require('./index.less')

function IndexPage(props: Object): JSX.Element {
    return (
      <div> 
          <ul className="indexTopData">
            <li className="left">
              <p className="title">今日数据</p>
              <div className="clearx countList1 text_c">
                <div className="left">
                  <p className="p1">3200</p>
                  <p className="p2">呼叫数量</p>
                  <p className="line"></p>
                </div>
                <div className="left">
                  <p className="p1">2800</p>
                  <p className="p2">接通数</p>
                  <p className="line"></p>
                </div>
                <div className="left">
                  <p className="p1">93%</p>
                  <p className="p2">接通率</p>
                </div>
              </div>
            </li>
            <li className="left list2">
              <p className="title">通话时长</p>
              <div className="clearx countList1 text_c">
                <div className="left" style={{width: '50%'}}>
                  <p className="p1">5000</p>
                  <p className="p2">今日通话时长</p>
                  <p className="line"></p>
                </div>
                <div className="left">
                  <p className="p1">1.7</p>
                  <p className="p2">平均时长</p>
                </div>
              </div>
            </li>
            <li className="left list3">
              <p className="title">当前待呼叫任务</p>
              <p className="count">50个</p>
              <div className="clearx aitime">
                <p className="left">AI工作时间<span className="j_starttime">07:01</span>--<span className="j_endtime">12:01</span></p>
                <p className="right change text_c">修改</p>
              </div>
            </li>
          </ul>
          <div className="chartsCont">
            <p className="line-title">错题整理邀约</p>
            <EchartsComponent />
          </div>
      </div>
    )
}
export default connect()(IndexPage);