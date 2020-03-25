<template>
  <div >
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
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" >
</style