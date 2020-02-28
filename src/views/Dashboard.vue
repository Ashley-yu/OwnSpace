<template lang="pug">
  div
    Topbar
    Alert
    .container-fluid
      .row.d-flex.justify-content-center
        main.col-11.col-lg-10.p-0(role="main")
          router-view
</template>

<script>
import Topbar from '@/components/admin/Topbar.vue';
import Alert from '@/components/AlertMessage.vue';

export default {
  components: {
    Topbar,
    Alert,
  },
};
</script>

<style scoped lang="sass">
@import "@/assets/sass/all.sass";
</style>
