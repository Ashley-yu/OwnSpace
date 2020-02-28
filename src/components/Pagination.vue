<template lang="pug">
  div.d-flex.justify-content-center.align-items-center.pb-5
    ul
      li.page.previus(:class="{'disabled': !pagination.has_pre}")
        a.pageNumber(href="#" @click.prevent="getPages(pagination.current_page - 1)")
          i.fas.fa-angle-left
      li.page(v-for="page in pagination.total_pages" :key="page" :class="{'active': pagination.current_page === page}")
        a.pageNumber(href="#" @click.prevent="getPages(page)") {{ page }}
      li.page.next(:class="{'disabled': !pagination.has_next}")
        a.pageNumber(href="#" @click.prevent="getPages(pagination.current_page + 1)")
          i.fas.fa-angle-right
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pagination'],
  methods: {
    getPages(page) {
      this.$emit('get-pagination', page);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/sass/all.sass";

ul
  padding: 0
  margin: 0
  border: 1px solid $secondary_color
  border-radius: 3px
  .page
    display: inline-block
    list-style: none
    &:first-child
      .pageNumber
        border-bottom: none
    &:last-child
      .pageNumber
        border-bottom: none
    &.active .pageNumber
      font-weight: 500
      color: $primary_color
      border-bottom: 2px solid $primary_color
    &.disabled .pageNumber
      cursor: not-allowed
      pointer-events: none
      &:hover
        color: $secondary_color
  .pageNumber
    position: relative
    display: block
    padding: 3px 12px
    color: $secondary_color
    border-bottom: 2px solid transparent
    &:hover
      color: $primary_color
      font-weight: 500
      border-bottom: 2px solid $primary_color
      text-decoration: none
</style>
