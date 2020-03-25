<template>
  <div class="testContent">
    <!-- <el-container> -->
      <div class="header">
        <div>{{testRecord.thisTestName}}</div>
      </div>
      <div class="time">
        <i class="el-icon-time"></i>
        <span>{{testRecord.createTime}}~{{endTime}}</span>
      </div>

      <div class="main"> 
        <div class="mainContent" v-if=" focus < testArrays.length">
          <div class="titleArea" >
            <el-tag size="mini" type="info">{{focus+1}}</el-tag>
            <span class="questionScore">({{testArrays[focus].score}}分)</span>
            <span class="questionTitle">{{testArrays[focus].title}}</span>
          </div>
          <div class="questionChoice" v-for="(item, index) in testArrays[focus].answerOptions" :key="index">
            <div class="item">
              <!-- 单选 -->
              <el-radio-group v-model="studentAnswer.chooseAnswers[focus]" size="small">
                 <el-radio-button     :label="item.option"></el-radio-button>
              </el-radio-group>
              <span class="optionContent">{{item.optionContent}}</span>
            </div>
          </div>
        </div>   
        <div v-else >
        <div class="mainContent"  >
          <template v-for="(item, index) in testArrays">
            <span :key="index" class="topics selected" >{{index+1}}</span>
          </template>
        </div>
        <div  class="resultWrap">
          <el-button type="primary" round class="submitButton" @click="submitStudentAnswer">提交</el-button>
        </div>
        </div>
      </div>

      <div class="footer">
        <el-button type="text" @click="previousOne">上一题</el-button>
        <div v-if=" focus < testArrays.length">
          <span class="tag"  >{{focus+1}}/{{testArrays.length}}</span>
          </div>
        <el-button type="text" @click="nextOne"  v-if=" focus < testArrays.length">下一题</el-button>
      </div>
    <!-- </el-container> -->
  </div>
</template>

<script>
import {GetTestRecord, PostTestRecord} from '@/api/activities'
import moment from 'moment'


export default {

  data() {
    return {
      focus:0,
      // focus:0,
      testRecord:'',
      testArrays:[],
      test:'A',
      studentAnswer:{
        studentID:'',
        testRecordID: '',
        chooseAnswers:[]
      },
      endTime: ''
    }
  },

  methods: {
    fetch(){
      this.testRecordID = this.$route.query.testRecordID
      this.studentData = this.$route.query

      GetTestRecord(this.studentData).then(res=>{
        this.testRecord = res.data[0]
        this.testArrays = res.data[0].test[0].content
        // this.endTime = this.testRecord.createTime + 30
        
        this.testRecord.createTime =  moment(this.testRecord.createTime).format('MM-DD HH:mm'); 
        this.endTime = moment(this.testRecord.createTime).add(this.testRecord.duration, 'minutes').format('MM-DD HH:mm'); 

      })
    },

    //上一题 下一题
    previousOne(){
      --this.focus 
    },
    nextOne(){
      ++this.focus 
    },

    //学生提交答案
    submitStudentAnswer(){
      console.log('test')
      console.log(this.testRecord)
      this.studentAnswer.studentID = this.testRecord
      // PostTestRecord().then(res=>{

      // })
    }
  },

  created() {
    this.fetch()
    // alert(this.$route.params.id)
  },

  computed: {
  },
}
</script>

<style lang="scss">

  .testContent{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .header{
      background-color: #f3faff;
      width: 100%;
      font-size: 16px;
      color: #333;
      text-align: center;
      height: 60px;
      line-height: 60px;
    }
    .time{
      background: #495f8c;
      height: 38px;
      line-height: 38px;
      color: #fff;
      padding-left: 10px;
      i{
        padding-right: 10px;
      }
    }
    .footer{
      text-align: center;
      bottom: 0;
      height: 44px;
      line-height: 44px;
      color: #fff;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #474749;
      box-shadow: 0px 0px 1px 0 #ccc;
      display: flex;
      justify-content: space-between;
      .tag{
        height: 22px;
        background-color:rgba(0, 0, 0, 0.2);
        color:#fff;
        padding: 3px;
        border-radius: 4px;
      }
    }
    .main{
      background: #f3faff;
      flex: 1;
      overflow-y:auto;
      padding: 10px;
      .mainContent{
        background: #fff;
        padding: 20px;
        .titleArea{
          .questionScore{
            margin-left: 10px;
            margin-right: 10px;
            font-size: 14px;
            font-weight: bold;
            color: #009944;
            vertical-align: middle;
          }
          .questionTitle{
            max-width: 100%;
            font-size: 18px;
            vertical-align: middle;
          }
        }
        .questionChoice{
          margin-top: 20px;
          .item{
            margin-top: 10px;
            .optionContent{
              font-size: 16px;
              padding-left: 10px;
            }
          }
        }
        .topics{
          padding:10px  20px;
          font-size: 16px;
          color: #4c8be8;
          cursor: pointer;
          border: 1px solid #4c8be8;
          &.selected{
            background: #4c8be8;
            color:#fff;
          }
        }
        .topics + .topics{
          margin-left: 20px;
        }
        
      }
      .resultWrap{
          text-align: center;
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }
    }
  }
  

</style>