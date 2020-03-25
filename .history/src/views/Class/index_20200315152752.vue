<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/courses/list' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级列表</el-breadcrumb-item>
    </el-breadcrumb>
    
    <div>
      <!-- 没有班级情况 Begin-->
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" class="add-class" shadow="hover" v-if="false">
          <!-- card body -->
          <div class="add-class-button"   @click="addClassFormVisible=true">
          <!-- <div class="add-class-button"   @click="data.addClassForm=true"> -->
            <i class="el-icon-plus"></i>
            <p>新增班级</p>
          </div>
        </el-card>
      </el-col>
      <!-- 没有班级情况 End-->

      <!-- 添加班级表单 Begin -->
      <el-dialog title="添加班级" :visible.sync="addClassFormVisible" width="30%" center>
        <el-form >
            <el-input v-model="code" autocomplete="off" placeholder="请输入班级邀请码"></el-input>
        </el-form>
        <el-dialog
          width="30%"
          class="innerVisible"
          :visible.sync="innerVisible"
          append-to-body 
          v-if="classInfo.length != 0">
          <div class="content">{{classInfo[0].courseName}}</div>
          <div>{{classInfo[0].className}}</div> 
          <div>{{classInfo[0].grade}}学年第{{classInfo[0].semester==0?'一':'二'}}学期</div>
          <el-button type="primary" @click="addClass">确认加入班级</el-button>
        </el-dialog>
        <div slot="footer" class="dialog-footer" >
          <el-button @click="addClassFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="findClass(code)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加班级表单 End -->

      <!-- 有班级的情况 Begin -->
      <div class="classWarp" >
        <template v-for="(item,index) in classInfo" >
           <el-card class="classCard" shadow="hover"  @click.native="$router.push(`/course/class/${item._id}`)" :key="index">
            <div class="class-card-left">
              <div class="class-card-top">
                <h1>{{item.courseName}}-{{item.className}}</h1>
              </div>
              <div class="class-card-bottom">
                <span><i class="el-icon-date"></i>{{item.grade}}学年第{{item.semester==0?'一':'二'}}学期</span>
              </div>
            </div>
            
            <div class="class-card-right">
              <el-dropdown >
                <span class="el-dropdown-link">
                  <el-button style="float:right;padding: 3px 0; color:#fff" type="text"><i class="el-icon-more"></i></el-button>  
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item   @click.native="classVisible=true">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dialog
                title="提示"
                :visible.sync="classVisible"
                width="30%"
                >
                <span>确认退出该班级？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="classVisible = false">取 消</el-button>
                  <el-button type="primary" @click="exitClass(item)">确 定</el-button>
                </span>
              </el-dialog>
            </div>
          </el-card>
        </template>
        <el-card :body-style="{ padding: '0px' }" class="classCard addCard" shadow="hover" v-if="true">
          <!-- card body -->
          <div class="add-class-button"   @click="addClassFormVisible=true">
          <!-- <div class="add-class-button"   @click="data.addClassForm=true"> -->
            <i class="el-icon-plus"></i>
            <p>新增班级</p>
          </div>
        </el-card>
      </div>
      <!-- 有班级的情况 End -->
    </div>
  </div>
</template>

<script>
import { findClassByCode,addClassStudent, DeleteClassStudent } from '@/api/students'
import {GetUser} from '../../api/login'
import {GetClassesByUser} from '../../api/courses'

export default {
  data() {
    return {
      classes: null,
      addClassFormVisible:false,
      classVisible: false,
      innerVisible: false,
      classInfo: [{
        courseName:'',
        className:''
      }],
      code:''
    }
  },

  methods: {

    fetch(){  
      GetUser(localStorage.userID).then(res=>{
        this.userInfo = res.data
        GetClassesByUser(this.userInfo.email).then(res=>{
          this.classInfo = res.data
        })
      })
      
    },

    //通过邀请码查找班级
    findClass(code){
      findClassByCode(code).then(res=>{
        this.classInfo = res.data
        console.log(res.data)
        this.innerVisible = true
      })
    },

    //添加到班级
    addClass(){

      let data = {
        studentID: this.userInfo.email,
        classID:this.classInfo[0]._id
      }
      console.log(data)
      addClassStudent(data).then(res=>{
        this.$message.success('添加成功')
        this.fetch()
        this.innerVisible = false
        this.addClassFormVisible = false
      })
    },

    //退出班级
    exitClass(classInfo){
      console.log(classInfo)
      console.log(this.userInfo)
      DeleteClassStudent(this.userInfo.email,classInfo._id).then(res=>{
        this.$message.success('删除成功')
        this.fetch()
        this.classVisible = false
      })
    }
  },

  created() {
    this.fetch()
  },
}
</script>

<style lang="scss">
  
  //添加班级表单
  .innerVisible{
    text-align: center;
    font-size: 16px;
    color: #333;
    font-weight: bold;
    div{
      padding-bottom: 20px;
    }
  }

  //有班级情况卡片
  .classWarp{
    margin-top: 20px;
    padding-right: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .classCard{
      width: 30%;
      height: 142px;
      margin-top: 20px;
      box-sizing: border-box;
      color: #fff;
      cursor:pointer;
      background-image: linear-gradient(to bottom right,#51bdfb,#6affff);
      &:hover{
        margin-top: 15px;
      }
      .el-card__body{
        box-sizing: border-box;
        height: 100%;
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        align-content: space-between;
        .class-card-left{
          max-width: calc(100% - 60px);
          display: flex;
          flex-direction:column;
          justify-content: space-between;
          h1{
            margin: 0;
          }
          span{
            padding-right: 15px;
            >i{
              padding-right:5px;
            }
          }
        }
        .class-card-right{
          display: flex;
          flex-direction:column;
          justify-content: space-between;
          .el-dropdown-menu{
            position: absolute;
            right: 10px;
          }
        }
      }
    }
    &::after{
      content: "";
      width: 30%;
      border:1px solid transparent;
    }

    //没有班级情况
    .addCard{
      height: 142px;
      display: flex;
      justify-content: center;
      align-items:center;
      text-align: center;
      background: #fff;
      cursor: pointer;
      .el-card__body{
        height: 50%;
      }
      i{
        font-size: 40px;
        color: rgb(155, 155, 155);
      }
      p{
        margin: 0;
        font-size: 16px;
        color: #9b9b99;
      }
      &:hover i{
        color: #409EFF;
      }
      &:hover p{
        color: #409EFF;
      }
    }

  }
</style>