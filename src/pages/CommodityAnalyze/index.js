import React from  'react';
import { Layout, Breadcrumb, Card, Col, Row } from 'antd';
import { RiseOutlined, ShoppingOutlined } from '@ant-design/icons';
const { Content } = Layout;
const iconstyle = {color:'gray',fontSize:'20px'};
const hstyle = {textAlign:'center'};
const bstyle = {color:'#3f8600',fontSize:'24px',textAlign:'center'};
const mainstyle ={width:650,height:400,margin:'0 auto'};
class Index extends React.Component{
  constructor(){
    super();
    this.state={
      count:0,
      todayNew:0,
      monthNew:0
    }
  }
  componentDidMount(){
    var echarts = window.echarts;
    var myChart = echarts.init(document.getElementById('main4'));
    var myChart1 = echarts.init(document.getElementById('main5'),'light');
    this.$axios.get(this.$baseurl + 'commodityCount').then(res=>{
      this.setState({
        count:res.data.count
      });
      var option = {
        title: {
            text: '商品类型分布',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['服饰', '鞋包', '美妆','家具','数码']
        },
        toolbox: {
          show: true,
          itemGap: 20,
          feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                  show: true,
                  type: ['pie', 'funnel']
              },
              restore: {show: true},
              saveAsImage: {show: true}
          }
        },
        series: [
            {
                name: '商品类别',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: res.data.a, name: '服饰'},
                    {value: res.data.b, name: '鞋包'},
                    {value: res.data.c, name: '美妆'},
                    {value: res.data.d, name: '家具'},
                    {value: res.data.e, name: '数码'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      };
      var option1 = {
        title: {
          text: '商品品牌分布',
          subtext: '各品牌商品数',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend:{
          left: 'left',
          data:['商品数']
        },
        toolbox: {
          show: true,
          itemGap: 20,
          feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
          }
        },
        xAxis: {
          type: 'category',
          axisLabel:{
            interval:0
          },
          data: res.data.titData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name:'商品数',
          data: res.data.data,
          type: 'bar'
        }]
      }
      myChart.setOption(option);   
      myChart1.setOption(option1);   
    });
  }
  render(){
      return (
          <Layout className='main_layout'>
            <Breadcrumb className='main_breadcrumb'>
                <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                <Breadcrumb.Item>商品中心</Breadcrumb.Item>
                <Breadcrumb.Item>商品分析</Breadcrumb.Item>
            </Breadcrumb>
            <Content className='main_content'>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                  <Col span={8}>
                    <Card title={<><ShoppingOutlined style={iconstyle}/><span>&ensp;总商品数</span></>} hoverable headStyle={hstyle} bodyStyle={bstyle}>
                      {this.state.count}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title={<><RiseOutlined style={iconstyle}/><span>&emsp;日新增商品数</span></>} hoverable headStyle={hstyle} bodyStyle={bstyle}>
                      {this.state.todayNew}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title={<><RiseOutlined style={iconstyle}/><span>&emsp;月新增商品数</span></>} hoverable headStyle={hstyle} bodyStyle={bstyle}>
                      {this.state.monthNew}
                    </Card>
                  </Col>
                </Row>
              </div>
              <div id="main5" style={mainstyle}></div>
              <div id="main4" style={mainstyle}></div>
            </Content>
          </Layout>
      )
  }
}
export default Index;