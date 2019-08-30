import React from 'react'
import { connect } from 'dva'
import { Form, Icon, Input, Checkbox, message } from 'antd'
require('./index.less')
const formCreate:Function = Form.create()

@connect()
@formCreate
class Login extends React.Component<any> {

    login = () => {
        const { dispatch, form } = this.props
        form.validateFields((err: Boolean, values: Object) => {
            if (err) return;
            if(!(values as any).phonenumber){
                message.error('用户名不能为空！')
                return false
            }
            if(!(values as any).password){
                message.error('密码不能为空！')
                return false
            }
            dispatch({
                type: 'login/doLogin',
                payload:values
            });
        })
      }
    render(){
        const { getFieldDecorator } = this.props.form;

        console.log('登录组件')
        return (
            <div>
                <div className="loginHeader wrapWidth clearx">
                    <img src='https://jicvps.qingguo.com/AntUser/dist/img/login_logo.png' alt="" className="left" />
                    <div className="right">
                        <ul className="left clearx">
                            <li><a href="https://www.qingguo.com/yihoo.php">首页</a></li>
                            <li><a href="https://www.qingguo.com/yihoo.php">蚁呼介绍</a></li>
                            <li><a href="https://www.qingguo.com/yihoo/about.php">关于我们</a></li>
                        </ul>
                        <a className="btn left">申请合作</a>
                    </div>
                </div>
                <div className="loginCont">
                    <div className="wrapWidth clearx">
                        <div className="box right">
                            <p className="title">账户登录</p>
                            <Form>
                                <Form.Item className="inputCont">
                                {getFieldDecorator('phonenumber')(
                                    <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入手机号"
                                    />,
                                )}
                                </Form.Item>
                                <Form.Item className="inputCont">
                                {getFieldDecorator('password')(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                    />,
                                )}
                                </Form.Item>
                                <Form.Item>
                                {getFieldDecorator('expire',{
                                    initialValue: true,
                                })(
                                    <div>
                                        <div className="remember clearx">
                                            <Checkbox checked>记住密码</Checkbox>
                                            <a className="right">忘记密码？</a>
                                        </div>
                                        <a className="loginBtn self_btn" onClick={this.login}>立即登录</a>
                                    </div>
                                )}
                                </Form.Item>
                            </Form>
                        </div>
                    </div>			
                </div>
                <div className="copyright text_c">
                    <p>版权所有 北京青果时代教育科技有限公司 Copyright©2013-2018</p>
                    <p>京ICP证京B2-20171776号&nbsp;京ICP备15042696号-1 京公网安备11010802010411号</p>
                </div>
            </div>
          );
    }
}
export default Login 