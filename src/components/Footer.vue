<template lang="pug">
  div
    footer
      .container
        .row.d-flex.justify-content-between.align-items-center
          .col-xs-12.d-flex.align-items-center
            span.title 追蹤我們
            span
              a(href="#")
                i.fab.fa-instagram.follow-icon
            span
              a(href="#")
                i.fab.fa-line.follow-icon
            span
              a(href="#")
                i.fab.fa-facebook-square.follow-icon
          .col-xs-12.d-flex.align-items-center
            span.title 聯絡方式
            span.col-xs-6.d-flex.align-items-center
              i.fas.fa-phone
              span.info
                a(href="#") 02-1234567
            span.col-xs-6.d-flex.align-items-center
              i.far.fa-envelope
              span.info
                a(href="#") ownspace@mail.com
          .col-xs-12.copyright
            span ⓒ AshleyFan 僅個人作品練習，無任何商業用途
              router-link(to="/login")
                i.fas.fa-user-cog.ml-1.adminLogin
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped lang="sass">
@import "@/assets/sass/all.sass";

footer
  background-color: $white_color
  border-top: 1px solid $secondary_color
  .container
    padding: $large_space $small_space
    .row
      @include medium
        flex-direction: column
    .title
      margin: 5px 10px
      letter-spacing: 1px
      color: $secondary_color
      font-weight: 300
      font-size: 14px
      @include x-small
        display: none
    .info
      margin: 0px 5px
      font-weight: 500
      font-size: 16px
      a
        color: $black_color
    i
      color: $primary_color
      font-size: 20px
    .follow-icon
      margin: 0px 5px
      font-size: 32px
      @include x-small
        margin-bottom: 10px
    .copyright
      margin: 5px 10px
      color: $secondary_color
      font-weight: 300
      font-size: 14px
      @include x-small
        font-size: 13px
        margin-top: 10px
      .adminLogin
        font-size: 12px
        color: $secondary_color
</style>
