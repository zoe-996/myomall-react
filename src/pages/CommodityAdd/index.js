import React from  'react';
import { Layout, Breadcrumb, Button, Form, Input, message, Radio } from 'antd';
const { Content } = Layout;
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
      var fd = new FormData(document.getElementById('form'));
      fd.append("id",values.id);
      fd.append("name",values.name);
      fd.append("nowprice",values.nowprice);
      fd.append("oldprice",values.oldprice);
      fd.append("sort",values.sort);
      fd.append("brand",values.brand);
      let result = await this.$axios.post(this.$baseurl + 'addCommodity',fd);
      message.info(result.data);
    };
    render(){
        return (
          <Layout className='main_layout'>
              <Breadcrumb className='main_breadcrumb'>
                  <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                  <Breadcrumb.Item>商品中心</Breadcrumb.Item>
                  <Breadcrumb.Item>添加商品</Breadcrumb.Item>
              </Breadcrumb>
              <Content className='main_content'>
                  <Form
                      {...formItemLayout}
                      name="addCommodity"
                      onFinish={this.onFinish}
                      scrollToFirstError
                      > 
                      <Form.Item
                        name="id"
                        label='商品编号'
                        rules={[
                          {
                            required: true,
                            message: 'Please input commodity code!',
                          },
                        ]}
                      >
                        <Input placeholder="请输入商品编号" />
                      </Form.Item>
                      <Form.Item
                        name="name"
                        label='商品名称'
                        rules={[
                          {
                            required: true,
                            message: 'Please input name of commodity!',
                          },
                        ]}
                      >
                        <Input placeholder="请输入商品名" />
                      </Form.Item>
                      <Form.Item
                        name="nowprice"
                        label="现价"
                        rules={[
                          {
                            required: true,
                            message: 'Please input now price of commodity!',
                          },
                        ]}
                      >
                        <Input placeholder="请输入商品现价"/> 
                      </Form.Item>
                      <Form.Item
                        name="oldprice"
                        label="原价"
                      >
                        <Input placeholder="请输入商品原价"/>
                      </Form.Item>
                      <Form.Item name="sort" label="商品类别">
                        <Radio.Group>
                          <Radio.Button value="时尚衣柜">时尚衣柜</Radio.Button>
                          <Radio.Button value="优质跑鞋">优质跑鞋</Radio.Button>
                          <Radio.Button value="轻奢时尚">轻奢时尚</Radio.Button>
                          <Radio.Button value="至IN美妆">至IN美妆</Radio.Button>
                          <Radio.Button value="品质家具">品质家具</Radio.Button>
                          <Radio.Button value="家电数码">家电数码</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                        name="brand"
                        label="商品品牌"
                      >
                        <Input placeholder="请输入商品的所属品牌" />
                      </Form.Item>
                      <Form.Item
                        label="商品图片"
                        extra="请上传jpg、png、jpeg格式的图片"
                      >
                        <form id="form">
                        <input type="file" name="file" />
                        </form>
                      </Form.Item>
                      <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                          添加商品
                        </Button>
                      </Form.Item>
                  </Form>
              </Content>
          </Layout>
        )
    }
}
export default Index;