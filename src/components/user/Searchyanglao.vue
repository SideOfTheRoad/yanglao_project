<template>
    <div>
      <Row>
<!--         <Col span="4">
            <Cascader :data="subjectdata" v-model="value1" style="width: 300px"></Cascader>
        </Col> -->
        <div>{{LocationCity}}</div>
      </Row>
      <Row>
        <Col span="2">
            <Button type="primary" @click = "handleListApproveHistory()">默认排序</Button>
        </Col>
        <Col span="2">
            <Button type="primary" @click = "select_985()" >985优先</Button>
        </Col>
        <Col span="2">    
            <Button type="primary" @click = "select_211()" >211优先</Button>
        </Col>
        <Col span="2">
            <Button type="primary" @click = "select_good_subject()" >专业优先</Button>
        </Col>
        <Col span="2">    
            <Button type="primary" @click = "select_easy()">容易录取</Button>
        </Col>

        <Col span="1" offset = "1">    
            <Select v-model="model1" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Col>

        <Col span="2" offset ="2">    
            <Button type="primary" @click = "select_city()">查询</Button>
        </Col>        

        <Col span="2" offset="3">   
         <Input v-model="search_value" placeholder="输入学校..." style="width: 100px"></Input>
         </Col>
         <Col span="2">
         <Button type="ghost" shape="circle" icon="ios-search" @click = "search_the_school()"></Button>
        </Col>
       </Row>
       <Row>

        </Row>

      <Table   :columns="historyColumns" :data="historyData"></Table>
      <Page :current.sync="current_page" :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>


      
    </div>
</template>
<style scoped>
  .paging{
      float:right;
      margin-top:10px;
  }
