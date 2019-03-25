<template>
    <div style="background:#fff;padding: 20px">
    <Row>
      <Col span = 6 offset =2 >
          <video src="https://mcresource.mcilife.com/operation/contentInfo/a15ead92-71ab-45e6-b951-acd2901b73cf.mp4"  width="320" height="240" controls="controls">
          Your browser does not support the video tag.
          </video>
      </Col>  
      <Col span = 6 offset =5 >
        <Card style="width:320px;height: 190px;" >
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                课程信息
            </p>          
            <div style="text-align:left;">
                <p>名称：歌唱技巧一</p>
                <p>简介：歌唱中常用的一些技巧</p>
<!--                 <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                                    {{ 8.7}} -->
            </div>
        </Card>
      </Col>  
    </Row>
    <Row >
      <Col span = 16 offset = 4>
        <Tabs value="name1">
            <TabPane label="基本信息" name="name1">
              <div style="text-align:left;">
                <p>所在地区： 上海 - 上海市 - 浦东新区</p>
                <p>机构类型：养老院</p>
                <p>机构性质：公办</p>
                <p>成立时间：2019年1月</p>
                <p>占地面积：5000</p>
                <p>建筑面积：8400</p>
                <p>床位数：290张</p>
                <p>收住对象： 不能自理/介护 </p>
                <p>收费区间：4800 - 5600</p>
              </div>
            </TabPane>
            <TabPane label="联系我们" name="name2">
              <div style="text-align:left;">
                <p>联系人：王境</p>
                <p>地址：上海市浦东新区博山东路629号</p>
                <p>网址：http://www.yanglao.com.cn/resthome/243774.html</p>
                <p>交通：地铁6号线，791、638、59、787、723等</p>
              </div>
            </TabPane>
            <TabPane label="收费标准" name="name3">
              <div style="text-align:left;">
                <p>房间设置：按照星级酒店标准设单人间、双人间、家庭套间、康复VIP间、三人间及多人间。</p>
                <p>服务保障：由医生、护士、康复师、社工、护理员、后勤保障工作人员组成的团队，实现24小时无缝隙服务。</p>
                <p>服务范围：收住自理、半自理、失能老人、阿尔兹海默症老人，不限户籍。提供住养护理、健康管理、心理慰藉、康复疗养、基本医疗保障、中医调理养生、认知症照护等多种服务。同时开展短期托老、社区居家助老、适老化改造等服务。</p>
                <p>服务宗旨：用专业化、标准化、人性化有温度的服务，打造高质优价、和睦欢乐的综合性养老机构。</p>
                <p>拓展服务：银发旅游、候鸟旅居、跨境医疗等。</p>
              </div>

            </TabPane>
            <TabPane label="设施" name="name4">
              <div style="text-align:left;">
                <p>新风系统：采用整体全新风PM2.5循环过滤系统，对整栋大楼进行24小时除霾、过滤、新风补充，时刻保持空气清新。</p>
                <p>康复理疗设备：设有康复理疗中心及中医养生保健专区， 配有专业的康复理疗设备。</p>
              </div>

            </TabPane>
            <TabPane label="服务内容" name="name5">
              <div style="text-align:left;">
                <p>服务保障：由医生、护士、康复师、社工、护理员、后勤保障工作人员组成的团队，实现24小时监护服务。</p>
                <p>服务宗旨：用专业化、标准化、人性化有温度的服务，打造高质优价、和睦欢乐的综合性养老机构。</p>
              </div>
            </TabPane>
            <TabPane label="入住需知" name="name6">
              <div style="text-align:left;">
                <p>入住前请您携带最近（近一个月内）一次就医详细资料，体检的必须检查项目</p>
              </div>

            </TabPane>
        </Tabs>
      </Col>
    </Row>
    </div>
</template>
<script>
    export default {
        
    }
</script>