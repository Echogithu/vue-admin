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
      console.log(this.studentTestInfo )

      GetTestRecordResults(this.studentTestInfo).then(res=>{
        console.log(res.data)
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