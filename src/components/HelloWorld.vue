<template>
<div>
  <video autoplay loop muted  style="width:100%" >
  <source src="../assets/1.mp4" type="video/mp4">
  </video>
  <Row>
    <Col :span="2" :offset="19">
      <Button type="text" style="color:#fefefe" @click = 'modal1 = true'>Sign up</Button>
    </Col>
    <Col :span="2" >
      <Button type="text" style="color:#fefefe" >About me</Button>
    </Col>
  </Row>
  <Modal v-model = 'modal1' title = '新用户注册' width = '360' @on-ok = 'ok(newform)'>
    <Form ref = 'newform' :model= 'newform' :rules = 'newrule' inline>
      <FormItem prop = 'username'>
        <Input type = 'text' v-model = 'newform.username' placeholder = '请输入手机号'>
          <Icon type = 'ios-person-outline' slot = 'prepend'></Icon>
        </Input>
      </FormItem>
      <FormItem prop = 'password'>
        <Input type = 'password' v-model= 'newform.password' placeholder = '请输入密码'>
          <Icon type = 'ios-locked-outline' slot = 'prepend'></Icon>
        </Input>
      </FormItem>
      <FormItem prop = 'id'>
        <Input type = 'text' v-model = 'newform.id' placeholder = '请输入身份证号'>
          <Icon type = 'clipboard' slot = 'prepend'></Icon>
        </Input>
      </FormItem>
    </Form>
  </Modal>
  <Col span = '6' offset = '9' style='margin-top:150px'>
    <h1>XX医院就诊服务平台</h1>
    <i-form ref= 'formInline' :model = 'formInline' :rules = 'ruleInline'>
      <Form-item prop = 'user'>
        <Input v-model = 'formInline.user' placeholder = '请输入注册时手机号'></Input>
      </Form-item>
      <Form-item prop= 'passwd'>
        <Input v-model = 'formInline.passwd' type = 'password' placeholder = '请输入密码'></Input>
      </Form-item>
      <Form-item>
        <i-button type= 'success' @click="submit('formInline')" size = 'large'>登录</i-button>
      </Form-item>
    </i-form>
  </Col>
</div>
</template>
<script>
export default {
  data () {
/*    const validatePass = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入密码'))
      } else {
        if(this.formCustom.passwdCheck !== ''){
          this.$refs.formCustom.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('请再次输入密码'))
      } else {

      }
    }*/
    return {
      newform: {
        tel: '',
        password: '',
        id: ''
      },
      newrule: {
        username: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        password: [
          {required: true, message : '请输入密码',trigger: 'blur'},
          {type: 'string', min: 6, message : '密码长度不得小于六位'}
        ],
        id: [
          {required: true, message: '请输入真实身份证号'},
          {type: 'string', min: 18, max:18, message: '请输入符合规范的身份证号', trigger: 'blur'}
        ]
      },
      modal1: false,
      formInline: {
        user: '',
        passwd: ''
      },
      ruleInline: {
        user: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        passwd: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          type: 'string',
          min: 3,
          message: '密码长度不能小于3位',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    ok(name) {
      this.$request.post('/api/sign', {
        'tel' : this.newform.username,
        'passwd': this.newform.password,
        'id': this.newform.id
      }).then((response) => {
        if(response.status === 200) {
          console.log("1111")
          console.log(response)
          this.$Message.success('注册成功')
        }        
      })
    },
    submit (name) {
      console.log(this.formInline.passwd)
      if(this.formInline.user === 'root' && this.formInline.passwd === 'root') {
        this.$router.push('/whome')
      } else {
      this.$request.post('/api/log', {
      //this.$request.post('localhost:3000/api/sign', {
        'user': this.formInline.user,
        'passwd': this.formInline.passwd
     }).then((response) => {
      console.log(response)
      if(response.status === 200) {
        this.$router.push('/mhome')
        localStorage.setItem('uuid', response.data.uuid)
        localStorage.setItem('id',response.data.id)
        localStorage.setItem('score',response.data.score)
      }
     })
   }
    }
  }
}
</script>
<style scoped>
video {
  position: fixed;
  right:0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  height: auto;
  overflow:hidden;
  z-index: -99999;
  -webkit-filter:brightness(.6);
}
h1 {
  font-family:Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
  font-size: 25px;
  color: #eeeeee;
  text-align: center;
  margin-bottom: 50px;
}
h5{
  font-family:Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
  font-size: 15px;
  color: #eeeeee;
  }
h2 {
  margin-top:0px;
  font-family: "Century Gothic";
  font-size:50px;
  font-weight: normal;
  color: #00B050;
}
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 150px;
    padding-bottom: 200px;
}
.wrapper > h1{
  text-align: center;
  vertical-align: middle;
  margin-bottom: 20px;
  color: #000;
}
.login {
    margin: 0 auto;
    padding: 200px auto;
    width: 200px;
    height: 100%;
}
</style>