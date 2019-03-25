<template>
  <Row>
  <Col span = 8 offset = 4>
    <Form ref="formItem" :model="formItem" :label-width="80" :rules = 'newrule'>
        <FormItem label="就诊人姓名" prop = 'input'>
            <Input v-model="formItem.input" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="就诊人身份证号" prop = 'idinput'>
            <Input v-model="formItem.idinput" placeholder="请输入身份证号"></Input>
        </FormItem>
        <FormItem label="就诊院区" prop = 'select'>
            <Select v-model="formItem.select">
                <Option value="1">一院区</Option>
            </Select>
        </FormItem>
        <FormItem label= '科室选择' prop = 'room'>
          <Select v-model="formItem.room">
            <Option v-for="item in roomList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="就诊时间选择">
            <Row>
            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="formItem.date" placeholder="请选择就诊时间" style="width: 200px" :options ='options1'></DatePicker>
            </Row>
        </FormItem>
        <h5>如果不选择时间，则默认按照顺序预约</h5>
        <FormItem label="性别" prop = 'radio'>
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="是否接受时间变更">
            <RadioGroup v-model="formItem.Radio">
                <Radio label="接受更早时间" value = '1'></Radio>
                <Radio label="接受更晚时间" value= '2'></Radio>
                <Radio label="不接受变更时间" value = '3'></Radio>
                <Radio label="可以接受变更" value = '4'></Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="请输入身份证后六位" prop = 'id'>
            <Input v-model="formItem.id" type="password" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入身份证后六位进行验证"></Input>
        </FormItem>
        <FormItem>
            <i-button type="primary" @click = "submit(formItem)">提交预约</i-button>
        </FormItem>
        <FormItem>
            <div>{{LocationCity}}</div>
        </FormItem>
    </Form>
  </Col>
  </Row>
</template>
<script>
    export default {
        data () {
            return {
              options1: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
              roomList: [
                {
                  value: '1',
                  label: '耳鼻喉科'
                },
                {
                  value: '2',
                  label: '妇科'
                },
                {
                  value: '3',
                  label: '骨科'
                }
              ],
              formItem: {
                    input: '',
                    idinput: '',
                    select: '',
                    radio: 'male',
                    room: '',
                    Radio: '', 
                    date: '',
                    id: ''
                },
              newrule: {
                  input: [{
                    required: true
                  }],
                  idinput: [{
                    required: true
                  }],
                  select: [{
                    required: true
                  }],
                  radio: [{
                    required: true
                  }],
                  room: [{
                    required: true
                  }],
                  id: [{
                    required: true
                  }]
                },
                LocationCity:"正在定位",    //给渲染层定义一个初始值
            }
        },
        mounted: function(){ 
                this.city()    //触发获取城市方法
        },
        computed: {
          uuid: function() {
            var uuid = localStorage.getItem('uuid')
            return uuid
          },
          id: function() {
            var id = localStorage.getItem('id')
            return id
          },
          score : function() {
            var score = localStorage.getItem('score')
            return score
          }
        },
        methods: {
          submit (name) {
            var idt = this.id
            idt = idt.toString()
            idt = idt.substr(this.id.length-6)
            if(idt == this.formItem.id){
            this.$request.post('/api/reserve',{
              uuid: this.uuid,
              name: this.formItem.input,
              idinput: this.formItem.idinput,
              school: this.formItem.select,
              radio: this.formItem.radio,
              room: this.formItem.room,
              timet: this.formItem.Radio,
              date: this.formItem.date,
              time: this.formItem.time,
              id: this.formItem.id,
              score: this.score
            }).then((response) => {
              if(response.data == 'err') {
                this.$Message.error('当前时段已满，请选择其他时间')
              }
            })
          } else{
              this.$Message.error('身份证校验错误或已提交任务')
            }
          },


          city(){    //定义获取城市方法
              const geolocation = new BMap.Geolocation();
              var _this = this
              geolocation.getCurrentPosition(function getinfo(position){
                  let city = position.address.city;             //获取城市信息
                  let province = position.address.province;    //获取省份信息
                  _this.LocationCity = city
              }, function(e) {
                  _this.LocationCity = "定位失败"
              }, {provider: 'baidu'});    
          },




        }
    }
</script>