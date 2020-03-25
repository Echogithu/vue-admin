<template>
  <div class="testEditWrap">
    <!-- 头部 Begin -->
    <el-header class="header">
        <!-- 左边班级信息 -->
        <div class="headerLeft" >
          <span class="logo" @click="$router.push(`/courses/list`)">莞工课堂</span> 
          <el-tag type="success" class="tag">测验</el-tag>
          <span class="testName">{{testInfo.title}}</span>
          <el-button type="text" class="edit">设置</el-button>
        </div>
        <div class="headerRight">
          <el-button type="success" @click="save">保存并退出</el-button>
        </div>
    </el-header>
    <!-- 头部 End -->
    <el-container>
      <el-aside width="50%" class="left">
        <el-row>
          <el-button type="success" @click="addWordChoice">选择题</el-button>
          <el-button type="success">填空题</el-button>
        </el-row>
        <template v-for="(test,index) in testArrays" >
          <el-card class="box-card topicCard" :class="focus == index? 'focus':''" @click.native="choiced(index)" :key="index"> 
          <div class="serialNumber"><span>{{index+1}}</span></div>
          <div class="titleArea">
            <span class="questionScore">({{testArrays[index].score}}分)</span>
            <span class="questionTitle">{{testArrays[index].title}}</span>
          </div>
          <div class="questionChoice" v-for="(item, index) in testArrays[index].answerOptions" :key="index">
            <div class="item">
              <el-button type="success"   size="mini" plain>{{item.option}}</el-button>
              <!-- <el-checkbox-button v-for="answer in correctAnswers" :label="answer" :key="answer">{{answer}}</el-checkbox-button> -->
              <span class="optionContent">{{item.optionContent}}</span>
            </div>
          </div>
          <div class="questionAnswer">
            <div class="answer">正确答案:
              <span v-for="(item,key) in testArrays[index].correctAnswers" :key="key">{{item}}</span>
            </div>
            <div class="parsing">解析: <span>{{testArrays[index].answerAnalysis}}</span></div>
          </div>
          <i class="el-icon-delete deleteIcon" v-show="focus == index" @click="deleteWordChoice(index)"></i>
        </el-card>
        </template>
        <footer class="footer">
            <span>总计： {{testArrays.length}}题</span>
            <span>总分： {{totalScore()}}分</span>
        </footer>
      </el-aside>
      <el-main  class="right">
          <div class="multipleChoice">
            <div class="titleArea">
              <i class="el-icon-edit-outline"></i>
              <span class="title">{{testArrays[focus].type}}</span>
              <div class="score">
                <span>分值</span>
                <el-input v-model="testArrays[focus].score" type="number" class="input"></el-input>
              </div>
            </div>
            <div class="rightTitle">
              <el-input  placeholder="请输入题目" v-model="testArrays[focus].title"></el-input>   
            </div>
            <div class="answersGroup">
              <p>点击选项前的方框将其设置为正确答案</p>
              <template v-for="(item, index) in testArrays[focus].answerOptions" :key="index">
                <div class="answerItem">
                  <el-checkbox-button v-model="testArrays[focus].correctAnswers" :label="item.option" ></el-checkbox-button>
                  <el-input class="answerInput" placeholder="请输入选项" v-model="item.optionContent"></el-input>
                  <i class="el-icon-error"  @click="deteleOptions" v-show="item.icon"></i>
                </div>
              </template>
              <el-button type="text" class="addItem" @click="addOptions" >添加选项</el-button>
            </div>
            <el-card class="box-card answerAnalysis" shadow="never">
              <div slot="header" class="clearfix">
                <span>答案解析</span>
              </div>
              <el-input type="textarea" class="input" :rows="6" v-model="testArrays[focus].answerAnalysis"></el-input>
            </el-card>
          </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {GetClass } from '@/api/courses'
import {AddTest, GetTest, EditTest } from '@/api/activities'


