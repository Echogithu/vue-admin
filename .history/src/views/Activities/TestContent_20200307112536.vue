<template>
  <div class="testContent">
    <!-- <el-container> -->
      <div class="header">
        <div>{{testRecord.thisTestName}}</div>
        <countDown endTime="1590761620" :callback="callback" endText="已经结束了"></countDown> 
      </div>
      <div class="time">
        <i class="el-icon-time"></i>
        <span>{{testRecord.duration}}</span>
      </div>
      <div class="main"> 
        <div class="mainContent">
          <div class="titleArea">
            <el-tag size="mini">{{index+1}}</el-tag>
            <span class="questionScore">({{testArrays[index].score}}分)</span>
            <span class="questionTitle">{{testArrays[index].title}}</span>
          </div>
          <div class="questionChoice" v-for="(item, index) in testArrays[index].answerOptions" :key="index">
            <div class="item">
              <el-button type="success"   size="mini" plain>{{item.option}}</el-button>
              <span class="optionContent">{{item.optionContent}}</span>
            </div>
          </div>
          </div>   
      </div>

      <div class="footer">
        <el-button type="text" @click="previousOne">上一题</el-button>
        <div>
          <span class="tag"  >{{index+1}}/{{testArrays.length}}</span>
          </div>
        <el-button type="text" @click="nextOne">下一题</el-button>
      </div>
    <!-- </el-container> -->
  </div>
</template>

<script>
import {GetTestRecord} from '@/api/activities'
import {countDown} from '../../components/Time'

export default {
  data() {
    return {
      index:0,
      testRecord:'',
      testArrays:[],
      studentAnswer:[
        {
          studentID:'',
          testsList:[
            {
              testName:'',
              testTime:'',
              chooseAnswers:[]
            }
          ]
         
        }
      ]
    }
  },

  methods: {
    fetch(){
      this.studentID = this.$route.params.id
      GetTestRecord(this.studentID).then(res=>{
        console.log('rest')
        this.testRecord = res.data[0]
        this.testArrays = res.data[0].test[0].content
        console.log( this.testRecord)
      })
    },

    //上一题 下一题
    previousOne(){
      --this.index 
    },
    nextOne(){
      ++this.index 
    }
  },

  created() {
    this.fetch()
    // alert(this.$route.params.id)
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
      }
      
    }
  }
  

</style>