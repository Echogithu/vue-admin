<template>
  <div id="header-wrap">
    <div class="pull-left header-icon"><i class="el-icon-s-fold"></i></div>
    <div class="pull-right ">
      <div class="user-info pull-left">{{userName || 'admin'}}</div>
      <div class="header-icon pull-left"><i class="el-icon-switch-button"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    userName:{
      type: String
    }
  },

}
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap{
  position: fixed;
  top:0;
  right: 0;
  left:  200px;
  height: 75px;
  background-color: #fff;
  box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
  line-height: 75px;
}
.header-icon{
  padding:0 32px;
  i {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info{
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon{
    padding: 0 28px;
  }
}
</style>
