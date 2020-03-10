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
