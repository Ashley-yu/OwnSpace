<template lang="pug">
  .sidebar
    ul
      li(v-for="item in category" :key="item.id" :value='item' :class="{'active': item === currentOption}" @click.prevent="getCategory(item)") {{ item }}
</template>

<script>
export default {
  name: 'Category',
  props: ['category', 'currentOption'],
  methods: {
    getCategory(option) {
      this.$emit('get-category', option);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/sass/all.sass";

.sidebar
  position: absolute
  left: 0
  top: 48%
  padding: 16px 0px
  margin: 0px $large_space
  text-align: center
  border: 1px solid $secondary_color
  border-radius: $radius
  @include medium
    border: none
  ul
    display: inline
    padding: 16px 0px
    li
      display: inline-block
      list-style: none
      padding: 3px 18px
      cursor: pointer
      transition: $duration
      color: $black_color
      position: relative
      @include medium
        padding: 3px 12px
      &::after
        content: ''
        position: absolute
        left: calc(50% - 20px)
        bottom: 3px
        +size(60px, 8px)
        background-color: rgba($primary_color, 0.5)
        opacity: 0
      &:hover::after
        opacity: 1
      &.active::after
        opacity: 1
</style>
