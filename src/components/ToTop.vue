<template lang="pug">
  div.toTop(@click="scrollToTop")
    i.fas.fa-angle-double-up
</template>

<script>
import $ from 'jquery';

export default {
  name: 'ToTop',
  methods: {
    scrollToTop() {
      $('body,html').animate({
        scrollTop: 0,
      }, 'slow');
    },
    handleScroll() {
      if ($(window).scrollTop() > 500) {
        $('.toTop').addClass('show');
      } else {
        $('.toTop').removeClass('show');
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/sass/all.sass";

.toTop
  position: fixed
  right: 2%
  bottom: 3%
  opacity: 0
  transition: all 0.5s ease-in
  i
    font-size: 30px
    color: rgba($secondary_color, 0.5)
    cursor: pointer
    transition: 0.5s
    &:hover
      color: rgba($secondary_color, 0.8)
.show
  opacity: 1
</style>
