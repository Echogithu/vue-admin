<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>课程</el-breadcrumb-item> -->
      <el-breadcrumb-item>{{!id ? '创建' : '编辑'}}课程</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="form" :model="formData" label-width="80px" class="courseForm">
      <el-form-item label="课程名称" class="form-item">
        <el-input v-model="formData.courseName"></el-input>
      </el-form-item>
      <el-form-item label="课程简称" class="form-item">
        <el-input v-model="formData.shortName"></el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>

    
  </div>
</template>

<script>
import {GetCourse, EditCourse, AddCourse } from '@/api/courses'


export default {

  data(){
    return {
      id: null, //课程id 判断是创建还是编辑
      formData: {
        courseName: '',
        shortName:''
      }
    }
  },

  methods: {
    // isCreate(){
    //   return  !this.id 
    // },

    // fetch(){
    //   GetCourse(this.id).then(res => {
    //     this.formData = res.data
    //   })
    // },

    submit(){
      // const url = this.isCreate ? 'courses' : `courses/${this.id}`
      // const method = this.isCreate? 'post' : 'put'
      
      // if(this.id){
      //   EditCourse(this.id,this.formData).then(res=>{
      //     this.$message.success('保存成功')
      //     this.formData= {}
      //     this.$router.go(-1)
      //   })
      // }else{
        this.formData.userID = localStorage.userID
        AddCourse(this.formData).then(res=>{
          this.$message.success('保存成功')
          this.$router.push('/courses/list')
        })
      // }

      // await this.axios[method](url,data)
      // this.$message.success('保存成功')
      // this.data= {}
      // this.$router.go(-1)
    }
  },

   
  

  created() {
    // this.id = this.$route.params.id
    // this.id && this.fetch()
    // console.log(this.id)
  }
  
}
</script>

<style lang="scss" scoped>
  .courseForm{
    width: 40%;
    margin-top: 40px;
    .form-item{
      margin-top: 20px;
    }
  }
</style>
