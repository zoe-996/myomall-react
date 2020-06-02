import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';

const NormalLoginForm = () => {
  const onFinish = values => {
    if(values.username === 'zengting' && values.password === 123456){
      window.location.href = '/';
    }else{
      alert('密码错误');
    }
  };
  const divstyle={
    margin:'0 auto',
    paddingTop:'200px',
    width:'600px',
  }
  return (
    <div style={divstyle}>
    <Form
      name="normal_login"
      onFinish={onFinish}
      initialValues={{
        username:'zengting',
        password:123456
      }}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined/>}/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined/>}
          type="password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default NormalLoginForm;