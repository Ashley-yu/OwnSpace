<template lang="pug">
  div
    loading(loader="dots" color="#D1ACA6" :active.sync='isLoading')
    HeaderPic
    .container
      OrderProgress(:currentStep='step')
      .listContent
        .row
          .col-md-8
            table.table.orderContent
              thead
                tr
                  th(colspan="2") 商品資訊
                  th 數量
                  th 價格
                  th 刪除
              tbody
                tr(v-for="item in cart.carts" :key="item.id")
                  td.orderImg
                    img.img-fluid(:src="`${item.product.imageUrl}`", alt="")
                  td.text-left.productName(@click="$router.push(`/product_detail/${item.product_id}`)") {{ item.product.title }}
                  td.orderColumn {{ item.qty }}
                  td.text-right.orderColumn ${{ item.total }}
                  td.orderColumn
                    span(@click.prevent="removeCartItem(item.id)")
                      i.fas.fa-trash
              tfoot
                tr
                  td
                  td 共 {{ cartLength }} 項
                  td 總計
                  td ${{ cart.total }}
                  td
          .col-md-4
            .infoArea.d-flex.justify-content-center.align-items-center.flex-column
              .input-group.couponInfo
                input.form-control(type='text' placeholder="優惠券代碼" v-model="coupon_code")
                .input-group-append
                  span.input-group-text(@click="addCouponCode") 確認
              table.table.totalInfo
                tbody
                  tr
                    td 總計金額
                    td.text-right NT {{ cart.total | currency }}
                  tr
                    td 優惠折抵
                    td.text-right - NT {{ cart.total-cart.final_total | currency }}
                  tr
                    td 應付金額
                    td.text-right NT {{ cart.final_total | currency }}
              .buyerInfo
                button.btn(v-if="cartLength === 0" @click.prevent="$router.push('/product_list')")
                  i.fas.fa-store-alt.mr-1
                  | 回到商店
                button.btn(v-else @click.prevent="$router.push('/buyer_info')") 下一步
                  i.fas.fa-angle-double-right.ml-1
        .row
          .col-sm-12
            .notice
              h5
                i.fas.fa-exclamation-circle.mr-3
                | 注意事項
              ul
                li 請確認所填寫的資料是否正確，下單後未提供修改付款方式服務。
                li 因拍攝略有色差，圖片僅供參考，顏色請以實際收到商品為準。
                li 本商品目前只供應台灣地區，只提供宅配到府。
                li 目前支援貨到付款、超商付款、ATM付款。
                li 本商品為統一會於付款後7個工作日內出貨(不含假日)。
                li 辦理退換貨時，商品必須是全新狀態與完整包裝，退回之商品必須於7日鑑賞期內寄回。
</template>

<script>
import HeaderPic from '@/components/HeaderPic.vue';
import OrderProgress from '@/components/front/OrderProgress.vue';

export default {
  name: 'CheckOrder',
  components: {
    HeaderPic,
    OrderProgress,
  },
  data() {
    return {
      cart: {}, // 購物車資料
      cartLength: '', // 購物車商品筆數
      isLoading: false, // loading 圖示顯示狀態
      coupon_code: '', // 優惠代碼
      step: 1, // 變更階段樣式(OrderProgress)
    };
  },
  methods: {
    // 取得購物車
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;

      vm.$http.get(url).then((response) => {
        if (!response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        } else {
          vm.cart = response.data.data;
          vm.cartLength = vm.cart.carts.length;
        }
      });
    },
    // 刪除購物車商品
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      vm.$http.delete(url).then((response) => {
        vm.isLoading = false;
        if (!response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        } else {
          // 重新整理 Navbar 購物車
          vm.$bus.$emit('cart:get');
          vm.$bus.$emit('message:push', response.data.message, 'success');
        }
        vm.getCart();
      });
    },
    // 套用優惠券
    addCouponCode() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };

      vm.isLoading = true;
      vm.$http.post(url, { data: coupon }).then((response) => {
        vm.getCart();

        vm.isLoading = false;
        if (!response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'success');
        }
      });
    },
  },
  created() {
    const vm = this;
    vm.getCart();
    vm.$bus.$on('checkCart:get', () => vm.getCart());
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/sass/all.sass";
@import "@/assets/sass/table.sass";

.orderContent
  .productName
    cursor: pointer
    &:hover
      color: $primary_color
.listContent
  @include medium
    font-size: 15px
  @include x-small
    font-size: 13px
  .orderImg
    width: 15%
    padding: 3px
  .orderColumn
    width: 15%
    span
      cursor: pointer
      color: $secondary_color
      &:hover
        color: $primary_darken_color
      i
        font-size: 18px
  .infoArea
    .couponInfo
      max-width: 380px
      padding: 15px 0px
    .totalInfo
      max-width: 380px
      td
        border: none
        font-size: 15px
        padding: 10px
        @include small
          padding: 8px 16px
    .couponInfo
      input
        border: 1px solid $primary_color
      span
        padding: 6px 18px
        font-weight: 400
        letter-spacing: 2px
        color: $white_color
        background-color: $primary_color
        border: 1px solid $primary_color
        cursor: pointer
        transition: $duration
        &:hover
          background-color: $primary_darken_color
          color: $white_color
    .buyerInfo
      width: 100%
      max-width: 380px
      text-align: right
      margin: 15px
      button
        @include button()
          background-color: rgba($primary_color, 0.7)
          color: $black_color
          &:hover
            background-color: $primary_color
  .notice
    margin-top: 30px
    padding: 15px
    padding-bottom: 0px
    color: $black_color
    border-top: 1px solid $primary_color
    h5
      color: $primary_darken_color
</style>