export default {
  data() {
    return {
      focus: 0,
      active: false,
      classInfo:{},//班级信息
      testInfo:{},
      // totalScore: 0,
      //文字选择题
      wordChoice:{
        'type':'文字选择题',
        'score': 10,
        'title': '请输入题目',
        'answerOptions':[
          {
            'option': 'A',
            'optionContent':'',
            'icon': false
          },
          {
            'option': 'B',
            'optionContent':'',
            'icon': false,
          },
        ],
        'correctAnswers':[],
        'answerAnalysis':''
      },
      //测试题汇总
      testArrays:[] 
    }
  },

  methods: {
    fetch(){  
      /***获取活动-测验 */
      GetTest(this.$route.params.id).then(res=>{
        this.testInfo = res.data
          if(this.testInfo.content.length != 0 ){
            this.testArrays = this.testInfo.content
            console.log(this.testArrays)
          }else{
            let firstWordChoice = JSON.parse(JSON.stringify(this.wordChoice));
            this.testArrays.push(firstWordChoice);
          }
          
      })
      
    },
    /**
     * 选中题号
     */
    choiced(index){
      this.focus = index
    },
  
    /**
     * 添加选择题
     */
    addWordChoice(){
      let newWordChoice = JSON.parse(JSON.stringify(this.wordChoice)); //深拷贝
      this.focus++;
      this.testArrays.push(newWordChoice);
      // console.log(this.testArrays)
    },

    /**
     * 删除选择题
     */
    deleteWordChoice(index){
      // console.log(index)
      this.testArrays.splice(index,1);
      // console.log(this.testArrays)
      // this.fetch()
    },
    /**
     * 添加选项
     */
    addOptions(){
      let item = {
        'option':'',
        'content':'',
        'icon':true
      }
      item.option = String.fromCharCode(64 + parseInt(this.testArrays[this.focus].answerOptions.length) + 1)
      this.testArrays[this.focus].answerOptions.push(item)
    },
    /**
     * 删除选项
     */
    deteleOptions(){
      this.testArrays[this.focus].answerOptions.pop()
    },

    /**
     * 计算总分
     */
    totalScore: function () {
      let totalScore = 0;
      for(let i=0;i<this.testArrays.length;i++){
        totalScore = totalScore + parseFloat(this.testArrays[i].score) 
      }
      this.testInfo.totalScore = totalScore
      return totalScore
    },

    /**
     * 保存并退出
     */
    save(){
      let content = this.testArrays
      this.testInfo.content = content
      console.log(this.testInfo)
      EditTest(this.$route.params.id, this.testInfo).then(res=>{
        this.$router.go(-1)
      })
    }
  },
  created() {
    this.fetch()
  },
  
}
</script>

<style lang="scss" >
  .testEditWrap{
    .header{
      background-color: #009944;
      color: #fff;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      .headerLeft{
        text-align: left;
        .logo{
          font-size: 24px;
          margin-right: 30px;
          font-weight: bold;
          cursor:pointer;
        }
        .testName{
          padding-left: 20px;
          font-size: 16px;
        }
        .edit{
          padding-left: 10px;
          color: #fff;
        }
      }
      .headerRight{
        // float: right;
      }
    }
    .left {
      background-color: #f5f5f5;
      color: #333;
      height: 100vh;
      border-right: 1px solid #999;
      padding: 20px 12px;
      .topicCard{
        position: relative;
        margin-top: 20px;
        border-radius: 0;
        .serialNumber{
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-top: 40px solid #bfc9da;
          border-right: 40px solid transparent;
          transition: all 0.5s ease;
          span{
            position: absolute;
            top: -38px;
            left: 5px;
            color: #ffffff;
          }
        }
        .titleArea{
          line-height: 30px;
          height: 30px;
          .questionScore{
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
        .questionAnswer{
          margin-top: 20px;
          .parsing{
            padding-top: 5px;
          }
        }
        &.focus{
          border: 2px solid #009944;
          .serialNumber{
            border-top: 40px solid #009944;
          }
          .deleteIcon{
            position: absolute;
            right: 10px;
            bottom: 10px;
            font-size: 20px;
            color: #009944;
            cursor: pointer;
          }
        }
      }

      .footer{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 48.5%;
        height: 27px;
        padding-left: 20px;
        line-height: 26px;
        background-color: #e0e6f0;
        border-top: 1px solid #bfc9da;
        color: #444;
        font-size: 14px;
        span{
          padding-right: 15px;
        }
      }
    }
    
    .right {
      color: #333;
      height: 100vh;
      padding: 0;
      padding: 40px;
      .multipleChoice{
        .titleArea{
          color: #424e67;
          font-size: 16px;
          i{
            margin-top: -4px;
            font-size: 20px;
            margin-right: 10px;
            vertical-align: middle;
          }
          .score{
            display: inline-block;
            position: absolute;
            right: 40px;
            text-align: right;
            .input{
              width: 30%;
              padding-left: 5px;
              .el-input__inner{
                height: 25px;
                line-height: 25px;
                padding: 0;
              }
            }
          }
        }

        .rightTitle{
          margin-top: 20px;
        }

        .answersGroup{
          margin-top: 20px;
          p{
            margin: 20px 0;
            color: #969696;
          }
          .answerItem{
            padding-top: 10px;
            font-size: 24px;
            .answerInput{
              width: 80%;
              padding-left: 20px;
              padding-right: 10px;
            }
            i{
              vertical-align:middle;
              line-height: 40px;
              color:#999;
              cursor: pointer;
              &:hover{
                color:#409EFF;
              }
            }
          }
          .addItem{
            margin: 20px 0;
            font-size: 16px;    
          }
        }

        .answerAnalysis{
          .el-card__body{
            padding: 0;
          }
          
        }
      }
    }
 
  }
  
</style> 