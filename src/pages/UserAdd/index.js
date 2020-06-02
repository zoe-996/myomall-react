import React from  'react';
import { Layout, Breadcrumb, Button, Form, Input, Cascader, Select, message } from 'antd';
const { Content } = Layout;
const { Option } = Select;
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
const formItemLayout = {
    labelCol: {
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      sm: {
        span: 16,
      },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 4,
      },
    },
};
class Index extends React.Component{
    onFinish = async (values)=>{
      let result = await this.$axios.post(this.$baseurl + 'register','username=' + values.username + '&pwd=' + values.pwd + '&phone='+values.phone+'&sex='+values.sex+'&email='+values.email+'&addr='+values.addr);
      message.info(result.data)
    };
    render(){
        return (
          <Layout className='main_layout'>
              <Breadcrumb className='main_breadcrumb'>
                  <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                  <Breadcrumb.Item>用户中心</Breadcrumb.Item>
                  <Breadcrumb.Item>添加用户</Breadcrumb.Item>
              </Breadcrumb>
              <Content className='main_content'>
                  <Form
                      {...formItemLayout}
                      name="register"
                      onFinish={this.onFinish}
                      scrollToFirstError
                      > 
                      <Form.Item
                        name="username"
                        label='昵 称'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your nickname!',
                          },
                        ]}
                      >
                        <Input placeholder="请输入您的用户名" />
                      </Form.Item>
                      <Form.Item
                        name="sex"
                        label="性 别"
                      >
                        <Select
                          placeholder="请选择您的性别"
                        >
                          <Option value="男">男</Option>
                          <Option value="女">女</Option>
                        </Select>  
                        </Form.Item>
                      <Form.Item
                        name="pwd"
                        label="密 码"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                        ]}
                        hasFeedback
                      >
                        <Input.Password placeholder="请输入您的密码"/>
                      </Form.Item>
                      <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['pwd']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Please confirm your password!',
                          },
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
                        <Input.Password placeholder="请确认您的密码"/>
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        label="联系电话"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your phone number!',
                          },
                        ]}
                      >
                        <Input placeholder="请输入您的电话号码" />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label="个人邮箱"
                        rules={[
                          {type: 'email',message: 'The input is not valid E-mail!',}
                        ]}
                          >
                        <Input placeholder="请输入您的邮箱"/>
                      </Form.Item>
                      <Form.Item
                        name="addr"
                        label="收货地址"
                        rules={[
                          { type: 'array' },
                        ]}
                      >
                        <Cascader options={residences} placeholder="请选择您的收货地址"/>
                      </Form.Item>
                      <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                          注册
                        </Button>
                      </Form.Item>
                  </Form>
              </Content>
          </Layout>
        )
    }
}
export default Index;