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
      this.studentTestInfo = this.$route.query
      console.log(this.$route.query)
      GetTestRecordResults(this.studentTestInfo).then(res=>{

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