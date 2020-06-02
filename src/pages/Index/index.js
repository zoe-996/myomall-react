import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd'

import Header from '../../components/Header/index.js'
import Sider from '../../components/Sider/index.js'
import UserAdd from '../UserAdd/index'
import UserList from '../UserList/index'
import UserSearch from '../UserSearch/index'
import UserAnalyze from '../UserAnalyze/index'
import CommodityList from '../CommodityList/index'
import CommodityAdd from '../CommodityAdd/index'
import CommoditySearch from '../CommoditySearch/index'
import CommodityAnalyze from '../CommodityAnalyze/index'

class Index extends React.Component{
    render(){
        return (
            <Layout>
              <Header></Header>
              <Layout>
                <Sider></Sider>
                <Route exact path='/' component={UserAdd}></Route>
                <Route path='/userList' component={UserList}></Route>
                <Route path='/userSearch' component={UserSearch}></Route>
                <Route path='/userAnalyze' component={UserAnalyze}></Route>
                <Route path='/commodityList' component={CommodityList}></Route>
                <Route path='/commodityAdd' component={CommodityAdd}></Route>
                <Route path='/commoditySearch' component={CommoditySearch}></Route>
                <Route path='/commodityAnalyze' component={CommodityAnalyze}></Route>
              </Layout>
            </Layout>
        )
    }
}
export default Index;