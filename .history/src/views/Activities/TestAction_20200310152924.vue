<template>
  <div>
    <qriously :value="qrcode" :size="200" />
  </div>
</template>
<script>
  export default {
    data() {
        return {
            qrcode: `http://192.168.0.101:8082/#/test/content/${this.$route.params.id}`
            // qrcode: 'https://blog.csdn.net/LiaoFengJi'
         }        
     },

    created() {
      // alert(this.$route.params.id)
    },
  }
</script>