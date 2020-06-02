import React from 'react';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

class Index extends React.Component{
    render(){
        return (
          <Header className="header">
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} onClick={(value)=>{
                console.log(value.key);
                }}>
              <Menu.Item key="1">首页</Menu.Item>
              <Menu.Item key="2">后台管理</Menu.Item>
              <Menu.Item key="3">订单管理</Menu.Item>
              <Menu.Item key="4">商家管理</Menu.Item>
            </Menu>
          </Header>
        )
    }
}
export default Index;