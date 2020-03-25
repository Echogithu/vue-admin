<template>
  <div  class="classStudentsWrap">
    <el-row :gutter="20">
      <!-- 左边分组 -->
      <el-col :span="4" v-if="role">
        <el-button  type="success" plain  @click="dialogVisible = true"><i class="el-icon-user"></i> 邀请学生</el-button>
        <!-- 邀请卡 Begin -->
        <el-dialog
          title="课程邀请卡"
          :visible.sync="dialogVisible"
          width="30%"
          center>
          <div class="inviteCard">
            <div class="cardName"><div class="label">课程:</div><span class="content">{{classInfo.course.courseName}}</span></div>
            <div class="cardName"><div class="label">班级:</div><span class="content">{{classInfo.className}}</span></div>
            <div class="cardName"><div class="label">教师:</div><span class="content">{{userInfo.nickName || 'admin'}}</span></div>
            <div class="cardName"><div class="label">邀请码:</div><span class="content code">{{classInfo.code }}</span></div>
            <!-- <div class="cardName">
              <img src="" alt="">
              <p>二维码</p>
            </div> -->
          </div>
          <p class="tips">通过邀请码加入班级哦！</p>
          <!-- div -->
        </el-dialog>
        <!-- 邀请卡 End -->
      </el-col>
    

      <!-- 右边学生列表 -->
      <el-col :span="role? 20:24">
          <template>
            <el-table
              style="width: 100%"
              ref="studentsData.students"
               :data="tables">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                label="姓名"
                width="100px"
                prop="name">
              </el-table-column>
              <el-table-column
                label="学号"
                prop="studentID">
              </el-table-column>
              <el-table-column
                label="性别"
                prop="gender">
              </el-table-column>
              <el-table-column
                label="邮箱"
                prop="email">
              </el-table-column>
              <!-- <el-table-column
                label="加入时间"
                prop="joinTime"> -->
              </el-table-column>
              <el-table-column
                align="right">
                <template slot="header" slot-scope="scope">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="关键字搜索"/>
                </template>
                <template slot-scope="scope">
                  <!-- <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {GetClass } from '@/api/courses'
import {GetClassStudents,DeleteClassStudent } from '@/api/students'
import {GetUser} from '../../api/login'

  export default {
    data() {
      return {
        dialogVisible:false,
        classInfo:{},
        userInfo:{},
        studentsData: [],
        search: '',
        role: true
      }
    },
    
    computed: {
      // 模糊搜索
      tables () {
        const search = this.search
        if (search) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.studentsData.filter(data => {
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.studentsData
      }
    },

    methods: {
      fetch(){
        GetUser(localStorage.userID).then(res=>{
          this.userInfo = res.data
          GetClass(this.$route.params.id).then(res=>{
            this.classInfo =  res.data
            if(this.userInfo.email == this.classInfo.teacherID){
              //老师
              this.role = true
            }else{
              //学生
              this.role = false
            }
          })
        })
        
        GetClassStudents(this.$route.params.id).then(res=>{
          // this.studentsData = res.data
           res.data.forEach(e=>{
            this.studentsData = e.students
          })
          // console.log(res.data)
        })
      },

      // handleEdit(index, row) {
      //   console.log(index, row);
      // },
      handleDelete(row) {
        let studentID = row.email
        let classID = this.classInfo._id
        console.log(classID)
        DeleteClassStudent(studentID,classID).then(res=>{
          this.$message.success('删除成功')
          this.fetch()
        }).catch(err=>{
        })
      }
    },

    created() {
      this.fetch()
      
    },

  }
</script>

<style lang="scss">
  .classStudentsWrap{
    margin-left: 80px;
    margin-right: 80px;
    .inviteCard{
      font-size: 16px;
      width: 100%;
      padding-left: 25%;
      .cardName{
        color: #666;
        padding-top: 20px;
        &:first-child{
          padding-top: 0px;
        }
        .label{
          width: 20%;
          display: inline-block;
          padding-right: 20px;
          text-align: right;
          
        }
        .content{
          font-weight: bold;
          &.code{
            color: rgb(0, 153, 68);
          }
        }
        
      }
    }
    .tips{
      margin-top: 20px;
      color: #999;
      font-size: 14px;
      text-align: center;
    }
  }
</style>