<template>
<div class = 'layout' :class = "{'layout-hide-text' : spanLeft < 3}">
  <Row type = 'flex'>
    <Col :span = 'spanLeft' class = 'layout-menu-left'>
      <Menu :active-name = 'setActive' theme = 'dark' width = 'auto' @on-select = 'routeTo' accordion>
        <div class='layout-logo-left'>
          <h3>XX医院欢迎您</h3>
        </div>
        <Submenu name = '1'>
          <template slot= 'title'>
            <Icon type = 'earth'></Icon>
          办公服务
          </template>
          <MenuItem name = 'Dreserve'>
          <span class = 'layout-text'>
            预约处理</span>
          </MenuItem>
          <MenuItem name= 'rView'>
            <span class = 'layout-text'>
            科室情况 </span>
          </MenuItem>
          <MenuItem name= 'read'>
            <span class = 'layout-text'>
            病例查看 </span>
          </MenuItem>
        </Submenu>
      </Menu>
    </Col>
    <Col :span = 'spanRight'>
      <div class = 'layout-header'>
         <i-button type = 'text' @click.native = 'toggleClick'>
           <Icon type = 'navicon' size = '32'>
           </Icon>
         </i-button>
      </div>
      <div class = 'layout-breadcrumb'>
        <Breadcrumb>
          <Breadcrumb-item>首页</Breadcrumb-item>
          <Breadcrumb-item>页面</Breadcrumb-item>
          <Breadcrumb-item>{{this.$route.path.replace('/', '')}}</Breadcrumb-item>
        </Breadcrumb>
      </div>
      <div class = 'layout-content'>
        <div class = 'layout-content-main'>
          <transition mode = 'out-in'>
          <router-view></router-view>
          </transition>
        </div>
        <div class = 'layout-copy'>
           Copyright nis.hitwh.edu.cn © 2017-2027
        </div>
      </div>
    </Col>
  </Row>
</div>
</template>
<script>
export default {
  data () {
    return {
      spanLeft: 4,
      spanRight: 19,
      page: ['Chart', 'Process']
    }
  },
  computed: {
    iconSize () {
      return this.spanLeft === 5 ? 14 : 24
    },
    setActive () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    toggleClick () {
      if (this.spanLeft === 4) {
        this.spanLeft = 2
        this.spanRight = 22
      } else {
        this.spanLeft = 4
        this.spanRight = 19
      }
    },
    routeTo (e) {
      this.$router.push(e)
    }
  }
}
</script>
<style scoped>

.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    MARGIN-RIGHT: auto;  
    MARGIN-LEFT: auto; 
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    min-height: 600px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 20px 10px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-menu-left {
    background: #464c5b;
    /*min-width: 100px;*/
}

.layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
    line-height: 30px;
    color: white;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
}

.layout-ceiling-main a {
    color: #9ba7b5;
}

.layout-hide-text .layout-text {
    display: none;
}

.ivu-col {
    transition: width .2s ease-in-out;
}
</style>
