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
