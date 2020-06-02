import React from  'react';
import { Layout, Breadcrumb, Card, Col, Row } from 'antd';
import { RiseOutlined, UserOutlined } from '@ant-design/icons';
const { Content } = Layout;
const iconStyle = {color:'gray',fontSize:'20px'};
const hstyle = {textAlign:'center'};
const bstyle = {color:'#3f8600',fontSize:'24px',textAlign:'center'};
const mainstyle2 = {width:600,height:300,margin:'0 auto'};
const mainstyle3  = {width:600,height:300,margin:'24px auto'};
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
    var myChart = echarts.init(document.getElementById('main2'));
    var myChart1 = echarts.init(document.getElementById('main3'),'light');
    this.$axios.get(this.$baseurl + 'genderCount').then(res=>{
      var man = res.data.man;
      var woman = res.data.woman;
      var other = res.data.count - man - woman;
      var arr = [res.data.month3,res.data.month2,res.data.month1,res.data.monthNew];
      var M = res.data.M;
      this.setState({
        count:res.data.count,
        todayNew:res.data.todayNew,
        monthNew:res.data.monthNew
      });
      var option = {
        title: {
            text: '站点用户注册类型分布',
            subtext: '用户性别分析',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['男', '女', '其他']
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
                name: '注册来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: man, name: '男'},
                    {value: woman, name: '女'},
                    {value: other, name: '其他'}
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
          text: '新用户注册趋势',
          subtext: '近四个月数据',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend:{
          left: 'left',
          data:['注册数']
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
          data: ['2020-' + (M-3),'2020-' + (M-2), '2020-' + (M-1), '2020-' + M]
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name:'注册数',
          data: arr,
          type: 'line'
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
                <Breadcrumb.Item>用户中心</Breadcrumb.Item>
                <Breadcrumb.Item>用户分析</Breadcrumb.Item>
            </Breadcrumb>
            <Content className='main_content'>
              <div className="site-card-wrapper">
                <Row gutter={16}>
                  <Col span={8}>
                    <Card title={<><UserOutlined style={iconStyle}/><span>&emsp;总用户数</span></>} hoverable headStyle={hstyle} bodyStyle={bstyle}>
                      {this.state.count}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title={<><RiseOutlined style={iconStyle}/><span>&emsp;日新增用户数</span></>} hoverable headStyle={hstyle} bodyStyle={bstyle}>
                      {this.state.todayNew}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title={<><RiseOutlined style={iconStyle}/><span>&emsp;月新增用户数</span></>} hoverable headStyle={hstyle} bodyStyle={bstyle}>
                      {this.state.monthNew}
                    </Card>
                  </Col>
                </Row>
              </div>
              <div id="main2" style={mainstyle2}></div>
              <div id="main3" style={mainstyle3}></div>
            </Content>
          </Layout>
      )
  }
}
export default Index;