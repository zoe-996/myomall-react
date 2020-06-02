import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, ShopOutlined, NotificationOutlined } from '@ant-design/icons';
const { Sider } =Layout
const { SubMenu } = Menu;
class Index extends React.Component{
    render(){
        return (
            <Sider width={200} style={{background: '#fff'}}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%'}}
                >
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <UserOutlined />
                        用户中心
                      </span>
                    }
                  >
                    <Menu.Item key="1"><Link to="/">添加用户</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/userList">用户列表</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/userSearch">搜索用户</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/userAnalyze">用户分析</Link></Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <ShopOutlined />
                        商品中心
                      </span>
                    }
                  >
                    <Menu.Item key="5"><Link to="/commodityAdd">添加商品</Link></Menu.Item>
                    <Menu.Item key="6"><Link to="/commodityList">商品列表</Link></Menu.Item>
                    <Menu.Item key="7"><Link to="/commoditySearch">搜索商品</Link></Menu.Item>
                    <Menu.Item key="8"><Link to="/commodityAnalyze">商品分析</Link></Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    title={
                      <span>
                        <NotificationOutlined />
                        消息中心
                      </span>
                    }
                  >
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                  </SubMenu>
                </Menu>
            </Sider>
        )
    }
}
export default Index;
