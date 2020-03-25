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
      GetTestRecordResults(this.$route.query).then(res=>{

      })
    }
    
  },
    
  created() {
      console.log(this.$route.query)
      this.fetch()
  },
}
</script>

<style>

</style> 