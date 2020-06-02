import React from 'react';
import { Layout, Breadcrumb, Col, Input, Divider, List, Avatar, Radio, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { Search } = Input;
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
    var result = await this.$axios.get(this.$baseurl + 'commoditySearch?radio=' + radio + '&value=' + value);
    this.setState({
      data:result.data
    })
  }
  render() {
    return (
      <Layout className='main_layout'>
        <Breadcrumb className='main_breadcrumb'>
          <Breadcrumb.Item>后台管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品中心</Breadcrumb.Item>
          <Breadcrumb.Item>搜索商品</Breadcrumb.Item>
        </Breadcrumb>
        <Content className='main_content'>
          <Divider orientation="left">
            请选择搜索方式
          </Divider>
          <Radio.Group onChange={this.radioChang} defaultValue="1" >
            <Radio.Button value="1">商品编号搜索</Radio.Button>
            <Radio.Button value="2">商品名称搜索 <Tooltip title="支持模糊查询">
              <QuestionCircleOutlined />
            </Tooltip></Radio.Button>
            <Radio.Button value="3">商品类别搜索</Radio.Button>
            <Radio.Button value="4">商品品牌搜索</Radio.Button>
          </Radio.Group>
          <Col span={8} style={{ margin: '30px 0' }}>
            <Search placeholder="请输入..." onSearch={this.search} enterButton />
          </Col>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item
                key={item.name}
                extra={
                    <img
                      width={200}
                      alt="logo"
                      src={this.$baseurl + item.img}
                    />
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={this.$baseurl + item.img} />}
                  title={<a href='http://www.taobao.com/'>{item.name}</a>}
                  description={'商品编号 ' + item.id}
                />
                现价：{item.nowprice}<br />
                原价：{item.oldprice}<br />
                类别：{item.sort}<br />
                品牌：{item.brand}<br />
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    )
  }
}
export default Index;