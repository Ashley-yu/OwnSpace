<template lang="pug">
  .orderProgress
    .row
      .col-sm-4
        .step(:class="{'current': currentStep === 1}") Step1
          p 確認購買
      .col-sm-4
        .step(:class="{'current': currentStep === 2}") Step2
          p 填寫資料
      .col-sm-4
        .step(:class="{'current': currentStep === 3}") Step3
          p 完成訂單
</template>

<script>
export default {
  name: 'OrderProgress',
  props: ['currentStep'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/sass/all.sass";

.orderProgress
  display: flex
  justify-content: center
  position: absolute
  top: calc(15% + 18px)
  left: 0
  +size(70%, auto)
  background-color: transparent
  text-align: center
  min-width: 310px
  @include medium
    width: 100%
  .step
    padding: 14px 38px
    margin: 0px 5px
    font-size: 16px
    border-radius: 3px
    border: 1px solid $secondary_color
    color: $black_color
    position: relative
    @include x-small
      border: 1px solid transparent
    &::after
      content: ''
      position: absolute
      left: calc(50% - 25px)
      bottom: 13px
      +size(70px, 8px)
      background-color: rgba($primary_color, 0.5)
      opacity: 0
    &.current::after
      opacity: 1
    &.current
      font-weight: 500
      color: black
      border: 1px solid $primary_color
    p
      margin: 0
      @include small
        display: inline-block
        margin-left: 5px
</style>