</style>
<script>
    let testData = {
        "histories": [
            {
                "school_name": "北京大学",
                "place": "北京",
                "owner": "教育部",
                "is_985": "1",
                "is_211": "1",
                "self_line":"1",
                "introduction":"/sch/listZszc--schId-367878,categoryId-10460768,mindex-13,start-0.dhtml",
            },
            {
                "school_name": "中国人民大学",
                "place": "北京",
                "owner": "教育部",
                "is_985": "1",
                "is_211": "1",
                "self_line":"1",
                "introduction":"/sch/listZszc--schId-367879,categoryId-10460770,mindex-13,start-0.dhtml",
            },
            {
                "school_name": "清华大学",
                "place": "北京",
                "owner": "教育部",
                "is_985": "1",
                "is_211": "1",
                "self_line":"1",
                "introduction":"/sch/listZszc--schId-367880,categoryId-10460772,mindex-13,start-0.dhtml",
            },
        ]
    }
    export default {
        data () {
            return {
                ajaxHistoryData:[],
                // 初始化信息总条数
                dataCount:0,
                // 每页显示多少条
                pageSize:10,
                default_Columns:[
                    {
                        title: '院校名称',
                        key: 'school_name'
                    },
                    {
                        title: '所在地',
                        key: 'place'
                    },
                    {
                        title: '院校隶属',
                        key: 'owner'
                    },
                    // {
                    //     title: '是否为985',
                    //     key: 'is_985',
                        
                    // },
                    {
                        title: '是否为985',
                        key: 'is_985',

                        render: (h, params) => {
                            let _this = this;
                            let texts = '';
                            if(params.row.self_line == "1"){
                                texts = "是";
                                return h('div', [
                                    h('Icon', {
                                        props: {
                                            type: 'checkmark',
                                            color: '#19be6b',
                                            size: 15,
                                        }
                                    }),
                                ]);

                            }   
                        }
                    },
                    {
                        title: '是否为211',
                        key: 'is_211',
                        //sortable: true,

                        render: (h, params) => {
                            let _this = this;
                            let texts = '';
                            if(params.row.self_line == "1"){
                                texts = "是";
                                return h('div', [
                                    h('Icon', {
                                        props: {
                                            type: 'checkmark',
                                            color: '#19be6b',
                                            size: 15,
                                        }
                                    }),
                                ]);

                            }   
                        }

                    },
                    {
                        title: '自划线学校',
                        key: 'self_line',

                        render: (h, params) => {
                            let _this = this;
                            let texts = '';
                            if(params.row.self_line == "1"){
                                texts = "是";
                                return h('div', [
                                    h('Icon', {
                                        props: {
                                            type: 'checkmark',
                                            color: '#19be6b',
                                            size: 15,
                                        }
                                    }),
                                ]);

                            }   
                        }
                    },
                    {
                        title: '详细介绍',
                        key: 'introduction',
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
                                            this.get_into_school(params.index)
                                        }
                                    }
                                }, '进入'),
                            ]);
                        }
                    },

                ],
                easy_Columns: [
                    {
                        title: '院校名称',
                        key: 'school_name'
                    },
                    {
                        title: '专业',
                        key: 'subject'
                    },
                    {
                        title: '详细介绍',
                        key: 'introduction',
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
                                            this.get_into_school(params.index)
                                        }
                                    }
                                }, '进入'),
                            ]);
                        }
                    },
                ],
                easy_data:[
                    {
                        "school_name":"南京财经大学",
                        "subject":'信息工程学院计算机应用技术',
                    },
                    {
                        "school_name":"杭州师范大学",
                        "subject":'信息工程学院计算机应用技术',
                    },
                    {
                        "school_name":"华东师范大学",
                        "subject":'软件学院计算机应用技术',
                    },
                    {
                        "school_name":"华东师范大学",
                        "subject":'教育信息技术学系计算机应用技术',
                    },
                    {
                        "school_name":"上海师范大学",
                        "subject":'数理信息学院计算机应用技术',
                    },
                    {
                        "school_name":"辽宁大学",
                        "subject":'信息科学与科学技术学院计算机应用技术',
                    },
                    {
                        "school_name":"华东师范大学",
                        "subject":'计算中心',
                    },
                    {
                        "school_name":"西安电子科技大学",
                        "subject":'计算机学院计算机应用技术',
                    },
                    {
                        "school_name":"上海交通大学",
                        "subject":'软件学院计算机应用技术',
                    },
                    {
                        "school_name":"东华大学",
                        "subject":'计算机学院计算机应用技术',
                    },
                ],
                historyColumns: [
                    {
                        title: '院校名称',
                        key: 'school_name'
                    },
                    {
                        title: '所在地',
                        key: 'place'
                    },
                    {
                        title: '院校隶属',
                        key: 'owner'
                    },
                    // {
                    //     title: '是否为985',
                    //     key: 'is_985',
                        
                    // },
                    {
                        title: '是否为985',
                        key: 'is_985',

                        render: (h, params) => {
                            let _this = this;
                            let texts = '';
                            if(params.row.self_line == "1"){
                                texts = "是";
                                return h('div', [
                                    h('Icon', {
                                        props: {
                                            type: 'checkmark',
                                            color: '#19be6b',
                                            size: 15,
                                        }
                                    }),
                                ]);

                            }   
                        }
                    },
                    {
                        title: '是否为211',
                        key: 'is_211',
                        //sortable: true,

                        render: (h, params) => {
                            let _this = this;
                            let texts = '';
                            if(params.row.self_line == "1"){
                                texts = "是";
                                return h('div', [
                                    h('Icon', {
                                        props: {
                                            type: 'checkmark',
                                            color: '#19be6b',
                                            size: 15,
                                        }
                                    }),
                                ]);

                            }   
                        }

                    },
                    {
                        title: '自划线学校',
                        key: 'self_line',

                        render: (h, params) => {
                            let _this = this;
                            let texts = '';
                            if(params.row.self_line == "1"){
                                texts = "是";
                                return h('div', [
                                    h('Icon', {
                                        props: {
                                            type: 'checkmark',
                                            color: '#19be6b',
                                            size: 15,
                                        }
                                    }),
                                ]);

                            }   
                        }
                    },
                    {
                        title: '详细介绍',
                        key: 'introduction',
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
                                            this.get_into_school(params.index)
                                        }
                                    }
                                }, '进入'),
                            ]);
                        }
                    },

                ],
                historyData: [],
                current_page : 1,
                search_value:'',

                value1: [],
                subjectdata: [
                    {
                        value: '1',
                        label: '哲学',
                    },
                    {
                        value: '2',
                        label: '经济学',
                    },
                    {
                        value: '3',
                        label: '工学',
                       children: [
                            {
                                value: '21',
                                label: '计算机科学与技术',
                                children:[
                                    {
                                        value: '31',
                                        label: '计算机系统结构',
                                    },
                                    {
                                        value: '32',
                                        label: '计算机软件与理论',
                                    },
                                    {
                                        value: '33',
                                        label: '计算机应用技术',
                                    },
                                ]

                            },
                            {
                                value:'34',
                                label:'控制科学与工程',
                            },
                            {
                                value:'35',
                                label:'信息与通信工程',
                            },
                            {
                                value:'36',
                                label:'电磁场与微波技术',
                            },

                        ],
                    },
                    {
                        value: '4',
                        label: '教育学',
                    }, 
                    {
                        value: '5',
                        label: '文学',
                    },
                    {
                        value: '6',
                        label: '历史学',
                    },
                    {
                        value: '7',
                        label: '理学',
                    },
                    {
                        value: '8',
                        label: '法学',

                    }, 
                    {
                        value: '9',
                        label: '农学',
                    },
                    {
                        value: '10',
                        label: '哲学',
                    },
                    {
                        value: '11',
                        label: '军事学',
                    },
                    {
                        value: '12',
                        label: '艺术学',
                    }, 
                ],

                cityList: [
                    {
                        value: '北京',
                        label: '北京'
                    },
                    {
                        value: '上海',
                        label: '上海'
                    },
                    {
                        value: '黑龙江',
                        label: '黑龙江'
                    },
                    {
                        value: '辽宁',
                        label: '辽宁'
                    },
                    {
                        value: '四川',
                        label: '四川'
                    },
                    {
                        value: '重庆',
                        label: '重庆'
                    },
                    {
                        value: '山东',
                        label: '山东'
                    },
                    {
                        value: '浙江',
                        label: '浙江'
                    },
                    {
                        value: '山西',
                        label: '山西'
                    },
                ],
                model1: '',


                LocationCity:"正在定位", 

            }
        },
        methods:{
            // 获取历史记录信息
            handleListApproveHistory(){
                
                // 保存取到的所有数据
               console.log(this.GLOBAL.now_ip+'get_all_school') 
               this.$request.post(this.GLOBAL.now_ip+'get_all_school',{
                    a:'1'
                }).then((response) => {

                    testData.histories = response.data;
                    this.ajaxHistoryData = testData.histories;
                    //console.log(this.ajaxHistoryData)
                this.dataCount = testData.histories.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
                });               
            },
            changepage(index){
                var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.historyData = this.ajaxHistoryData.slice(_start,_end);
            },

            set_page(){
                this.current_page = 3;
                console.log(this.current_page);

            },

            get_into_school (index) {
                this.$router.push('/circleinfo');
                //console.log(this.historyData[index].school_name);
                localStorage.setItem('school_name', this.historyData[index].school_name);
                console.log(localStorage.getItem('school_name'));
            },

            search_the_school(){
               console.log(this.search_value);
               this.$request.post('http://192.168.191.1:3000/get_search_school',{
                    a: this.search_value
                }).then((response) => {

                    testData.histories = response.data;
                    this.ajaxHistoryData = testData.histories;
                    //console.log(this.ajaxHistoryData)
                this.dataCount = testData.histories.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
                });  
            },
            select_985(){
                console.log(4561);
               this.$request.post('http://192.168.191.1:3000/get_985_school',{
                    a: '1'
                }).then((response) => {
                    this.historyColumns = [
                    {
                        title: '院校名称',
                        key: 'school_name'
                    },
                    {
                        title: '所在地',
                        key: 'place'
                    },
                    {
                        title: '院校隶属',
                        key: 'owner'
                    },
                    {
                        title: '详细介绍',
                        key: 'introduction',
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
                                            this.get_into_school(params.index)
                                        }
                                    }
                                }, '进入'),
                            ]);
                        }
                    },
                ]
                    testData.histories = response.data;
                    this.ajaxHistoryData = testData.histories;
                    //console.log(this.ajaxHistoryData)
                this.dataCount = testData.histories.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
                });  
            },
            select_211(){

               this.$request.post('http://192.168.191.1:3000/get_211_school',{
                    a: '1',
                }).then((response) => {
                    this.historyColumns = [
                    {
                        title: '院校名称',
                        key: 'school_name'
                    },
                    {
                        title: '所在地',
                        key: 'place'
                    },
                    {
                        title: '院校隶属',
                        key: 'owner'
                    },
                    {
                        title: '详细介绍',
                        key: 'introduction',
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
                                            this.get_into_school(params.index)
                                        }
                                    }
                                }, '进入'),
                            ]);
                        }
                    },
                ]
                    testData.histories = response.data;
                    this.ajaxHistoryData = testData.histories;
                    //console.log(this.ajaxHistoryData)
                this.dataCount = testData.histories.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
                });  
            },
            select_good_subject(){
                this.historyColumns = this.default_Columns;
               this.$request.post('http://192.168.191.1:3000/get_good_school',{
                    a: '1',
                }).then((response) => {

                    testData.histories = response.data;
                    this.ajaxHistoryData = testData.histories;
                    //console.log(this.ajaxHistoryData)
                this.dataCount = testData.histories.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
                });  
            },
            select_easy(){
                this.historyColumns = this.easy_Columns;
                testData.histories = this.easy_data;
                this.ajaxHistoryData = testData.histories;
                    //console.log(this.ajaxHistoryData)
                this.dataCount = testData.histories.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
            },
            select_city(){
                this.historyColumns = this.default_Columns;
               console.log(this.model1);
               this.$request.post('http://192.168.191.1:3000/get_search_city',{
                    a: this.model1
                }).then((response) => {

                    testData.histories = response.data;
                    this.ajaxHistoryData = testData.histories;
                    //console.log(this.ajaxHistoryData)
                this.dataCount = testData.histories.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
                });   
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

        },
        created(){
             //this.handleListApproveHistory();
        },

        mounted: function(){ 
                this.city()    //触发获取城市方法
        },

    }
</script>