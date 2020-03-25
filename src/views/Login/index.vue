<template>
<div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li  v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMneu(item)">{{ item.text }}</li>
      </ul>

      <!-- 表单开始 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm"  class="login-form" size="medium">
        <el-form-item  prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item  prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item  prop="passwords" class="item-form" v-show="model === 'register'">
          <label>确认密码</label>
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <!-- <el-form-item  prop="code" class="item-form" >
          <label>验证码</label>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getSms()" :disabled="codeButtonStatus.status">{{ codeButtonStatus.text }}</el-button>
            </el-col>
          </el-row>
          :disabled = "loginButtonStatus"
        </el-form-item> -->

        <el-form-item>
          <el-button 
          type="danger"
          
          @click="submitForm('loginForm')" 
          class="login-btn block">
          {{ model=== 'login' ? '登录' : '注册'}}
          </el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { GetSms, Login, Register } from '@/api/login'
import { reactive, ref, onMounted } from '@vue/composition-api'
import { stripscript, validateEmail,validatePass,validateVCode} from '@/utils/validate';
export default {
  name: 'login',

  setup(props,context){
    // console.log(context)
    //验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if(validateEmail(value)){
        callback(new Error('用户名格式有误'));
      } else {
        callback();
      }
    };

    //验证密码
    let validatePassword = (rule, value, callback) => {
      //过滤后数据
      ruleForm.password = stripscript(value)
      value = ruleForm.password 

      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (validatePass(value)) {
        callback(new Error('密码为6-20位的数字+字母!'));
      } else {
        callback();
      }
    };

     //验证确认密码
     let validatePasswords = (rule, value, callback) => {
       //如果模块值为login直接通过
       if(model.value === 'login'){callback()}
      //过滤后数据
      ruleForm.passwords = stripscript(value)
      value = ruleForm.passwords

      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value != ruleForm.password) {
        callback(new Error('重复密码不正确'));
      } else {
        callback();
      }
    };

     //验证码
    let checkCode = (rule, value, callback) => {
      // //过滤后数据
      // this.ruleForm.code = stripscript(value)
      // value = this.ruleForm.code 

      if (value === '') {
         callback(new Error('请输入验证码'));
      } else if (validateVCode(value)) {
        callback(new Error('验证码格式有误'));
      } else {
        callback();
      }
     
    };

    //这里放置data数据、生命周期、自定义函数

    /********************************************************************
     * 声明数据
     */
    //对象类型：Reactive（声明单一对象时使用）
    const menuTab = reactive([
      {text: '登录', current: true, type:'login'},
      {text: '注册', current: false, type:'register'}
    ])
    // console.log(menuTab)

    //ref（声明基础数据类型变量时使用）
    //模块值
    const model = ref('login')
    //登录按钮禁用状态
    const loginButtonStatus = ref(true);
    //验证码按钮状态
    const codeButtonStatus = reactive(
      {
        status: false,
        text: '获取验证码'
      }
    )
    //倒计时
    const timer = ref(null);
    // console.log(model.value)

    //表单数据
     const ruleForm = reactive({
      username: '',
      password: '',
      passwords:'',
      code: ''
    })

    //表单验证
    const rules = reactive({
      username: [
        { validator: validateUsername, trigger: 'blur' }
      ],
      password: [
        { validator: validatePassword, trigger: 'blur' }
      ],
      passwords: [
        { validator: validatePasswords, trigger: 'blur' }
      ],
      code: [
        { validator: checkCode, trigger: 'blur' }
      ]
    })


    /******************************************************************************
     * 声明函数
     */
    const toggleMneu = (data => {
      menuTab.forEach(e => {
        e.current = false;
      })
      data.current = true
      model.value = data.type
      //重置表单
      context.refs.loginForm.resetFields();
    })

    /**
     * 获取验证码
     */
    const getSms = (()=>{
      if(ruleForm.username == ''){
        context.root.$message.error('邮箱不能为空');
        return false;
      }
      if(validateEmail(ruleForm.username)){
        context.root.$message.error('邮箱格式有误，请重新输入！！');
        return false;
      }
      //获取验证码
      let requestData = { 
        username: ruleForm.username,
        module: model.value
      }
      //修改获取验证按钮状态
      codeButtonStatus.status = true
      codeButtonStatus.text = '发送中'

      setTimeout(()=>{
        GetSms(requestData).then(response=>{
          let data = response.data
          context.root.$message({
            message: data.message,
            type: 'success'
          })
          //启用登录或注册按钮
          loginButtonStatus.value = true
          //调定时器，倒计时
          countDown(60)
          console.log(data)
        }).catch(error => {
          console.log(error)
        })
      },3000)
    })

    /**
     * 提交表单
     */
    const submitForm = (formName=>{
      context.refs[formName].validate((valid) => {
        //表单验证通过
        if (valid) {
          if(model.value === 'login'){
            login()
          }else{
            register()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    })

    /**
     * 登录
     */
    const login = (()=>{
       let requestData = {
        email: ruleForm.username,
        password: ruleForm.password
      }
      Login(requestData).then(res=>{
        localStorage.token = res.data.token
        localStorage.userID = res.data.id
        // localStorage. 
        context.root.$router.push('/courses/list')
        context.root.$message({
          type:'success',
          message:'登录成功'
        })
      })
    })

     /**
     * 注册
     */
    const register = (()=>{
      let requestData = {
        email: ruleForm.username,
        password: ruleForm.password,
        module: 'register'
      }
      Register(requestData).then(response => {
        let data = response.data
        context.root.$router.go(0)
        context.root.$message({
          message: '注册成功',
          type: 'success'
        })
      }).catch(error => {

      })
    })


    /**
     * 倒计时
     */

    const countDown = ((number)=>{
      //bug: 60和0不见了
      let time = number;

      timer.value = setInterval(()=>{
        time--;
        if(time ===0){
          clearInterval(timer.value)
          codeButtonStatus.status = false
          codeButtonStatus.text = '再次获取'  
        }else{
          codeButtonStatus.text = `倒计时${time}秒`
        }
      },1000)
    })

    /******************************************************************************
     * 生命周期
     */
    //挂载完成后
    onMounted(()=>{
     
    })

    return {
      menuTab,
      model,
      loginButtonStatus,
      codeButtonStatus,
      ruleForm,
      rules,
      toggleMneu,
      submitForm,
      getSms
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  height:100vh;
  background-color: #344a5f;
}

.login-wrap{
  width: 330px;
  margin: auto;
  padding-top: 80px;
}
.menu-tab{
  text-align: center;
  li{
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0,0,0,.1)
  }
}

.login-form{
  margin-top: 29px;
  label{
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color:#fff;
  }
  .item-form{margin-bottom: 13px;}
  .block{
    width:100%;
    display: block;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>