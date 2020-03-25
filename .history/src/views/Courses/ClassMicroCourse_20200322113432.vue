<template>
  <div class="classWrap">
    <el-row :gutter="20">
      <!-- 左边分组 Begin -->
      <el-col :span="5">
          <div class="grid-content ">
            <Group></Group>
          </div>
      </el-col>
      <!-- 左边分组 End -->
      <!-- 中间内容 Begin -->
      <el-col :span="15">
        <div class="grid-content ">
          <el-card class="activityLists">
            <el-button type="text"  class="active">全部活动</el-button>
            <el-button type="text">微课</el-button>
            <el-button type="text">投票</el-button>
            <el-button type="text">测验</el-button>
            <el-button type="text">问卷</el-button>
            <el-button type="success" class="addActivity"  v-if="role">
              <el-dropdown >
                <span class="el-dropdown-link">
                  <i class="el-icon-plus"></i>
                  新建活动
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-reading"  @click.native="microCourseForm=true">新建微课</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-tickets" @click.native="testForm=true">新建测验</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-data-analysis">新建投票</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-collection">新建问卷</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-button>
          </el-card>

          <!-- 新建微课 -->
          <el-dialog  :visible.sync="microCourseForm" class="testForm">
            <el-form  :model="microCourseData" :label-width="testFormLabelWidth"  >
              <el-form-item label="微课名称" :label-width="testFormLabelWidth">
                <el-input v-model="microCourseData.title" autocomplete="off" placeholder="微课名称"></el-input>
              </el-form-item>
              <el-form-item label="知识点" :label-width="testFormLabelWidth">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入知识点"
                  v-model="microCourseData.describe">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitMicroCourseForm">立即创建</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <!-- 新建测验 -->
          <el-dialog  :visible.sync="testForm" class="testForm">
            <el-form  :model="testFormData" :label-width="testFormLabelWidth"  >
              <el-form-item label="测验名称" :label-width="testFormLabelWidth">
                <el-input v-model="testFormData.title" autocomplete="off" placeholder="测验名称"></el-input>
              </el-form-item>
              <el-form-item label="知识点" :label-width="testFormLabelWidth">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入知识点"
                  v-model="testFormData.describe">
                </el-input>
              </el-form-item>
              <el-form-item label="测验时长" >
                <el-input v-model="testFormData.duration" autocomplete="off" placeholder="20" type="number" class="duration"></el-input>
                <span> 分钟</span>
              </el-form-item>
              <!-- <el-form-item label="是否显示答案">
                <el-select v-model="testFormData.duration" placeholder="是否显示答案">
                  <el-option label="不显示" value="shanghai"></el-option>
                  <el-option label="测验结束后显示" value="beijing"></el-option>
                  <el-option label="提交试卷后立即显示" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="题目显示顺序">
                <el-select v-model="testFormData.duration" placeholder="统一顺序">
                  <el-option label="统一顺序" value="shanghai"></el-option>
                  <el-option label="乱序" value="beijing"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item>
                <el-button type="primary" @click="submitTestForm">立即创建</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
        <template v-for="(item,index) in tests">
          <Activity :activities="item" :role="role" :userInfo="userInfo" :key="index"></Activity>
        </template>
        
      </el-col>
      <!-- 中间内容 End -->
      <!-- 右边公告 Begin -->
      <el-col :span="4">
        <div class="grid-content ">
            <el-card class="box-card rightNotice" >
              <div @click="role? noticeFormVisible = true : studentDialogVisible = true">
                <i class="el-icon-chat-line-round"></i>
                  课堂公告
                <span>{{notice.length == 0 ? '未发' : notice[0].day}}</span>
              </div>
            </el-card>
            <!-- 课堂公告-学生-不可编辑 -->
            <el-dialog
              :visible.sync="studentDialogVisible"
              width="30%"
              center>
              <div slot="title" class="noticeForm">
                <span class="title">{{notice.length == 0 ?'未发布公告':notice[0].title}}</span>
                <p class="subTitle">{{notice.length == 0?' ':notice[0].time}}</p>
              </div>
              <span v-if="notice.length !== 0">{{notice[0].content}}</span>
              <span v-else>未发布公告</span>
              <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="studentDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="studentDialogVisible = false">确 定</el-button>
              </span> -->
            </el-dialog>
            <!-- 课堂公告-教师-可编辑 -->
            <el-dialog  :visible.sync="noticeFormVisible" center>
              <div slot="title" class="noticeForm">
                <span class="title">{{notice.length == 0 ?'发布公告':notice[0].title}}</span>
                <p class="subTitle">{{notice.length == 0?' ':notice[0].time}}</p>
              </div>
              <!-- 未发公告情况 -->
              <el-form :model="noticeForm" label-position="top" v-if="!notice.length">
                <el-form-item label="公告名称" :label-width="formLabelWidth">
                  <el-input v-model="noticeForm.title" autocomplete="off" placeholder="课程公告"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" :label-width="formLabelWidth">
                  <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入公告内容"
                    v-model="noticeForm.content">
                  </el-input>
                </el-form-item>
                <el-button type="primary" @click="submitNoticeForm" class="submit">发布</el-button>
              </el-form>

              <!-- 编辑公告的情况 -->
              <el-form :model="noticeForm" label-position="top" v-else-if="editForm">
                <el-form-item label="公告名称" :label-width="formLabelWidth">
                  <el-input v-model="noticeForm.title" autocomplete="off" placeholder="课程公告"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" :label-width="formLabelWidth">
                  <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入公告内容"
                    v-model="noticeForm.content">
                  </el-input>
                </el-form-item>
                <el-button type="primary" @click="submitEditNoticeForm" class="submit">修改</el-button>
              </el-form>

               <!-- 已发公告的情况 -->
              <div class="noticeFormBody" v-else>
                <div class="noticeFormContent">{{notice[0].content}}</div>
                 <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="editNoticeForm">修改</el-button>
                  <el-button  @click="deleteNoticeForm">删除</el-button>
                </div>
              </div>
            </el-dialog>
          </div>
        </el-col>
      <!-- 右边公告 End -->
    </el-row>

  </div>
