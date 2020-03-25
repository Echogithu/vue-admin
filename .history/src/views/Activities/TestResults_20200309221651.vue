<template>
 <div>
    成绩
 </div>
</template>

<script>
import { GetTestRecordResults } from '@/api/activities'
export default {
  data(){

  },

  methods: {
    fetch(){
      let studentTestInfo=this.$route.query
      GetTestRecordResults(studentTestInfo).then(res=>{

      })
    }
    
  },
    
  created() {
    // console.log(this.$route.query)
    this.fetch()
  },
}
</script>

<style>

</style> 