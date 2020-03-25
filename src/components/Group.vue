<template>
  <div>
    <div class="box-card" >
      <div class="box-card-name active">全部分组</div>
      <div class="box-card-name">未分组</div>
      <div class="box-card-name ">未分组</div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  .box-card{
    padding-top: 15px;
    padding-bottom: 15px;
    box-sizing: border-box;
    .box-card-name{
      margin-left: 4px;
      padding: 10px 10px 10px 15px;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 16px;
      color: #333;
      line-height: 16px;
      cursor: pointer;
      &.active{
        border-left: 4px solid rgb(0, 153, 68); 
        margin-left: 0px;
        color:rgb(0, 153, 68);
      }
    }
  }
</style>