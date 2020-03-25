<template>
<!-- 活动卡片 -->
<div>
  <el-card class="activityCard" >
    <div class="activityType">
      <el-button type="success" icon="el-icon-s-order" circle size="mini"></el-button>
      <span class="type">测验</span> 
      <span class="title">{{activities.title}}</span>
      <!-- <span>待发布</span> -->
      <span class="time">{{activities.time}}</span>
    </div>

    <div class="activityContent">
      <i class="el-icon-tickets"></i>
      <span>练习：{{activities.content.length}}</span>
    </div>

    <div class="activityAction" >
      <div class="button" @click="testFormShow" >
        <i class="el-icon-video-play"></i>
        {{role? '创建测试':'开始测试' }}
      </div>
      <!-- 创建测验 -->
      <el-dialog  :visible.sync="testForm" class="testForm">
        <el-form  :model="testFormData" :label-width="testFormLabelWidth"  >
          <el-form-item label="本次测验" :label-width="testFormLabelWidth">
            <el-input v-model="testFormData.thisTestName" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="总分" :label-width="testFormLabelWidth">
            <p>{{testFormData.totalScore}} 分</p>
          </el-form-item>
          <el-form-item label="知识点" :label-width="testFormLabelWidth">
            <p>{{testFormData.describe}}</p>
          </el-form-item>
          <el-form-item label="测验时长" >
            <el-input-number  v-model="testFormData.duration" autocomplete="off" placeholder="20" size="small" class="duration"></el-input-number >
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
            <el-button type="primary" @click="createTestRecord">创建</el-button>
            <!-- <el-button type="primary" @click="$router.push('/test/start')">创建</el-button> -->
          </el-form-item>
        </el-form>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addTestForm()">提交</el-button>
        </div> -->
      </el-dialog>

      <!-- 开始测验 -->
      <el-dialog
        title="选择进入哪次测验"
        center
        :visible.sync="choiceTestRecordVisible"
        width="30%"
        class="testsCard"
        >
        <template v-for="(item,index) in testRecords" >
          <el-button :type=" item.nowTest ? 'success':'info' " plain class="testButton" @click="joinTest(item)" :key="index">{{item.thisTestName}}</el-button>
        </template>
        
        <!-- <span>{{testRecords}}</span> -->
      </el-dialog>
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
  
</style>