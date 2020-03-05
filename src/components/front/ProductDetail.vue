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
    .container-fluid
      .row.m-0
        .col-md-6
          .productPicture
            img(:src="`${product.imageUrl}`", alt="")
        .col-md-6
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
  },
  created() {
    // 存商品 id
    this.productId = this.$route.params.product_id;
    this.getProduct();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/sass/all.sass";

.bookmark
  position: absolute
  padding: 15px
  bottom: 0
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
  padding-bottom: 60px
.productPicture
  height: 450px
  padding: 0px 30px
  @include large
    padding: 0px
  img
    +size(100%,100%)
    object-fit: cover
    object-position: 50% 50%
.productInfo
  padding: 0px 30px
  @include small
    padding: 15px
  li
    list-style: none
    p
      margin: 0
    .productTitle
      position: relative
      margin-bottom: 30px
      margin-top: 15px
      &::after
        content: ''
        +size(60%, 8px)
        position: absolute
        bottom: -2px
        left: 30px
        background-color: rgba($primary_color, 0.5)
    .productOriginal
      font-size: 14px
      text-decoration: line-through
      color: $black_color
    .productPrice
      margin-bottom: 15px
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
          border-radius: 3px 0px 0px 3px
        .add
          border-radius: 0px 3px 3px 0px
        .productNumber
          text-align: center
          width: 15%
          padding: 3px 10px
          border: 1px solid $secondary_color
          border-radius: 0px
          -webkit-border-radius: 0px
          -moz-border-radius: 0px
      .productBuy
        margin: 15px 0px
        @include button()
          background-color: $primary_lighten_color
          color: $black_color
          &:hover
            background-color: $primary_color
        &.disabled
          pointer-events: none
    .productDescription
      margin-top: 5px
</style>
