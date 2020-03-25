<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/1.png" alt=""></h1>
    <el-menu 
      :default-active="activeMenu"
      class="el-menu-vertical-demo" 
      @open="handleOpen" 
      @close="handleClose" 
      :collapse="isCollapse" 
      background-color="transparent" 
      text-color="#fff" 
      active-text-color="#fff"
      router>
      
      <template  v-for="(item, index) in routers" >
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''" >
          <!-- 一级菜单 -->
          <template slot="title">
            <i :class="item.meta.icon" ></i>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>

        </el-submenu>
      </template> 
    </el-menu>
  </div>
</template>

<script>
import { reactive,computed, ref, isRef, toRefs, onMounted } from '@vue/composition-api';
export default {
  name:'navMenu',
  setup(props,{root},context){
    /**
     * data数据
     */
    const isCollapse = ref(false);
  
    const routers = reactive(root.$router.options.routes);

    let  activeMenu = window.location.href.split('/#')[1];



    /**
     * 函数
     */
    const handleOpen = (key, keyPath) => {
        // console.log(key, keyPath);
        // activeMenu = key
        // console.log(activeMenu)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    }

    

    // const count = ref(1);
    // const {meta, path} = routers
    // const activeMenu = computed({
    // //     get: () => routers.meta.activeMenu,
    // // routers.meta.activeMenu
    //     get: () => {return routers.meta}
        
    //     // return path
    // });
    // console.log(activeMenu); // 0



    return {
      isCollapse,
      routers,
      activeMenu,
      handleOpen,
      handleClose
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
.logo{
  text-align: center;
  img{
    margin: 28px auto 25px;
    width: 92px;
  }
}
#nav-wrap{
  position:fixed;
  top:0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
}

</style>
