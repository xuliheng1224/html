import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Badge,
  Avatar,
  Popover,
  List
} from 'antd'
const { Header, Sider, Content } = Layout
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
import 'antd/dist/antd.css'
import './index.css'

// import Bundle from '../../router/bundle';
// import Loading from '../loading/index';
// import Test from 'bundle-loader?lazy&name=test!pages/test/index'
// import LabelList from 'bundle-loader?lazy&name=labelList!pages/labelList/index'

// const createComponent = (component, props) => () => (  
//   <Bundle load={component}>
//     {
//       (Component) => Component ? <Component {...props}/> : <Loading/>
//     }
//   </Bundle>
// );
export default class LayoutAdmin extends Component {
  constructor(props) {
    super(props)    
    this.state = {
      collapsed: false,
      // current: 'home',
    }   
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  // handleClick=(e)=>{ //点击事件    
  //   this.setState({current:e.key});
  // }
  // componentWillMount = () => {
  //   console.log(this.props)
  // }
  render() {
    const content = (
      <div className="line-txt">
        <p className="line">
          <Icon type="user" theme="outlined" />
          个人中心
        </p>
        <p><Icon type="logout" theme="outlined" />退出登录</p>       
      </div>
    )
    const LeftSider = withRouter(({history}) => {
      return (
        <Sider className="sider-main"
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo">
              <img
                src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=88d12dd3cf3d70cf4cfaad0bc0e7b63d/f31fbe096b63f6249c8f46e98144ebf81b4ca30e.jpg"
                className="log-img"
              />
              <span className="title">微医贝联</span>
            </div>           
            <Menu theme="dark" defaultSelectedKeys={['/labelList']} selectedKeys={[history.location.pathname]} mode="inline">
              <Menu.Item key="/labelList">
                <Icon type="pie-chart" />
                <span>
                  <Link to="/labelList">九宫格列表</Link>
                </span>                            
              </Menu.Item>
              <Menu.Item key="/test">
                <Icon type="desktop" />
                <span><Link to="/test?id=3232">测试</Link></span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    <span>User</span>
                  </span>
                }
              >
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="team" />
                    <span>Team</span>
                  </span>
                }
              >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="file" />
                <span>File</span>
              </Menu.Item>
            </Menu>
          </Sider>  
      )  
    })
    return (
      <Layout id="components-layout-demo-custom-trigger">
        <LeftSider></LeftSider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, paddingRight: 50 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="right-module">              
              <Badge count={99}>
                <Icon type="bell" className="waring" />                                            
                <a href="#" className="head-example" />
              </Badge>
              <Avatar
                className="userTx"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <Popover                
                placement="bottom"
                content={content}
              >                
              <span className="userInfo">蚂蚁兄弟</span>
              </Popover>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 840
            }}
          > 
            {/* <Route path={this.props.match.url + '/test'} component={createComponent(Test, this.props)} />
            <Route path={this.props.match.url + '/LabelList'} component={createComponent(LabelList, this.props)} /> */}
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
