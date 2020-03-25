<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/courses/list' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    
    <!-- <div>{{courseArray}}</div> -->
    <div class="">
    <el-row :gutter="20" v-for="(item, index) in courseArray" :key="index" class="course-list">
      <!-- 课程标题 Begin -->
      <div>
        <h2>{{item.courseName}}</h2>    
        <div class="course-list-edit" >
          <!-- <el-tooltip class="item" effect="dark" content="置顶" placement="bottom">
            <i class="el-icon-bell"></i>
          </el-tooltip> -->
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <i class="el-icon-edit" @click="editCourse(item)"></i>
            <!-- <i class="el-icon-edit" @click="$router.push(`/courses/edit/${item._id}`)"></i> -->
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="添加" placemeid="bottom">
            <i class="el-icon-plus"  @click="showForm(item)"></i>
            <!-- <i class="el-icon-plus" @click="$router.push(`/courses/create`)"></i> -->
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <!-- <i class="el-icon-delete" @click="data.dialogVisible=true"></i> -->
            <i class="el-icon-delete"  @click="deleteCourseForm(item)"></i>
          </el-tooltip>

          <!-- 编辑课程 -->
          <el-dialog  :visible.sync="editCourseForm" >
            <div slot="title">
              <span>编辑课程</span>
            </div>
            <el-form  :model="courseForm" label-width="80px" class="courseForm">
              <el-form-item label="课程名称" class="form-item">
                <el-input v-model="courseForm.courseName"></el-input>
              </el-form-item>
              <el-form-item label="课程简称" class="form-item">
                <el-input v-model="courseForm.shortName"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="editCourseSumbit()">提交</el-button>
            </div>
          </el-dialog>

          <!-- 删除课程 -->
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <span>课程删除后，该课程所有班级将被删除，确认删除吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="deleteCourse(item)">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <!-- 课程标题 End -->
      <!-- 课程下班级列表 Begin -->
      <!-- 有班级情况 -->
      <div v-for="(c,index) in item.classes" :key="index"  @click="$router.push(`/course/class/${c._id}`)">
        <el-col :span="8">
          <el-card class="class-card" shadow="hover" >
            <div class="class-card-left">
              <div class="class-card-top">
                <h1>{{c.className}}</h1>
              </div>
              <div class="class-card-bottom">
                <!-- <span><i class="el-icon-user"></i>0</span> -->
                <span><i class="el-icon-date"></i>{{c.grade}}学年第{{c.semester==0?'一':'二'}}学期</span>
              </div>
            </div>
            
            <div class="class-card-right">
              <el-dropdown >
                <span class="el-dropdown-link">
                  <el-button style="float:right;padding: 3px 0; color:#fff" type="text"><i class="el-icon-more"></i></el-button>  
                </span>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item>归档</el-dropdown-item> -->
                  <el-dropdown-item   @click.native="editClass(c)">编辑</el-dropdown-item>
                  <el-dropdown-item   @click.native="classVisible=true">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dialog
                title="提示"
                :visible.sync="classVisible"
                width="30%"
                >
                <span>确认删除该班级？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="classVisible = false">取 消</el-button>
                  <el-button type="primary" @click="deleteClass(c)">确 定</el-button>
                </span>
              </el-dialog>
              <el-button class="class-button" size="mini" >上课</el-button>
            </div>
          </el-card>
        </el-col>
      </div>
      
      <!-- 没有班级情况 Begin-->
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" class="add-class" shadow="hover" v-if="!item.classes.length">
          <!-- card body -->
          <div class="add-class-button"   @click="showForm(item)">
          <!-- <div class="add-class-button"   @click="data.addClassForm=true"> -->
            <i class="el-icon-plus"></i>
            <p>新增班级</p>
          </div>
        </el-card>
      </el-col>
      <!-- 没有班级情况 End-->
      <!-- 课程下班级列表 End -->

       <el-dialog  :visible.sync="addClassForm" >
           <div slot="title">
             <span>{{isCreate ? '创建' : '编辑'}}班级</span>
           </div>
          <!-- <p>{{scope.row}}</p> -->
          <el-form :model="classform">
            <el-form-item label="班级名称" :label-width="formLabelWidth">
              <el-input v-model="classform.className" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="开学学期" :label-width="formLabelWidth" >
              <el-select v-model="classform.grade" placeholder="请选择">
                <el-option label="2019-2020" value="2019-2020"></el-option>
                <el-option label="2018-2019" value="2018-2019"></el-option>
                <el-option label="2017-2018" value="2017-2018"></el-option>
                <el-option label="2016-2017" value="2016-2017"></el-option>
              </el-select> 学年度
              <el-select v-model="classform.semester" placeholder="请选择">
                <el-option label="第一" value="0"></el-option>
                <el-option label="第二" value="1"></el-option>
              </el-select> 学期
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addClass()">提交</el-button>
          </div>
        </el-dialog>
    </el-row>
    </div>
  </div>
