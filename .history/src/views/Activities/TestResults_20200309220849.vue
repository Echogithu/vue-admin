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
        this.$route.query.id
    },
}
</script>

<style>

</style> 