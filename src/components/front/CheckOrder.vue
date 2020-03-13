<template lang="pug">
  div
    loading(loader="dots" color="#D1ACA6" :active.sync='isLoading')
    HeaderPic
    .container
      OrderProgress(:currentStep='step')
      .listContent
        .row
          .col-12(:class="{'col-md-8': isConfirm}")
            table.table.orderContent
              thead
                tr
                  th(colspan="2") 商品資訊
                  th 數量
                  th 價格
                  th(v-if="!isConfirm") 刪除
              tbody
                tr(v-for="item in cart" :key="item.id")
                  td.orderImg
                    .imgArea
                      img(:src="`${item.imageUrl}`", alt="")
                  td.text-left.productName(@click="$router.push(`/product_detail/${item.id}`)") {{ item.title }}
                  td.orderColumn(v-if="isConfirm") {{ item.qty }}
                  td.editColumn(v-else)
                    .countNumber.d-flex.justify-content-center.align-items-center
                      button.btn.minus(@click="changeQty(item, -1)")
                        i.fas.fa-minus
                      input.productNumber(type='number' max='10' min='1' v-model="item.qty" @change="changeNumber(item, item.qty)")
                      button.btn.add(@click="changeQty(item, 1)")
                        i.fas.fa-plus
                  td.text-right.orderColumn ${{ item.total }}
                  td.orderColumn(v-if="!isConfirm")
                    span(@click.prevent="removeCartItem(item.id)")
                      i.fas.fa-trash
              tfoot
                tr
                  td
                  td 共 {{ cartLength }} 項
                  td 總計
                  td ${{ total }}
                  td(v-if="!isConfirm")
            .check(v-if="!isConfirm")
              button.btn(v-if="cartLength === 0" @click.prevent="$router.push('/product_list')")
                i.fas.fa-store-alt.mr-1
                | 回到商店
              button.btn(v-else @click.prevent="confirmCart")
                i.fas.fa-clipboard-check.mr-1
                | 確認送出
          .col-md-4(v-if="isConfirm")
            .infoArea.d-flex.justify-content-center.align-items-center.flex-column
              .input-group.couponInfo
                input.form-control(type='text' placeholder="優惠券代碼" v-model="coupon_code")
                .input-group-append
                  span.input-group-text(@click="addCouponCode") 確認
              table.table.totalInfo
                tbody
                  tr
                    td 總計金額
                    td.text-right NT {{ cartData.total | currency }}
                  tr
                    td 優惠折抵
                    td.text-right - NT {{ cartData.total-cartData.final_total | currency }}
                  tr
                    td 應付金額
                    td.text-right NT {{ cartData.final_total | currency }}
              .nextStep
                button.btn(@click.prevent="goNextPage") 下一步
                  i.fas.fa-angle-double-right.ml-1
        .row
          .col-sm-12
            .notice
              .backText NOTICE
              h5
                i.fas.fa-exclamation-circle.mr-3
                | 注意事項
              ul
                li 請確認所填寫的資料是否正確，下單後未提供修改付款方式服務。
                li 因拍攝略有色差，圖片僅供參考，顏色請以實際收到商品為準。
                li 本店商品目前只供應台灣地區，只提供宅配到府。
                li 目前支援貨到付款、超商付款、ATM付款。
                li 本店商品為統一會於付款後7個工作日內出貨(不含假日)。
                li 辦理退換貨時，商品必須是全新狀態與完整包裝，退回之商品必須於7日鑑賞期內寄回。
    #leaveModal.modal.fade.p-0(tabindex='-1' role='dialog' aria-hidden='true' data-backdrop='static')
      .modal-dialog.modal-dialog-centered(role='document')
        .modal-content.border-0
          .modal-body
            p 尚未完成訂購流程，請確認是否離開此頁?
          .modal-footer
            button.btn.cancel(type='button' data-dismiss='modal') 取消
            button.btn.confirm(type='button' data-dismiss='modal') 確定
</template>

