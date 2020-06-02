import React from 'react';
import { Layout, Breadcrumb, Input, Col, Divider, Radio, Tooltip, List, Avatar } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { Search } = Input;
const colstyle = {margin:'25px 0'};
class Index extends React.Component {
  constructor(){
    super();
    this.state={
      radio:'',
      data:[]
    }
  }
  radioChang = e =>{
    this.setState({
      radio:e.target.value
    })
  }
  search = async value =>{
    var radio = this.state.radio;
    if(this.state.radio === ''){
      radio = '1';
    }
    var result = await this.$axios.get(this.$baseurl + 'userSearch?radio=' + radio + '&value=' + value);
    this.setState({
      data:result.data
    })
  }
  render() {
    return (
      <Layout className='main_layout'>
        <Breadcrumb className='main_breadcrumb'>
          <Breadcrumb.Item>后台管理</Breadcrumb.Item>
          <Breadcrumb.Item>用户中心</Breadcrumb.Item>
          <Breadcrumb.Item>搜索用户</Breadcrumb.Item>
        </Breadcrumb>
        <Content className='main_content'>
          <Divider orientation="left">
            请选择搜索方式 <Tooltip title="默认以用户名方式搜索">
              <QuestionCircleOutlined />
            </Tooltip>
          </Divider>
          <Radio.Group onChange={this.radioChang} defaultValue="1" >
            <Radio.Button value="1">用户名搜索</Radio.Button>
            <Radio.Button value="2">性别搜索</Radio.Button>
            <Radio.Button value="3">手机号搜索</Radio.Button>
            <Radio.Button value="4">邮箱搜索</Radio.Button>
          </Radio.Group>
          <Col span={8} style={colstyle}>
            <Search placeholder="请输入..." onSearch={this.search} enterButton />
          </Col>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item
                key={item.username}
                extra={
                  <img
                    height={170}
                    alt="logo"
                    src={this.$baseurl+item.img}
                  />
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={this.$baseurl+item.img} />}
                  title={<><span>昵 称：</span><a href='http://www.taobao.com/'>{item.username}</a></>}
                  description={'注册时间 ' + item.regtime}
                />
                性别：{item.sex}<br/>
                联系电话：{item.phone}<br/>
                电子邮箱：{item.email||'未填写'}<br/>
                出生年月：{item.birthday||'未填写'}<br/>
                地址：{item.addr||'未填写'}
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    )
  }
}
export default Index;