</template>

<script>
import Group from '../../components/Group'
import Activity from '../../components/Activity'
import {GetNotice, AddNotice, EditNotice, DeleteNotice } from '@/api/notices'
import {AddTest, GetTests, GetMicroCourse, AddMicroCourse } from '@/api/activities'
import {GetClass } from '@/api/courses'
import {GetUser} from '../../api/login'
var moment = require('moment');


export default {
  components:{Group, Activity},

  data() {
    return {
      noticeFormVisible: false,
      studentDialogVisible:false,
      editForm: false,
      classId:'',
      noticeForm: {
        title: '',
        content:'',
        classId:'',
        class:null
      },
      notice:{},
      formLabelWidth: '120px',
      testFormLabelWidth:'80px',
      tests:[],
      testForm: false,
      testFormData:{
        title:'',
        describe:'',
        duration: 20,
        classId:''
      },
      microCourseForm: false,
      microCourseData:{
        title:'',
        describe: '',
        classId:''
      },
      microCourses:[],
      role:true
    }
  },

  methods: {
    fetch(){
      console.log(this.$route.params.id)
      /**获取通知 */
      GetNotice(this.$route.params.id).then(res=>{
        this.notice = res.data
        this.notice[0].time = moment(this.notice[0].time).format('YYYY-MM-DD HH:mm'); 
        this.notice[0].day = moment(this.notice[0].time).format('MM.DD'); 
        console.log(this.notice)
      })
      /***获取活动-测验 */
      GetTests(this.$route.params.id).then(res=>{
        this.tests = res.data
        for(let i = 0;i<this.tests.length;i++){
          this.tests[i].time = moment(this.tests[i].time).format('YYYY-MM-DD HH:mm'); 
        }
        console.log(this.tests)
      })

      /***获取活动-测验 */
      GetTests(this.$route.params.id).then(res=>{
        this.tests = res.data
        for(let i = 0;i<this.tests.length;i++){
          this.tests[i].time = moment(this.tests[i].time).format('YYYY-MM-DD HH:mm'); 
        }
        // console.log(this.tests)
      })

      GetUser(localStorage.userID).then(res=>{
          this.userInfo = res.data
          GetClass(this.$route.params.id).then(res=>{
            this.classInfo =  res.data
            this.noticeForm.classId =  res.data._id,
            this.classId = res.data._id
            if(this.userInfo.email == this.classInfo.teacherID){
              //老师
              this.role = true
            }else{
              //学生
              this.role = false
            }
          })
        })
    },

    /**
     * 通知
     */
    submitNoticeForm(){
      AddNotice(this.noticeForm).then(res=>{
        this.$message.success('保存成功')
        this.noticeFormVisible = false
        this.fetch()
      })
      // console.log(this.noticeForm)
    },

    editNoticeForm(){
      this.noticeForm = this.notice[0];
      this.editForm = true;
    },

    submitEditNoticeForm(){
      let id = this.noticeForm._id;
      EditNotice(id,this.noticeForm).then(res=>{
        this.$message.success('修改成功')
        this.noticeFormVisible = false
        this.editForm = false
        this.fetch()
      })
    },

    deleteNoticeForm(){
      // console.log(this.notice[0]._id)
      DeleteNotice(this.notice[0]._id).then(res=>{
        this.$message.success('删除成功')
        this.fetch()
      })
      this.noticeFormVisible = false
    },

    /**
    * 添加微课-提交表单
    */
    submitMicroCourseForm(){
      this.microCourseData.classId = this.classId;
      console.log(this.microCourseData)
      AddMicroCourse(this.microCourseData).then(res=>{
        this.$message.success('保存成功')
        this.microCourseForm = false
        this.fetch()
      })
    },

    /**
     * 添加测验-提交表单
     */
    submitTestForm(){
      this.testFormData.classId = this.classId;
      console.log(this.testFormData)
      AddTest(this.testFormData).then(res=>{
        this.$message.success('保存成功')
        this.testForm = false
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
  .classWrap {
    margin-left: 80px;
    margin-right: 80px;
  }
  .grid-content{
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e9e9e9;
    box-shadow: 0 0 4px rgba(60, 115, 193, .05);
  }
  .activityLists{
    padding-left: 20px;
    padding-right: 20px;
    color: #333;
    .el-card__body{
      padding: 0;
      display:flex;
      justify-content: space-between;
      button{
        color: #333;
      }
      .active{
        color: rgb(0, 153, 68);
      }
      .addActivity{
        color: #fff;
        margin-right: -20px;
        .el-dropdown-link{
          color: #fff;
        }
      }
    }
    
  }
  .rightNotice{
    cursor: pointer;
    span{
      float: right;
      font-size: 12px;
      color: #97979A;
      letter-spacing: 0;
      line-height: 18px;
      vertical-align: middle;
      width: 32px;
      height: 18px;
      text-align: center;
      background: #eff4f8;
      border-radius: 4px;
    }
  }

  .noticeForm{
    .title{
      font-size: 20px;
      font-weight: bold;
    }
    .subTitle{
      color: #97979A;
      padding-top: 10px;
    }

  }
  .noticeFormBody{
    .noticeFormContent{
      height: 200px;
    }
    .footer{
      margin-top: 30px;
    }
  }

  .testForm{
    .duration{
      width: 50%;
    }
  }
</style>