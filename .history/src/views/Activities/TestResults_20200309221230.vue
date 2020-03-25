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
      GetTestRecordResults
    }
    
  },
    
  created() {
      console.log(this.$route.query)
  },
}
</script>

<style>

</style> 