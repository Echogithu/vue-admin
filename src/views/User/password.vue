<template>
  <div>
    <el-card class="userCard">
      <div slot="header" class="header">
        <span>修改账户密码</span>
      </div>
      <el-form
        :model="user"
        :rules="rules"
        ref="user"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="账户" prop="email" >
          <el-input v-model="user.email"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName" >
          <el-input v-model="user.nickName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="user.password" type="text"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="submit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { stripscript,validatePass } from "@/utils/validate";
import { GetUser, EditUser} from '@/api/login'

export default {
  data() {
    /**
     * 验证密码 6-20位字母加数字
     */
    let validatePassword = (rule, value, callback) => {
      //过滤后数据
      this.user.password = stripscript(value)
      value =  this.user.password 

      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (validatePass(value)) {
        callback(new Error('密码为6-20位的数字+字母!'));
      } else {
        callback();
      }
    };

    return {
      userID:'',
      user:{
        email:'',
        nickName:'',
        password:''
      },
      rules: {
        nickName: [
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        password:[
          { validator: validatePassword, trigger: "blur" }
        ]
      }
    }
  },


  methods: {
    fetch(){
      this.userID = localStorage.userID
      GetUser(this.userID).then(res=>{
        this.user = res.data

      })
    },
    submit(){
      EditUser(this.userID ,this.user).then(res=>{
        this.$message.success('保存成功')
        this.$router.go(0)
      })
    }
  },

  created() {
    this.fetch()
  },
}


</script>

<style lang="scss">
  .userCard {
    width: 480px;
    margin: 0 auto;
    .header{
      text-align: center;
    }
  }
</style>