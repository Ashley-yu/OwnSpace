<template lang="pug">
  div
    header
      .container-fluid.px-0
        .carousel.slide.carousel-fade(data-ride='carousel' data-pause="false")
          .carousel-inner
            .carousel-item.active
              img.picture(src='../assets/img/desktop.jpg' alt='')
              .pictureBox
                h1 簡潔。俐落
            .carousel-item
              img.picture(src='../assets/img/writing_on_notebook.jpg' alt='')
              .pictureBox
                h1 生活。質感
            .carousel-item
              img.picture(src='../assets/img/silver_macbook.jpg' alt='')
              .pictureBox
                h1 空間。創意
      a(href="#sectionAbout" @click.prevent="scrollIntoView('#sectionAbout')")
        i.fas.fa-angle-double-down.explore
    section#sectionAbout
      .container-fluid
        .row.d-flex.justify-content-center.align-items-center
          .col-xl-8.col-sm-7
            .textArea.d-flex.flex-column.justify-content-start.align-items-center
              h3 極簡主義
              hr
              p 利用簡單線條結合單純色塊而組成的實用文具，崇尚自然簡約的風格，
                | 想要理清滿腹的思緒、靈感，不被眼前凌亂的桌面所影響，
                | 您需要來件簡潔又不失質感的日常用品!
          .col-xl-4.col-sm-5
            .imgWrap
              img(src="../assets/img/journal.jpg", alt="")
        .row.d-flex.justify-content-center.align-items-center.flex-sm-row-reverse
          .col-xl-8.col-sm-7
            .textArea.d-flex.flex-column.justify-content-start.align-items-center
              h3 生活雅致
              hr
              p 厭倦了周遭一樣的景致，想換個環境讓心情不一樣嗎?
                | 總是覺得待在室內令人備感壓迫、毫無生氣嗎?
                | 嘗試擺放一些清新小物吧! 讓空間看起來更愜意，您也可以享受令人羨慕的生活!
          .col-xl-4.col-sm-5
            .imgWrap
              img(src="../assets/img/decors.jpg", alt="")
    section#sectionNews
      .container-fluid
        .row
          .col-md-6.newsContent
            .imgBack.newArrive
            .content
              h1 新品到貨
                i.fas.fa-shipping-fast.ml-2
              .buttonArea
                router-link(to="/product_list")
                  button.btn 買起來
          .col-md-6.newsContent
            .imgBack.coupon
            .content
              h1
                i.fas.fa-bullhorn.mr-2
                | 限量折價券發放中
              h3 輸入優惠券代碼「
                span OWNSPACE20
                | 」即享8折優惠
    section#sectionSubscribe
      .container.d-flex.flex-column.justify-content-center.align-items-center
        h3 不想錯過任何最新商品消息，快訂閱我們
          i.far.fa-hand-point-down.ml-2
        input.form-control(placeholder="Email")
        button.btn 訂閱
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Home',
  methods: {
    scrollIntoView(viewId) {
      $(viewId)[0].scrollIntoView(true);
    },
    handleScroll() {
      if ($(window).scrollTop() > $('#sectionAbout').offset().top - 480) {
        $('.textArea').addClass('fadInUp');
      } else {
        $('.textArea').removeClass('fadInUp');
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    // carousel autoplay do not stop on flag change
    $('.carousel').carousel('cycle');
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped lang="sass">
@import "@/assets/sass/all.sass";

//---------- all ----------
section
  padding: 64px
  @include medium
    padding: 32px

.fadInUp
  animation: fadeInUp 2.5s
//---------- all ----------

//---------- top ----------
header
  position: relative
  .container-fluid
    .carousel
      position: relative
      .picture
        +size(100%,100vh)
        object-fit: cover
        object-position: 50% 50%
        @include medium
          +size(150%,100vh)
      .pictureBox
        position: absolute
        +size(95%,85vh)
        top: 50%
        left: 50%
        transform: translateX(-50%) translateY(-50%)
        background-color: black
        opacity: 0.2
        border: 5px double $white_color
        h1
          position: absolute
          top: 20%
          left: 50%
          font-size: 76px
          font-weight: 800
          letter-spacing: 5px
          color: $white_color
          @include large
            left: 30%
          @include medium
            left: 15%
          @include small
            left: 5%
          @include x-small
            width: 70%
  .explore
    position: absolute
    bottom: 5%
    left: calc(50% - $small_space)
    font-size: 30px
    color: $white_color
    z-index: 3
    animation: drop 1s infinite linear
    &:hover
     opacity: 0.6
//---------- top ----------

//---------- about ----------
#sectionAbout
  .textArea
    padding: 50px
    @include large
      padding: 0px
      padding-top: 18px
    h3
      letter-spacing: 8px
      font-weight: 400
      color: $title_color
    hr
      width: 85%
      color: $secondary_color
    p
      width: 65%
      padding: 25px 5px
      letter-spacing: 2px
      font-size: 18px
      font-weight: 300
      color: $black_color
      @include large
        width: 90%
      @include medium
        padding: 0px
  .imgWrap
    position: relative
    height: 80%
    padding-bottom: 75%
    img
      position: absolute
      +size(100%,100%)
      transition: 1s
      &:hover
        transform: scale(1.2)
        @include small
          transform: scale(1)
//---------- about ----------

//---------- news ----------
#sectionNews
  background-color: $primary_lighten_color
  .newsContent
    position: relative
    padding: 0px 20px
    @include large
      padding: 0px 10px
    .imgBack
      background-position: center center
      background-size: cover
      padding: 230px 0px
      position: relative
      &::after
        position: absolute
        content: ''
        left: 50%
        top: 50%
        transform: translateX(-50%) translateY(-50%)
        background-color: $white_color
        opacity: 0.4
        +size(95%,90%)
    .newArrive
      background-image: url("../assets/img/tray.jpg")
    .coupon
      background-image: url("../assets/img/green_plant.jpg")
    .content
      position: absolute
      left: 12%
      bottom: 30%
      max-width: 78%
      h1
        letter-spacing: 3px
        color: $primary_darken_color
      h3
        font-weight: 400
        span
          font-weight: 700
          color: $black_color
      .buttonArea
        padding-right: 5px
        text-align: right
        button
          @include button()
            background-color: rgba($white_color,0.7)
            animation: beat 0.5s infinite
            &:hover
              background-color: $white_color
//---------- news ----------

//---------- subscribe ----------
#sectionSubscribe
  background-image: url("../assets/img/holding_pencil.jpg")
  background-size: cover
  background-position: top center
  background-attachment: fixed
  margin-top: $large_space
  padding: 180px
  @include large
    padding: 140px
  @include medium
    padding: 120px 20px
  h3
    color: $secondary_color
  input
    margin: 10px
    padding: 6px $small_space
    letter-spacing: 2px
    font-size: 18px
    background-color: rgba($black_color, 0.3)
    color: $white_color
    border: 1px solid $secondary_color
  button
    @include button()
      background-color: rgba($white_color,0.7)
      &:hover
        background-color: $white_color
//---------- subscribe ----------
</style>
