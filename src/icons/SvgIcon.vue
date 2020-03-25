<template>
  <div>
    {{ msg }}
  </div>
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted } from '@vue/composition-api';
export default {
  name:'svgIcon',
  setup(){
    const msg = ref('前端234');

    return {
      msg
    }
  }
}
</script>