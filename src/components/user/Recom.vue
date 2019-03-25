<template>
    <Table border :columns="columns6" :data="data5"></Table>
</template>
<script>
    export default {
        data () {
            return {
                columns6: [
                    {
                        title: '科室',
                        key: 'room',
                        filters: [
                        {
                            label: '耳鼻喉科',
                            value: '耳鼻喉科'
                        },
                        {
                            label: '妇科',
                            value: '妇科'
                        }
                        ],
                        filterMethod(value ,row){
                            return row.room.indexOf(value) > -1
                        }
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        filters: [
                            {
                                label: '大于40岁',
                                value: 1
                            },
                            {
                                label: '小于40岁',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.age > 40;
                            } else if (value === 2) {
                                return row.age < 40;
                            }
                        }
                    },
                    {
                        title: '病人评价',
                        key: 'score',
                        sortable: true
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
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
                                }, 'View')
                            ]);
                        }
                    }
                ],
                data5: [
                ],
            }
        },
        mounted() {
            this.$request.post('/api/recom',{
                a:'1'
            }).then((response) => {
                console.log(response)
                this.data5 = response.data
            })
        },
        methods: {
             show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `姓名：${this.data5[index].name}<br>年龄：${this.data5[index].age}<br>技术特点：${this.data5[index].de}`
                })
            }
        }
    }
</script>