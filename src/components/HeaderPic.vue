<template lang="pug">
  .container-fluid.top
    slot
</template>

<script>
export default {
  name: 'HeaderPic',
};
</script>

<style scoped lang="sass">
@import "@/assets/sass/all.sass";

.top
  margin: $large_space 0px $medium_space 0px
  height: 240px
  background-image: url('../assets/img/white_bok.jpg')
  background-size: cover
  background-position: center center
  position: relative
</style>
