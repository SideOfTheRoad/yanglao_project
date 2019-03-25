<template>
<div>
  <Modal
   v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="this.ok"
        @on-cancel="cancel">
    <Form ref = 'forminline' :model = 'forminline' inline>
      <FormItem prop = 'time' label = '请输入时间'>
        <Input type ='text' v-model = 'forminline.time'></Input>
      </FormItem>
      <FormItem prop = 'name' label = '请输入姓名'>
        <Input type ='text' v-model = 'forminline.name'></Input>
      </FormItem>
      <FormItem prop = 'id' label = '请输入身份证号'>
        <Input type ='text' v-model = 'forminline.id'></Input>
      </FormItem>
    </Form>
    
    </Modal>
  <Row>
    <Col span = '2' offset = 21>
      <i-button type="success" @click = 'modal1 = true'>插入</i-button>
    </Col>
  </Row>
  <Row style = 'margin-top: 35px'>
    <Table border :columns="columns7" :data="data6"></Table>
  </Row>
</div>
</template>
<script>
    export default {
        data () {
            return {
                modal1: false,
                forminline: {
                    time: '',
                    name: '',
                    id: ''
                },
                columns7: [
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '性别',
                        key: 'male'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deal(params)
                                        }
                                    }
                                }, '处理')  
                            ]);
                        }
                    }
                ],
                data6: [
                ]
            }
        },
        mounted() {
          this.$request.post('/api/view', {
            a : '1'
          }).then((response) => {
           var temp = response.data.split('*')
            for(var i = 0 ; i < 4; i++){
                var c = temp[i]
                var b = c.split(',')
                for(var j = 0; j< b.length; j++){
                    var d = b[j].split('/')
                    console.log(d)
                    this.data6.push({
                 name: d[0],
                 id: d[1].substring(12,18),
                 score: d[3],
                 male: d[4],
                 time: d[2],
                 hour: d[5].substring(0,2),
                 kk: j
            })
                }
            }
          })
        },
        methods: {
            ok () {
                this.$request.post('/api/in', {
                    time :this.forminline.time,
                    name :this.forminline.name,
                    id: this.forminline.id
                })
            },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `姓名：${this.data6[index].name}<br>信誉积分：${this.data6[index].score}`
                })
            },
            remove (params) {
                this.data6.splice(params.index, 1);
                this.$request.post('/api/kill', {
                    id: params.row.id,
                    kk: params.row.hour,
                    score:params.row.score
                })
            },
            deal (params) {
                this.data6.splice(params.index, 1);
                console.log(params.row.name)
                this.$request.post('/api/deal', {
                    name: params.row.name,
                    kk: params.row.hour,
                    id: params.row.id
                }).then((response) => {
                    console.log(response)
                })
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
        }
    }
</script>