</template>

<script>
import { GetCourses, EditCourse, DeleteCourse, AddClass, EditClass, DeleteClass } from '@/api/courses'
import {GetUser} from '../../api/login'

export default {
  data() {
    return {
      // course:[],
      courseArray:[],
      classArray:[],
      editCourseForm:false, //编辑课程提示
      dialogVisible: false, //删除课程提示
      courseForm: {
        courseName: '',
        shortName:''
      },
      classVisible: false,  //删除班级提示
      addClassForm: false,  //创建 or 编辑班级
      // showAddClass: false,
      isCreate: true,
      clickCourse:null,//课程id
      classform: {
          course: '',
          className: '',
          grade: '2018-2019',
          semester: '0',
          courseName:''
        },
      formLabelWidth: '120px',
    }
  },

  methods: {
    /**
     * 获取课程列表
     */
    fetch(){
      let userID = localStorage.userID
      GetUser(userID).then(res=>{
        this.userInfo = res.data
      })
      GetCourses(userID).then(res => {
        this.courseArray = res.data
      }).catch(error=>{
        console.log(error)
      })

    },
    /**
     * 删除课程-确定框
     */
    deleteCourseForm(item){
      this.dialogVisible = true
      this.clickCourse = item._id
      // alert(this.data.clickCourse)
    },
    /**
     * 删除课程-确定框-确定按钮
     */
    deleteCourse(){
      this.dialogVisible = false
      let id = this.clickCourse
      console.log(id)
      DeleteCourse(id).then(res=>{
        this.$message.success('删除成功')
        this.fetch()
      })
    },
    /**
     * 编辑课程-表单
     */
    editCourse(item){
      this.editCourseForm = true;
      this.courseForm = item
      console.log(this.courseForm)
    },
    /**
     * 编辑课程-表单-保存按钮
     */
    editCourseSumbit(){
      let id = this.courseForm['_id']
      EditCourse(id,this.courseForm).then(res=>{
        this.$message.success('保存成功')
        this.editCourseForm = false;
        this.fetch();
      })
    },

    /**
     * 添加班级表单
    */
    showForm(item){
      this.classform = {
          course: '',
          className: '',
          grade: '',
          semester: '',
          courseName: '',
      },
      this.isCreate = true;  
      this.addClassForm = true;
      this.classform.course = item._id;
      this.classform.courseName = item.courseName;
      // console.log(item)
    },
    /**
     * 编辑班级-表单
    */
    editClass(c) {
      this.addClassForm = true;
      this.classform = c;
      this.isCreate = false;
    },
    /**
     * 编辑班级-表单-提交按钮
    */
    addClass(){
      let id = this.classform['_id']

      if(id){
        console.log(this.classform)
        EditClass(id,this.classform).then(res=>{
          this.$message.success('保存成功')
          this.fetch();
        })
      }else{
        this.classform.teacherID = this.userInfo.email
        AddClass(this.classform).then(res=>{
          this.$message.success('保存成功')
          this.fetch();
        })
        
      }
      this.classform = {
          course: '',
          className: '',
          grade: '',
          semester: '',
          courseName: '',
      },
      this.addClassForm = false;
    },
    /**
     * 删除班级
     */
    deleteClass(c){
      this.classVisible = false
      DeleteClass(c._id).then(res=>{
        this.$message.success('删除成功')
        this.fetch()
      })
    }
  },

  created() {
    this.fetch()
  },
}
</script>

<style lang="scss" >
    .course-list{
      margin-top: 20px;
      h2{
        font-size: 18px;
        font-weight: bold;
        padding-left: 10px;
        padding-right: 20px;
        display: inline-block;
      }
      .course-list-edit{
        display: inline-block;
        .item{
          margin-left: 15px;
          text-align: center;
        }
        i{
          font-size: 15px;
          color: #9b9b99;
          cursor: pointer;
        }
      }
    }

    // 班级卡片
    .class-card{
      /* min-width: 20%;  */
      box-sizing: border-box;
      width: 100%;
      height: 142px;
      margin-top: 20px;
      color: #fff;
      cursor:pointer;
      background-image: linear-gradient(to bottom right,#1fbdb8,#47e894);

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

    //没有班级情况
    .add-class{
      margin-top: 20px;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items:center;
      text-align: center;
      cursor: pointer;
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
</style>
