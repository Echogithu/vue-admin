<template>
<!-- 活动卡片 -->
<div>
  <el-card class="activityCard" >
    <div class="activityType">
      <el-button type="success" icon="el-icon-s-order" circle size="mini"></el-button>
      <span class="type">测验</span> 
      <span class="title">{{microCourse.title}}</span>
    </div>

    <div class="activityContent">
      <i class="el-icon-tickets"></i>
      <span>练习：{{microCourse.content.length}}</span>
    </div>

    <div class="activityAction" >
      <div class="button" @click="testFormShow" >
        <i class="el-icon-video-play"></i>
        {{role? '创建测试':'开始测试' }}
      </div>
    </div>

    <div class="activityEdit">
      <div class="group">
        <i class="el-icon-folder-opened"></i>
        分组情况
      </div>
      <div class="edit" v-if="role">
        <el-tooltip class="item"  content="结果" placement="bottom" effect="light">
          <el-button  icon="el-icon-help" size="mini" type="primary" plain></el-button>
        </el-tooltip>
        <el-tooltip class="item"  content="编辑" placement="bottom" effect="light" >
          <el-button  icon="el-icon-edit" size="mini" type="success" plain   @click="$router.push(`/course/class/activities/classTest/${activities._id}`)"></el-button>
        </el-tooltip>
        <el-tooltip class="item"  content="删除" placement="bottom" effect="light">
          <el-button  icon="el-icon-delete" size="mini " type="danger" plain  @click="deleteActivity(activities._id)"></el-button>
        </el-tooltip>
      </div>
    </div>
  </el-card>
</div>
</template>


<script>
export default {
   props:['microCourse', 'role', 'userInfo'],
}
</script>

<style lang="scss">
.activityCard{
  margin-top: 20px;
  .activityType{
    // display: flex;
    i{
      font-size: 16px;
      color: #fff;
    }
    .type{
      font-size: 20px;
      color: #009944;
      padding-left: 5px;
    }
    .title{
      font-size: 16px;
      padding-left: 5px;
    }
    .time{
      color: #666;
      padding-top: 8px;
      // align-self: flex-end;
      float: right;
    }
  }

  .activityContent{
    margin-top: 5px;
    i{
      margin-left: 5px;
      color: #009944;
    }
    span{
      padding-left: 5px;
      color: #999;
    }
  }
  
  .activityAction{
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    .button{
      // float: right;
      width: 100px;
      cursor: pointer;
      text-align: center;
      border:1px solid #009944;
      color: #009944;
      border-radius: 4px;
      padding: 6px;
    }
    .testsCard{
      
      .testButton{
        display: block;
        margin-bottom: 10px;
        margin-left: 25%;
      }
    }
  }

  .activityEdit{
    margin-top: 10px;
    display: flex;
    justify-content:space-between;
    .group{
      cursor: pointer;
      font-size: 16px;
      height: 28px;
      line-height: 28px;
      i{
        padding-right: 5px;
      }
      &:hover{
        color: #009944;
      }
    }
    .edit{
      
      button{
       font-size: 18px;
       padding: 4px;
      }
    }
  }
}
</style>   
