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
.top
  margin: 60px 0px 30px 0px
  height: 240px
  background-image: url('../assets/img/white_bok.jpg')
  background-size: cover
  background-position: center center
  position: relative
</style>
