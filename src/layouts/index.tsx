import React from 'react'
import { connect } from 'dva'
import Link from "umi/navlink"
import {getLoginToken} from '../utils/utils'
import { Layout, Menu, Icon, Modal, Breadcrumb, ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
require('./index.less')

const { Footer, Sider, Content } = Layout
const { SubMenu } = Menu;

interface IAppProps {
    nameuser?: String;
    modalVisible?: Boolean;
    dispatch: Function;
    location: any;
    menuData: any;
    history: any;
}
class BasicLayout extends React.Component<IAppProps> {
    
    state = {
        nameuser: getLoginToken(),
        modalVisible: false
    }

    //退出提示确认
    onOk = () => {
        this.props.dispatch({
            type:"app/doLogout"
        })
        this.handleCancel()
    }
    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }
    
    loginout = ()=>{
        this.setState({
            modalVisible: true
        })
    }

    componentDidMount(){
        //获取菜单
        const {dispatch} = this.props;
        dispatch({
            type:"app/doGetMenu"
        })
    }

    /**
     * 展示菜单
     */
    showMenu(data: Object){
        if(typeof(data) === "undefined"){
            return '';
        }else{
            return (data as any).map((item: any) => {
                return (
                    item.child ? 
                        <SubMenu
                            key={item.name}
                            title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.name}</span>
                            </span>
                            }
                        >
                            {
                                item.child && item.child.map((children: any) => {
                                    return (
                                        <Menu.Item key={children.url}>
                                            <Link to={children.url} replace>
                                                <span>{children.name}</span>
                                            </Link>
                                        </Menu.Item>
                                    )
                                })
                            }
                        </SubMenu> :  <Menu.Item key={item.url}>
                                            <Link to={item.url} replace>
                                                <Icon type={item.icon} />
                                                <span>{item.name}</span>
                                            </Link>
                                        </Menu.Item>

                )
            });
        }
    }

    render() {
        const {menuData, history} = this.props;
        const routername = this.props.location.pathname;
        if (!localStorage['loginUserToken'] && routername !== '/login') {
            history.push("/login")
            return false
        }
        if (routername === '/login') {
            return <div>{ this.props.children }</div>
        }
        //初次获取菜单不渲染
        if(!menuData){
            return '';
        }
        console.log('导航组件渲染....')
        return (
            <ConfigProvider locale={zh_CN}>
                <Layout style={{ minHeight: '100vh',height: '100%' }}>
                    <Sider width={240}>
                        <div className="logo">
                            <img src="https://jicvps.qingguo.com/AntUser/dist/img/logo.png" alt="蚁呼"/>
                        </div>
                        <Menu theme="dark" selectedKeys={[this.props.location.pathname]} mode="inline">
                            {this.showMenu(menuData)}
                        </Menu>
                    </Sider>
                    <Layout>
                        <div className="header clearx">
                            <div className="left">
                                <span className="sys_name">智能外呼系统</span>
                                <span className="sys_version">标准版</span>
                            </div>
                            <div className="right rightHandle">
                                <span className="question left"></span>
                                <span className="left line" style={{marginLeft:"24px"}}>|</span>
                                <div className="left managePeo">
                                <span>管理员：</span>
                                <span>{this.state.nameuser}</span>
                                </div>
                                <div className="left news">
                                <em>3</em>
                                </div>
                                <span className="left line" style={{margin: "0 18px"}}>|</span>
                                <span className="out left" onClick={this.loginout}></span>
                            </div>
                        </div>
                        <Breadcrumb>
                            <Breadcrumb.Item> <Icon type="home" />首页</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{ margin: '0 16px' }}>
                            <div>{this.props.children}</div>
                        </Content>
                    </Layout>
                    {
                        this.state.modalVisible ?<Modal
                                            title="提示"
                                            centered
                                            width="300px"
                                            visible={this.state.modalVisible}
                                            onOk={this.onOk}
                                            onCancel={this.handleCancel}
                                        >
                                            <p>确定退出吗？</p>
                                        </Modal> : ''
                    }
                </Layout>
            </ConfigProvider>
        );
    }
}

const mapStateToProps = ({app}:{app: any}) => ({
    menuData: app.menuData
});

export default connect(mapStateToProps)(BasicLayout)