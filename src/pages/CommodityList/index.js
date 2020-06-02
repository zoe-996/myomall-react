import React from  'react';
import { Layout, Breadcrumb, List, Button, Avatar, Pagination, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { Drawer, Form, Input, Radio, Upload } from 'antd';
const { Content } = Layout;
const { confirm } = Modal;
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
    showDrawer = e=> {
      var id = Number(e.target.id);
      for(var i=0;i < this.state.data.length;i++){
        if(this.state.data[i].id === id){
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
      var id = Number(e.target.id);
      var that = this;
      confirm({
          title: '您确定要删除该商品吗?',
          icon: <ExclamationCircleOutlined />,
          content: '点击“ok”按钮，将进行删除',
          async onOk() {
            for(var i=0;i < that.state.data.length;i++){
              if(that.state.data[i].id === id){
                that.state.data.splice(i,1);
                var newdata = that.state.data;
                that.setState({
                  data:newdata
                })
              }
            }
            var {data} = await that.$axios.get(that.$baseurl + 'delCommodity?id=' + id)
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
        var {data} = await this.$axios.get(this.$baseurl + 'commoditylist?page=' + this.state.page + '&num=' + this.state.num);
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
                    <Breadcrumb.Item>商品中心</Breadcrumb.Item>
                    <Breadcrumb.Item>商品列表</Breadcrumb.Item>
                </Breadcrumb>
                <Content className='main_content'>
                    <List
                        header={<div>商品列表</div>}
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
                                    avatar={<Avatar shape="square" size={64} src={this.$baseurl + item.img}/>}
                                    title={item.name}
                                    description={'现价:' + item.nowprice + ' / 原价:' + item.oldprice + ' / 品牌:' + item.brand + ' / 种类:' + item.sort}
                                />
                                <div>
                                    <Button id={item.id} type="primary" onClick={this.showDrawer}><EditOutlined />修改</Button>
                                </div>
                                <div style={{marginLeft:'10px'}}>
                                    <Button id={item.id} type="danger" onClick={this.del}><DeleteOutlined />删除</Button>
                                </div>
                            </List.Item>)
                        }}
                    />
                </Content>
            </Layout>
            <Drawer
                title="修改商品信息"
                width={720}
                onClose={this.onClose}
                visible={this.state.visible}
            >
                <Form
                      onFinish={this.onFinish}
                      key={this.state.d.id}
                      > 
                      <Form.Item
                        name="id"
                        label='商品编号'
                      >
                        <Input defaultValue={this.state.d.id} disabled/>
                      </Form.Item>
                      <Form.Item
                        name="name"
                        label='商品名称'
                      >
                        <Input defaultValue={this.state.d.name}/>
                      </Form.Item>
                      <Form.Item
                        name="nowprice"
                        label="商品现价"
                      >
                         <Input defaultValue={this.state.d.nowprice}/>
                      </Form.Item>
                      <Form.Item
                        name="oldprice"
                        label="商品原价"
                      >
                        <Input defaultValue={this.state.d.oldprice}/>
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
                        name="upload"
                        label="商品图片"
                        valuePropName="fileList"
                        extra="请上传jpg、png、jpeg格式的图片"
                      >
                        <Upload name="logo" action="/upload.do" listType="picture">
                          <Button>
                            <UploadOutlined /> 上传图片
                          </Button>
                        </Upload>
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