<script>
import $ from 'jquery';
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
      cart: {}, // 購物車資料(localStorage)
      cartLength: '', // 購物車商品筆數(localStorage)
      isLoading: false, // loading 圖示顯示狀態
      coupon_code: '', // 優惠代碼
      step: 1, // 變更階段樣式(OrderProgress)
      total: 0, // 總計金額
      cartData: {
        total: 0,
        final_total: 0,
      },
      isConfirm: false, // 是否已呼叫API存購物車商品
      isNext: false, // 是否為下一步
    };
  },
  methods: {
    // 取得購物車
    getCart() {
      const vm = this;
      vm.cart = JSON.parse(localStorage.getItem('cart')) || [];
      vm.cartLength = this.cart.length;
      // 計算小計金額
      vm.total = 0;
      vm.cart.forEach((item) => { vm.total += item.total; });

      if (vm.cartLength === 0) {
        vm.isNext = true;
        vm.$router.push('/product_list');
      }
    },
    // 刪除購物車商品
    removeCartItem(id) {
      const vm = this;
      let delIndex = -1;

      if (vm.cart.length > 0) {
        vm.cart.forEach((item, index) => {
          if (item.id === id) {
            delIndex = index;
          }
        });
      }
      vm.cart.splice(delIndex, 1);

      localStorage.setItem('cart', JSON.stringify(vm.cart));
      // 重新整理 Navbar 購物車
      vm.$bus.$emit('cart:get');
      vm.$bus.$emit('message:push', '商品已刪除', 'success');
      vm.getCart();
    },
    // 商品數量變更做判斷
    changeQty(product, num) {
      const qty = parseInt((product.qty + num), 10);
      this.changeNumber(product, qty);
    },
    // 數量欄位變動時判斷
    changeNumber(product, qty) {
      const vm = this;
      let productIndex = -1;
      if (vm.cart.length > 0) {
        vm.cart.forEach((item, index) => {
          if (item.id === product.id) {
            productIndex = index;
          }
        });
      }

      if (qty >= 10) {
        vm.cart[productIndex].qty = 10;
      } else if (qty <= 1) {
        vm.cart[productIndex].qty = 1;
      } else {
        vm.cart[productIndex].qty = qty;
      }

      // 計算金額
      const total = parseInt((vm.cart[productIndex].price * vm.cart[productIndex].qty), 10);
      vm.cart[productIndex].total = total;

      // 更新
      localStorage.setItem('cart', JSON.stringify(vm.cart));
      vm.$bus.$emit('cart:get');
      vm.getCart();
    },
    // 儲存購物資料 (確認送出按鈕)
    confirmCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;

      vm.isLoading = true;
      vm.cart = JSON.parse(localStorage.getItem('cart')) || [];
      vm.cart.forEach((item) => {
        const cart = {
          product_id: item.id,
          qty: item.qty,
        };
        vm.$http.post(api, { data: cart }).then((response) => {
          if (!response.data.success) {
            vm.$bus.$emit('message:push', response.data.message, 'danger');
          } else {
            vm.getCartData();
          }
          vm.isLoading = false;
        });
      });
    },
    // 取得確認購物資料
    getCartData() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;

      vm.$http.get(url).then((response) => {
        if (!response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        } else {
          vm.cartData = response.data.data;
          if (vm.cartData.carts.length > 0) {
            vm.isConfirm = true;
          } else {
            vm.isConfirm = false;
          }
        }
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
        vm.getCartData();

        vm.isLoading = false;
        if (!response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'success');
        }
      });
    },
    // 刪除確認購買商品
    cancelCart() {
      const vm = this;

      if (vm.isConfirm) {
        vm.cartData.carts.forEach((item) => {
          const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;

          vm.$http.delete(url).then((response) => {
            if (!response.data.success) {
              vm.$bus.$emit('message:push', response.data.message, 'danger');
            }
          });
        });
      }
    },
    goNextPage() {
      this.isNext = true;
      this.$router.push('/buyer_info');
    },
  },
  created() {
    const vm = this;
    vm.getCart();
    vm.getCartData();
    vm.$bus.$on('checkCart:get', () => vm.getCart());
  },
  beforeRouteLeave(to, from, next) {
    const vm = this;
    if (vm.isNext) {
      next();
    } else {
      $('#leaveModal').modal('show');
      $('.confirm').on('click', () => {
        vm.cancelCart();
        next();
      });
      $('.cancel').on('click', () => {
        next(false);
      });
    }
  },
};
</script>
