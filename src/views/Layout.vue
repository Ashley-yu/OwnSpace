<template lang="pug">
  div
    .container-fluid.px-0
      Navbar
      Alert
      transition(mode="out-in")
        //- 加上key使同一頁面不同參數時重新載入component
        router-view(:key="$route.fullPath")
    Footer
</template>

<script>
import Navbar from '@/components/front/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Alert from '@/components/AlertMessage.vue';

export default {
  name: 'Layout',
  components: {
    Navbar,
    Footer,
    Alert,
  },
};
</script>

<style scoped lang="sass">
@import "@/assets/sass/all.sass";

.v-leave
  opacity: 1
.v-leave-active
  transition: opacity .3s
.v-leave-to
  opacity: 0
.v-enter
  opacity: 0
.v-enter-active
  transition: opacity .3s
.v-enter-to
  opacity: 1
</style>
