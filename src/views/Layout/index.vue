<template>
  <div id="layout">
    <LayoutHeader v-bind:userName="user.nickName"/>
    <LayoutMain/>
    <LayoutNav/>
  </div>
</template>

<script>
import LayoutHeader from './Components/Header'
import LayoutNav from './Components/Nav'
import LayoutMain from './Components/Main'
import {GetUser} from '../../api/login'
import { reactive } from '@vue/composition-api'

export default {
  name:'layout',
  components:{LayoutHeader,LayoutNav,LayoutMain},
  // setup(){
  data() {
    return {
      user:{}
    }
  },

  methods: {
    fetch(){
      GetUser(localStorage.userID).then(res=>{
        this.user = res.data
        // console.log(this.user.email)
      })
    }
  },
   
  created(){
    this.fetch()
  },
    
  
}
</script>

<style lang="scss" >
#layout{
  background-color: #f7f7f7;
}
</style>