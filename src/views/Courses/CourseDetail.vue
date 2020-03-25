<template>
  <div>
    <el-container class="mainWrap">
      <!-- 顶部 Begin -->
      <el-header>
        
        <!-- 左边班级信息 -->
        <el-col class="header-left"  :span="8">
          <!-- <span class="logo" @click="$router.push(`/courses/list`)">莞工课堂</span> -->
          <span class="logo" @click="$router.push(`/courses/list`)">{{classInfo.courseName}}-{{classInfo.className}}</span> 
        </el-col>
        <!-- 中间导航栏 -->
        <el-col class="header-center"  :span="12">
          <el-menu 
            class="el-menu-demo" 
            mode="horizontal" 
            background-color="transparent"
            text-color="#fff" 
            active-text-color="#fff"
            :default-active="componentId"
            >
            <el-menu-item @click="toggleTab('ClassMicroCourse')" index="ClassMicroCourse" >课堂</el-menu-item>
            <el-menu-item @click="toggleTab('ClassStatistics')" index="ClassStatistics" v-if="role">统计</el-menu-item>
            <el-menu-item @click="toggleTab('ClassMaterial')" index="ClassMaterial" v-if="role">素材</el-menu-item>
            <el-menu-item @click="toggleTab('ClassStudents')" index="ClassStudents">学生</el-menu-item>
          </el-menu>
        </el-col>
        <!-- 右边用户信息 -->
        <el-col class="header-right"  :span="4">
          <span>{{userInfo.nickName || 'admin'}}</span> 
        </el-col>
      </el-header>
      <!-- 顶部 End -->
      <el-main >
        <component :is="componentId"></component>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ClassStudents from '../Courses/ClassStudents'
import ClassMaterial from '../Courses/ClassMaterial'
import ClassMicroCourse from '../Courses/ClassMicroCourse'
import ClassStatistics from '../Courses/ClassStatistics'

import {GetClass } from '@/api/courses'
import {GetUser} from '../../api/login'

export default {
  components:{
    ClassStudents,
    ClassMaterial,
    ClassStatistics,
    ClassMicroCourse
  },
  data(){
    return{
      componentId: 'ClassStudents',
      classInfo: {},
      userInfo:{},
      role: true //true-teacher false-student
    }
  },
  methods: {
    fetch(){
      GetUser(localStorage.userID).then(res=>{
        this.userInfo = res.data
        console.log(this.userInfo)
        GetClass(this.$route.params.id).then(res=>{
          this.classInfo =  res.data
          // console.log('classInfo')
          // console.log(this.classInfo)
          
          if(this.userInfo.email == this.classInfo.teacherID){
            //老师
            this.role = true

            // alert('teacher')
          }else{
            //学生
            this.role = false
            // alert('student')
          }
        })
      })
      
      // console.log(this.classInfo)
      
    },
    toggleTab(tab){
      this.componentId = tab
    }
  },

  created() {
    this.fetch()
  },
}
</script>

<style lang="scss">
  .el-header{
    background-color: rgb(0, 153, 68);
    color:#fff;
    
    line-height: 60px;
    .header-left{
      text-align: left;
      line-height: 60px;
      .logo{
        font-size: 24px;
        font-weight: bold;
        cursor:pointer;
      }
    }
    .header-center{
      .el-menu-demo{
          .el-menu-item{
            &:hover {
              background-color: rgba(255,255,255,0.2) !important;
            } 
            
          }
      }
    }
    
  }
  .mainWrap{
    background-color: #eff4f8;
    height: 100vh;
  }
</style>

