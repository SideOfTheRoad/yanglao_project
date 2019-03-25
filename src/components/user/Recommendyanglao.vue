<template>
    <div style="background:#fff;padding: 20px">
    <Row span>
      <Col span = 24>
          <Carousel autoplay v-model="value2" loop>
              <CarouselItem>
                  <div class="demo-carousel">
                   <router-link to="Infoyanglao"><img class="yanglao_img" :src = "image_1"></router-link>
                   <p class="yanglao_name">汇晨朝来老年公寓（汇晨来广营项目）</p>
                  </div>
              </CarouselItem>
              <CarouselItem>
                  <div class="demo-carousel">
                   <router-link to="Infoyanglao"><img class="yanglao_img" :src = "image_2"></router-link>
                   <p class="yanglao_name">远洋·椿萱茂老年公寓</p>
                  </div>
              </CarouselItem>
              <CarouselItem>
                  <div class="demo-carousel">
                   <router-link to="Infoyanglao"><img class="yanglao_img" :src = "image_3"></router-link>
                   <p class="yanglao_name">泰邦健康长者公寓</p>
                  </div>
              </CarouselItem>
              <CarouselItem>
                  <div class="demo-carousel">
                   <router-link to="Infoyanglao"><img class="yanglao_img" :src = "image_4"></router-link>
                   <p class="yanglao_name">云崖牧歌颐养中心</p>
                  </div>
              </CarouselItem>
          </Carousel>        
      </Col>
    </Row>
    <Row>
        <Table border :columns="columns7" :data="data6"></Table>
    </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value2: 0,

                image_1:"http://static.yanglao.com.cn/uploads/resthome/226231/1455850442719781088.png",
                image_2:"http://img.mp.itc.cn/upload/20170314/8d0bc249b894474db0d79bd3c2c18591_th.jpeg",
                image_3:"http://img.zcool.cn/community/0157ea5bcc4208a8012099c8127f10.jpg@900w_1l_2o_100sh.jpg",
                image_4:"http://y1.ifengimg.com/cmpp/2013/09/27/02/c0d60584-4e4c-4479-b15d-b43ff15886bc.jpg",          
                columns7: [
                    {
                        title: '名称',
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
                        title: '床位数',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '收费区间',
                        key: 'fee'
                    },
                    {
                        title: '详细信息',
                        key: 'action',
                        width: 120,
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
                                            //this.show(params.index)
                                            this.$router.push('/Infoyanglao');
                                        }
                                    }
                                }, '查看'),
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: '威海市文登区玉岭山庄养老院',
                        age: 300,
                        address: '威海市文登区环山街道小嵛岭村180号',
                        fee: '1500-6000'
                    },
                    {
                        name: '威海莱迪医院医养中心',
                        age: 200,
                        address: '威海市高技区锦州路18',
                        fee: '1800-7800'
                    },
                    {
                        name: '威海市文登区爱德养老院',
                        age: 200,
                        address: '龙山办西汤后村爱德养老院',
                        fee: '1000-2200'
                    },
                    {
                        name: '威海市文登区福泰老年公寓',
                        age: 200,
                        address: '威海市文登区龙山街道办事处河埠庄社区（珠海西路南539号）',
                        fee: '800-3000'
                    },
                    {
                        name: '威海尚颐长者照护之家（社区养老院）',
                        age: 15,
                        address: '山东省威海市环翠区张村镇淮河街河北面柳沟花园别墅区第一排1-10号',
                        fee: '1200-3000'
                    },
                    {
                        name: '威海荣成市石岛桃树园农家休养院',
                        age: 50,
                        address: '山东威海荣成石岛区桃树园',
                        fee: '2700-3600'
                    },
                ]
            }




            
        }        

    }
</script>

<style type="text/css">
  .demo-carousel {
    height: 200px;
  }
  .yanglao_img {
    height: 80%;
    width: 40%;
  }
  .yanglao_name{
    text-align: center;
  }
</style>