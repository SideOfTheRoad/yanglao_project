<template>
<div>
    <Table stripe :columns="columns1" :data="data1"></Table>
    <Modal
   v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
    <Row>
      <p>诊治态度</p>
      <Rate allow-half v-model="valueHalf1"></Rate>
    </Row>
    <Row>
      <p>治疗效果</p>
      <Rate allow-half v-model="valueHalf2"></Rate>
    </Row>
    </Modal>
</div>
</template>
<script>
    export default {
        data () {
            return {
                modal1: false,
                valueHalf1: 0,
                valueHalf2: 0,
                columns1: [
                    {
                        title: '科室',
                        key: 'room'
                    },
                    {
                        title: '就诊人姓名',
                        key: 'name'
                    },
                    {
                        title: '状态',
                        key: 'state'
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                        if(params.row.state === '未就诊'){
                          return h('Button', {
                            props: {
                            type: 'error',
                            size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.remove(params.index)
                                }
                            }
                        }, '取消预约')
                      }
                      else{
                        return h('Button', {
                            props: {
                            type: 'primary',
                            size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.modal1 = true
                                }
                            }
                        }, '评价')
                      }
                      }
                    }
                ],
                data1: [

                ]
            }
        },
        mounted: function() {
            var uuid1 = window.localStorage.getItem('uuid')
            this.$request.post('/api/history', {
                uuid: uuid1
            }).then((response) => {
                console.log(response)
                this.data1 = response.data
            })
        },
        methods: {
            remove (params) {
               var uuid2 = window.localStorage.getItem('uuid')
               this.data1.splice(params.index, 1);
               this.$request.post('/api/delete', {
                 uuid : uuid2
               }).then((response) => { 
                console.log(response)
               })
            }
        }
    }
</script>