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
        
    },
    
    created() {
        console.log(this.$route.query.id)
    },
}
</script>

<style>

</style> 