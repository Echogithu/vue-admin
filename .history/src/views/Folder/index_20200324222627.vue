<template>
  <div>
    <el-upload
      class="uploadFile"
      ref="upload"
      :action="`http://localhost:5000/admin/api/upload/${userInfo._id}`"
      :on-preview="handlePreview"
      :on-success="afterUpload"
  
      :show-file-list="false"
      :auto-upload="true"
      >
      <el-button slot="trigger" size="small" type="success">上传文件</el-button>
    </el-upload>

    <!-- <div v-for="item in fileList">{{item.originalname}}</div> -->

    <el-table
      :data="fileList"
      border
      class="fileTable"
      style="width: 90%">
      <el-table-column
        label="上传日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.uploadTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文件名"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.originalname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="图片"
        >
        <template slot-scope="scope">
          <a :href="scope.row.url" alt=""></a>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import service from "@/utils/request";
import {GetUser} from '../../api/login'
import {DeleteFolder} from '../../api/folders'
var moment = require('moment');
  export default {
    data() {
      return {
        fileList: [],
        userInfo:{}
      };
    },
    methods: {
      fetch(){
         GetUser(localStorage.userID).then(res=>{
          this.userInfo = res.data
          this.fileList = res.data.files
          // this.fileList.forEach(e => {
          //   e.uploadTime = moment().format('YYYY-MM-DD HH:mm'); 
          // });
        })
      },

      //文件上传成功后
      afterUpload(res){
        this.fileList.push(res)
        this.fileList.forEach(e => {
          e.uploadTime = moment().format('YYYY-MM-DD HH:mm'); 
        });
        console.log(this.fileList)
      },

      //删除文件
      handleRemove(row, ) {
        console.log(row)
        // console.log(file)
        // console.log(fileList)
        DeleteFolder(row,this.userInfo._id).then(res=>{
          this.$message.success('删除成功');
          this.fetch()
        })
      
      },



      handlePreview(file) {
        console.log(file);
      }
    },

    created() {
      this.fetch()
    },
  }
</script>

<style lang="scss">
  .uploadFile{
    width: 30%;
  }
  .fileTable{
    margin-top: 30px;
    border-radius: 4px;
  }
</style>