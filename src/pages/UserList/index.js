import React from  'react';
import { Layout, Breadcrumb, List, Button, Avatar, Pagination, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Drawer, Form, Cascader, Input, Select } from 'antd';
const { Content } = Layout;
const { Option } = Select;
const { confirm } = Modal;
const residences = [
    {
      value: '北京',
      label: '北京',
      children: [
        {
          value: '朝阳区',
          label: '朝阳区',
          children: [
            {
              value: 'xiao',
              label: 'xiao',
            },
          ],
        },
      ],
    },
    {
      value: '浙江',
      label: '浙江',
      children: [
        {
          value: '杭州',
          label: '杭州',
          children: [
            {
              value: '西湖',
              label: '西湖',
            },
          ],
        },
      ],
    },
    {
      value: '江苏',
      label: '江苏',
      children: [
        {
          value: '南京',
          label: '南京',
          children: [
            {
              value: '中华门',
              label: '中华门',
            },
          ],
        },
      ],
    },
];
class Index extends React.Component{
    constructor(){
        super();
        this.state={
            data:[],
            page:1,
            num:5,
            total:50,
            visible: false,
            d:{}
        }
    }
    showDrawer = e => {
      var id = e.target.id;
      for(var i=0;i < this.state.data.length;i++){
        if(this.state.data[i]._id === id){
          this.setState({
            d:this.state.data[i],
            visible: true,
          });
        }
      }
    };
    onClose = () => {
        this.setState({
          visible: false,
        });
    };
    del = e => {
      var id = e.target.id;
      var that = this;
      confirm({
          title: '您确定要删除该用户吗?',
          icon: <ExclamationCircleOutlined />,
          content: '点击“ok”按钮，将进行删除',
          async onOk() {
            for(var i=0;i < that.state.data.length;i++){
              if(that.state.data[i]._id === id){
                that.state.data.splice(i,1);
                var newdata = that.state.data;
                that.setState({
                  data:newdata
                })
              }
            }
            var {data} = await that.$axios.get(that.$baseurl + 'delUser?id=' + id)
            message.info(data);
          },
          onCancel() {},
      });
    };
    onFinish = ()=>{
      message.info("修改成功！");
      setTimeout(() => {
        this.setState({
          visible: false,
        });
      }, 1000);
    }
    async componentDidMount(){
        this.page_change(1);
    }
    async page_change(e){
        this.state.page = e;
        var {data} = await this.$axios.get(this.$baseurl + 'userlist?page=' + this.state.page + '&num=' + this.state.num);
        this.setState({
            data:data.result,
            total:data.count
        })
    }
    render(){
        return (
            <>
            <Layout className='main_layout' >
                <Breadcrumb className='main_breadcrumb' >
                    <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                    <Breadcrumb.Item>用户中心</Breadcrumb.Item>
                    <Breadcrumb.Item>用户列表</Breadcrumb.Item>
                </Breadcrumb>
                <Content className='main_content'>
                    <List
                        header={<div>用户列表</div>}
                        footer={
                            <Pagination
                                onChange={e=>this.page_change(e)}
                                current={this.state.page}
                                pageSize={this.state.num}
                                total={this.state.total}
                            />
                        }
                        bordered
                        dataSource={this.state.data}
                        renderItem={item=>{
                            return(
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={this.$baseurl+item.img}/>}
                                    title={item.username}
                                    description={item.phone + ' ' + item.regtime}
                                />
                                <div>
                                    <Button id={item._id} type="primary" onClick={this.showDrawer}><EditOutlined />修改</Button>
                                </div>
                                <div style={{marginLeft:'10px'}}>
                                    <Button id={item._id} type="danger" onClick={this.del}><DeleteOutlined />删除</Button>
                                </div>
                            </List.Item>)
                        }}
                    />
                </Content>
            </Layout>
            <Drawer
                title="修改用户信息"
                width={720}
                onClose={this.onClose}
                visible={this.state.visible}
            >
                <Form
                      onFinish={this.onFinish}
                      key={this.state.d._id}
                      > 
                      <Form.Item
                        name="username"
                        label='昵 称'
                      >
                        <Input defaultValue={this.state.d.username} disabled/>
                      </Form.Item>
                      <Form.Item
                        name="sex"
                        label="性 别"
                      >
                        <Select defaultValue={this.state.d.sex}>
                          <Option value="男">男</Option>
                          <Option value="女">女</Option>
                        </Select>  
                        </Form.Item>
                      <Form.Item
                        name="pwd"
                        label="密 码"
                      >
                        <Input.Password defaultValue={this.state.d.pwd}/>
                      </Form.Item>
                      <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['pwd']}
                        hasFeedback
                        rules={[
                          ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (!value || getFieldValue('pwd') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject('The two passwords that you entered do not match!');
                            },
                          }),
                        ]}
                      >
                        <Input.Password defaultValue={this.state.d.pwd}/>
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        label="联系电话"
                      >
                        <Input defaultValue={this.state.d.phone}/>
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label="个人邮箱"
                        rules={[
                          {type: 'email',message: 'The input is not valid E-mail!',}
                        ]}
                          >
                        <Input defaultValue={this.state.d.email}/>
                      </Form.Item>
                      <Form.Item
                        name="addr"
                        label="收货地址"
                        rules={[
                          { type: 'array' },
                        ]}
                      >
                        <Cascader options={residences}/>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          修改
                        </Button>
                      </Form.Item>
                  </Form>
            </Drawer>
        </>
        )
    }
}
export default Index;