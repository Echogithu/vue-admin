<template>
  <div >
    <!-- 头部 Begin -->
    <el-header class="header">
        <!-- 左边班级信息 -->
        <div class="headerLeft" >
          <span class="logo" @click="$router.push(`/courses/list`)">莞工课堂</span> 
          <el-tag type="success" class="tag">微课</el-tag>
          <span class="testName">微课名称</span>
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
</style>