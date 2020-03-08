<template lang="pug">
  .productDetail
    <!-- isLoading： false-停用/ true-啟用 -->
    loading(loader="dots" color="#D1ACA6" :active.sync='isLoading')
    HeaderPic
      nav.bookmark(aria-label='breadcrumb')
        ol.breadcrumb
          li.breadcrumb-item
            router-link(to='/') 首頁
          li.breadcrumb-item
            a(@click.prevent="$router.push('/product_list')") 商店
          li.breadcrumb-item
            a(@click.prevent="$router.push({ name: 'ProductList', params: { category: product.category }})") {{ product.category }}
          li.breadcrumb-item.active
            | {{ product.title }}
    .container
      .row.m-0
        .col-md-7.col-lg-6
          .productPicture
            img(:src="`${product.imageUrl}`", alt="")
        .col-md-5.col-lg-6
          ul.productInfo
            li
              h3.productTitle {{ product.title }}
            li
              p.productOriginal(v-if="product.price !== product.origin_price") NT {{ product.origin_price | currency }}
            li
              p.productPrice NT {{ product.price | currency }}
            li
              .form-control
                .countNumber.d-flex.justify-content-start.align-items-center
                  button.btn.minus(@click="changeQty(-1)")
                    i.fas.fa-minus
                  input.productNumber(type='number' max='10' min='1' v-model="productNum")
                  button.btn.add(@click="changeQty(1)")
                    i.fas.fa-plus
                button.btn.productBuy(@click.prevnt="addtoCart(product.id, productNum)")
                  i.fas.fa-shopping-cart.mr-1(v-if="!status.loadingItem")
                  i.fas.fa-spinner.fa-spin.mr-1(v-else)
                  | 加入購物車
            li
              p.productDescription {{ product.description }}
            li
              p.productDescription {{ product.content }}
      .row.m-0
        .notice
          .backText Q&A
          h5
            i.fas.fa-exclamation-circle.mr-3
            | 常見問題
          ul
            li 有哪些付款方式?
              p 目前提供「貨到付款」、「超商繳費付款」與「ATM轉帳匯款」三種方式。
            li 如何確認是否訂購成功？
              p 完成訂購流程後，系統將會發送「訂單確認通知函」至您訂購時所留存的聯絡E-mail，此即代表您已經訂購成功。
            li 商品出貨後是否會通知？
              p 商品出貨後，系統將會發送「出貨通知信」至您訂購時所留存的聯絡E-mail。
            li 需要負擔運費嗎？
              p 目前商店訂購不限金額免運。
            li 海外地區可以寄送嗎？
              p 目前無法提供海外地區配送服務，不便之處，敬請見諒。
            li 退換貨說明?
              p 如需要退換貨，請先聯絡客服，說明退換貨原因。
            li 什麼情況可能無法辦理退貨？
              p
                ol
                  li 超過7天鑑賞期。
                  li 客製化商品。
                  li 已非全新狀態（外觀不得有刮傷、破損、受潮...等）。
                  li 沒有完整包裝（商品、附件、外盒、保護袋、配件紙箱、保麗龍、隨貨文件、贈品...等）。
            li 如何計算「七天鑑賞期」？
              p 由消費者完成簽收取件的隔日開始算起至第7天止。
            li 退款方式?
              p 需提供您的匯款資料（存摺封面）E-mail 至客服中心，退款申請後預計7-10天(不含假日)退還至您指定的帳戶中。
      .similarContent
        h5 類似商品
        .row.similar
          .col-lg-3.col-md-4.col-sm-6.col-12(v-for="item in filterSimilarProducts" :key="item.id")
            .productCard(@click.prevent="$router.push(`/product_detail/${item.id}`)")
              .imgWrap
                img(:src="`${item.imageUrl}`" alt='')
              .cardText {{ item.title }}
              .cardText.text-right NT {{ item.price | currency }}
</template>

<script>
import $ from 'jquery';
import HeaderPic from '@/components/HeaderPic.vue';

