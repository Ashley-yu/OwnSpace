<template lang="pug">
  div
    .container-fluid.px-0.layout
      Navbar
      Alert
      transition(mode="out-in")
        router-view
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

<style lang="sass" scope>
.layout
  min-width: 320px
  input
    -webkit-appearance: none
    -moz-appearance: none
    appearance: none
    margin: 0
    outline: 0 !important
    -webkit-box-shadow: none !important
    box-shadow: none  !important
</style>
