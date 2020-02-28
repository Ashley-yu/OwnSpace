<template lang="pug">
  div
    <!-- isLoading： false-停用/ true-啟用 -->
    loading(loader="dots" color="#D1ACA6" :active.sync='isLoading')
    HeaderPic
    .container-fluid
      OrderProgress(:currentStep='step')
      .listContent
        .row
          .col-md-6
            h3 訂單資訊
            p.text-right 訂購日期 - {{ order.create_at | date }}
            table.table
              thead
                tr
                  th 品名
                  th 數量
                  th 價格
              tbody
                tr(v-for="item in order.products" :key="item.id")
                  td.text-left {{ item.product.title }}
                  td {{ item.qty }} {{ item.product.unit }}
                  td.text-right NT {{ item.final_total | currency }}
              tfoot
                tr
                  td
                  td 總計
                  td NT {{ order.total | currency }}
          .col-md-6
            .infoArea
              h3 收件人資料
              table.table
                tbody
                  tr
                    td.title 姓名
                    td.text {{ order.user.name }}
                  tr
                    td.title 電話
                    td.text {{ order.user.tel }}
                  tr
                    td.title Email
                    td.text {{ order.user.email }}
                  tr
                    td.title 地址
                    td.text {{ order.user.address }}
                tfoot
                  tr
                    td.title 付款狀態
                    td.incomplete.text-left(v-if="!order.is_paid") 尚未付款
                    td.complete.text-left(v-else) 完成付款
              .payment
                button.btn(v-if="!order.is_paid" @click.prevent="payOrder")
                  i.fas.fa-wallet.mr-1
                  | 確認付款
                button.btn(v-else @click.prevent="$router.push('/product_list')")
                  i.fas.fa-store-alt.mr-1
                  | 回到商店
</template>

<script>
import HeaderPic from '@/components/HeaderPic.vue';
import OrderProgress from '@/components/front/OrderProgress.vue';

export default {
  name: 'OrderInfo',
  components: {
    HeaderPic,
    OrderProgress,
  },
  data() {
    return {
      orderId: '', // 訂單編號
      order: { // 訂單內容
        user: {},
      },
      isLoading: false, // loading 圖示顯示狀態
      step: 3, // 變更階段樣式(OrderProgress)
    };
  },
  methods: {
    // 取得訂單資料
    getOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;

      vm.$http.get(url).then((response) => {
        if (!response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
          vm.$router.push('/product_list');
        } else {
          vm.order = response.data.order;
        }
      });
    },
    // 確認付款
    payOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;

      vm.isLoading = true;
      vm.$http.post(url).then((response) => {
        vm.isLoading = false;
        if (response.data.success) {
          vm.getOrder();
          // 重新整理 Navbar 購物車
          vm.$bus.$emit('cart:get');
          vm.$bus.$emit('message:push', response.data.message, 'success');
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        }
      });
    },
  },
  created() {
    // 接訂單編號參數
    this.orderId = this.$route.params.order_id;
    this.getOrder();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/sass/all.sass";
@import "@/assets/sass/table.sass";

.listContent
  padding-bottom: 60px
  @include x-small
    font-size: 15px
  h3
    margin-top: 15px
    font-size: 20px
    font-weight: 400
    color: $primary_darken_color
  .infoArea
    // 解決email換行問題
    table
      table-layout: fixed
      td
        word-wrap: break-word
    .title
      width: 30%
      text-align: left
    .text
      text-align: left
    .incomplete
      color: $primary_darken_color
    .complete
      color: $title_color
    .payment
      text-align: right
      margin: 15px
      button
        @include button()
          background-color: $primary_lighten_color
          color: $black_color
          &:hover
            background-color: $primary_color
</style>
