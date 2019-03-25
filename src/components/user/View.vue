<template>
    <Table border :columns="columns1" :data="data1"></Table>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '身份证尾号',
                        key: 'id'
                    },
                    {
                        title: '预计时间',
                        render: (h, params) => {
                        if(params.row.kk <= 1){

                          return h('h2', params.row.hour + ':0' + 5 * params.row.kk)

                        }
                        else{
                            return h('h2', params.row.hour + ':' + 5 * params.row.kk)
                        }
                        }
                    }
                ],
                data1: [
                ]
            }
        },
        mounted() {
          this.$request.post('/api/view',{
            a: '1'
          }).then((response) => {
            console.log(response)
            var temp = response.data.split('*')
            for(var i = 0 ; i < 4; i++){
                var c = temp[i]
                var b = c.split(',')
                for(var j = 0; j< b.length; j++){
                    var d = b[j].split('/')
                    console.log(d)
                    this.data1.push({
                 name: d[0],
                 id: d[1].substring(12,18),
                 choice: d[3],
                 male: d[4],
                 time: d[2],
                 hour: d[5].substring(0,2),
                 kk: j
            })
                }
            }
/*            for(var i = 0; i < temp.length ; i++){
                var b =temp[i].split('，')
                for(var j = 0; j < 1; j++){
                    var c = b[0].split('，')
                    console.log(c)
               this.data1.push({
                 name: c[0],
                 id: b[1].substring(12,18),
                 age: b[3],
                 male: b[4],
                 time: b[2]
            }) 
                }
            }*/
            /*for(var i = 0 ; i < response.data.length ; i++) {
               var a = response.data[i].split('/')
               this.data1.push({
                 name: a[0],
                 id: a[1].substring(12,18),
                 age: a[3],
                 male: a[4],
                 time: a[2]
            }) 
            }*/
            /*console.log(info)
            var a = info[0].indexOf('/')
            console.log(a)
            var name = info[0].substring(0, a)
            console.log(name)*/
          })
        }
    }
</script>