export default {
  name: 'ProductDetail',
  components: {
    HeaderPic,
  },
  data() {
    return {
      productId: '', // 儲存 router 傳遞的 id 參數
      product: [], // 單件商品資料
      productNum: 1, // 數量
      isLoading: false, // loading 圖示顯示狀態
      status: {
        loadingItem: '', // 當筆點選商品 id
      },
      products: [], // 所有商品資料
    };
  },
  methods: {
    // 取得單件商品資料
    getProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`;

      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.isLoading = false;
        if (!response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
          vm.$router.push('/product_list');
        } else {
          vm.product = response.data.product;
        }
      });
    },
    // 加入購物車，預設數量為 1
    addtoCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      $('.productBuy').addClass('disabled');

      vm.status.loadingItem = id;
      vm.$http.post(api, { data: cart }).then((response) => {
        vm.status.loadingItem = '';
        $('.productBuy').removeClass('disabled');
        if (!response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        } else {
          // 重新整理 Navbar 購物車
          vm.$bus.$emit('cart:get');
          vm.$bus.$emit('message:push', response.data.message, 'success');
        }
      });
    },
    // 商品數量變更做判斷
    changeQty(num) {
      const qty = this.productNum + num;
      if (qty >= 10) {
        this.productNum = 10;
      } else if (qty <= 1) {
        this.productNum = 1;
      } else {
        this.productNum = qty;
      }
    },
    // 取得所有商品資料
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;

      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.isLoading = false;
        if (!response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        } else {
          // 儲存所有商品資料
          vm.products = response.data.products;
        }
      });
    },
  },
  computed: {
    filterSimilarProducts() {
      const vm = this;
      return vm.products.filter(item => (item.id !== this.productId) && (item.category === vm.product.category) && (item.is_enabled));
    },
  },
  created() {
    // 存商品 id
    this.productId = this.$route.params.product_id;
    this.getProduct();
    this.getProducts();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/sass/all.sass";
@import "@/assets/sass/notice.sass";

.bookmark
  position: absolute
  padding: $small_space
  bottom: 15%
  left: $large_space
  @include medium
    left: $small_space
  .breadcrumb
    background-color: transparent
    .breadcrumb-item
      cursor: pointer
      color: $black_color
      font-weight: 300
      a
        color: $black_color
        &:hover
          text-decoration: none
          color: $primary_color
      &.active
        cursor: default
        color: $secondary_color
.productDetail
  padding-bottom: $large_space
.productPicture
  position: relative
  height: 80%
  padding-bottom: 75%
  img
    position: absolute
    +size(100%,100%)
    top: -20%
    object-fit: cover
    object-position: 50% 50%
    border: 10px solid $white_color
    transition: $duration
    @include medium
      top: 0
      border: none
.productInfo
  padding: 0px
  @include small
    padding: $small_space
  li
    list-style: none
    p
      margin: 0
    .productTitle
      position: relative
      margin-bottom: $medium_space
      margin-top: $small_space
      &::after
        content: ''
        +size(60%, 8px)
        position: absolute
        bottom: -2px
        left: $medium_space
        background-color: rgba($primary_color, 0.5)
    .productOriginal
      font-size: 14px
      text-decoration: line-through
      color: $black_color
    .productPrice
      margin-bottom: $small_space
      font-size: 18px
      font-weight: 500
    .form-control
      border: none
      height: 100%
      padding: 0
      .countNumber
        input
        .minus,.add
          padding: 3px 10px
          border: 1px solid $secondary_color
          &:hover
            color: $primary_color
            border: 1px solid $primary_color
        .minus
          border-radius: $radius 0px 0px $radius
        .add
          border-radius: 0px $radius $radius 0px
        .productNumber
          text-align: center
          width: 15%
          padding: 3px 10px
          border: 1px solid $secondary_color
          border-radius: 0px
          -webkit-border-radius: 0px
          -moz-border-radius: 0px
      .productBuy
        margin: $small_space 0px
        @include button()
          background-color: $primary_lighten_color
          color: $black_color
          &:hover
            background-color: $primary_color
        &.disabled
          pointer-events: none
    .productDescription
      margin-top: 5px
.similarContent
  padding: $medium_space
  margin-top: $small_space
  border: 1px solid $secondary_color
  border-radius: $radius
  .similar
    overflow-x: scroll
    flex-wrap: nowrap
    padding: $small_space 0px
    @include small
      margin: 0
    .productCard
      padding: 5px
      box-shadow: 0px 0px 5px rgba(0,0,0,0.2)
      color: $black_color
      cursor: pointer
      &:hover
        color: $primary_color
      .imgWrap
        height: 180px
        // @include small
        //   height: 210px
        img
          +size(100%,100%)
          object-fit: cover
          object-position: 50% 50%
      .cardText
        padding: 0px 3px
</style>
