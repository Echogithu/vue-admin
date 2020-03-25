<template>
  <div class="userInfoWrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="dialogFormVisible = true"
        >修改</el-button>
      </div>
      <div>
        <ul class="userInfo">
          <li>
            <div class="label">账户：</div>
            <span>{{userInfo.email}}</span>
          </li>
          <li>
            <div class="label">姓名：</div>
            <span>{{userInfo.name}}</span>
          </li>
          <li>
            <div class="label">昵称：</div>
            <span>{{userInfo.nickName}}</span>
          </li>
          <li>
            <div class="label">性别：</div>
            <span>{{userInfo.gender}}</span>
          </li>
          <li>
            <div class="label">手机号：</div>
            <span>{{userInfo.phone}}</span>
          </li>
          <li>
            <div class="label">所在院校：</div>
            <span>{{userInfo.school}}</span>
          </li>
          <li>
            <div class="label">学号：</div>
            <span>{{userInfo.studentID}}</span>
          </li>
          <li>
            <div class="label">生日：</div>
            <span>{{userInfo.birthday}}</span>
          </li>
          <li>
            <div class="label">社交账号：</div>
            <span>绑定微信</span>
          </li>
        </ul>
      </div>
    </el-card>

    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
      <el-form
        :model="userInfo"
        :rules="rules"
        ref="userInfo"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name" required>
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" required>
          <el-radio-group v-model="userInfo.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="userInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="userInfo.school"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studentID">
          <el-input v-model="userInfo.studentID"></el-input>
        </el-form-item>
        <!-- <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item> -->
        <el-form-item label="生日">
          <el-form-item prop="birthday">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="userInfo.birthday"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validateEmail, validatePhone } from "@/utils/validate";
import { GetUser, EditUser} from '@/api/login'
var moment = require('moment');

export default {
  data() {
    /**检验邮箱格式 */
    var checkEmail = (rule, value, callback) => {
      if (validateEmail(value)) {
        callback(new Error("请输入正确的邮箱格式"));
      } else {
        callback();
      }
    };
   /**检验手机号码格式 */
    var checkPhone = (rule,value,callback) => {
      if (validatePhone(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };

    return {
      dialogFormVisible: false,
      userID:'',
      userInfo: {
        name: "",
        nickName: "",
        gender: "",
        phone: '',
        school: "",
        studentID: '',
        email: "",
        birthday: "",
        wechat: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        nickName: [
          { required: false, message: "请输入昵称", trigger: "change" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        birthday: [
          {
            type: "date",
            required: false,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        email: [{ validator: checkEmail, trigger: "blur"  }],
        phone: [{ validator: checkPhone,trigger: "blur"  }]
      }
    };
  },

  methods: {
    fetch(){
      this.userID = localStorage.userID
      GetUser(this.userID).then(res=>{
        this.userInfo = res.data
        this.userInfo.birthday = moment(this.userInfo.birthday).format('YYYY-MM-DD'); 
      })
      console.log(userInfo)
    },
    submit(){
      EditUser(this.userID,this.userInfo).then(res=>{
        this.$message.success('保存成功')
        this.fetch();
      })
    }
  },

  created() {
    this.fetch() 
  },
};
</script>

<style lang="scss">
.userInfoWrap {
  display: flex;
  justify-content: center;
  .box-card {
    width: 50%;
    .userInfo {
      margin-left: 10px;
      font-size: 16px;
      .label {
        width: 50%;
        display: inline-block;
        text-align: right;
      }

      li {
        padding-top: 15px;
        span {
          padding-left: 10px;
        }
      }
    }
  }
}
</style> 