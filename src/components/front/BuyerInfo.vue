<template lang="pug">
  div
    <!-- isLoading： false-停用/ true-啟用 -->
    loading(loader="dots" color="#D1ACA6" :active.sync='isLoading')
    HeaderPic
    .container
      OrderProgress(:currentStep='step')
      .buyerInfo
        .row.m-0.d-flex.justify-content-center
          .col-11.col-sm-10.col-lg-8
            form(@submit.prevent="createOrder")
              .form-row
                .form-group.col-sm-6
                  label(for='userName') 收件人姓名
                    |
                    span.marker *
                  input.form-control#userName(type="text" name="name" :class="{'is-invalid': errors.has('name')}" v-model="form.user.name" v-validate="'required'" placeholder="請輸入姓名")
                  span.text-danger(v-if="errors.has('name')") {{ errors.first('name') }}
                .form-group.col-sm-6
                  label(for='usertel') 收件人手機
                    |
                    span.marker *
                  input.form-control#userTel(type="tel" name="tel" :class="{'is-invalid': errors.has('tel')}" v-model="form.user.tel" v-validate="'required|cellphone'" placeholder="請輸入手機號碼 (ex: 09xxxxxxxx)" maxlength="10")
                  span.text-danger(v-if="errors.has('tel')") {{ errors.first('tel') }}
              .form-row
                .form-group.col-sm-8
                  label(for='userEmail') 收件人Email
                    |
                    span.marker *
                  input.form-control#userEmail(type="email" name="email" :class="{'is-invalid': errors.has('email')}" v-model="form.user.email" v-validate="'required'" placeholder="請輸入Email")
                  span.text-danger(v-if="errors.has('email')") {{ errors.first('email') }}
                .form-group.col-sm-4
                  .select-wrapper
                    label(for='payment') 付款方式
                      |
                      span.marker *
                    select#payment.form-control(v-model="form.user.payment")
                      option(value='COD') 貨到付款
                      option(value='CVS') 超商付款
                      option(value='ATM') ATM付款
              .form-group
                label(for='userAddress') 收件人地址
                  |
                  span.marker *
                input.form-control#userAddress(type="text" name="address" :class="{'is-invalid': errors.has('address')}" v-model="form.user.address" v-validate="'required'" placeholder="請輸入地址")
                span.text-danger(v-if="errors.has('address')") {{ errors.first('address') }}
              .form-group
                label(for='message') 備註
                textarea.form-control#message(name="message" cols='10' rows='3' v-model="form.user.message" placeholder="歡迎留下想對我們說的話")
              .form-group.notice(v-if="form.user.payment === 'CVS'")
                h5
                  i.fas.fa-exclamation-circle.mr-3
                  | 超商付款
                ul
                  li 可至7-11，全家，萊爾富，ok便利商店進行列印單據並且繳款。
                  li 在完成訂單的頁面，會顯示您此筆交易專屬的超商代碼，請記下這組代碼至鄰近的超商利用服務機器列印帳單進行繳費。
                  li 繳費期限為訂單成立時間起24小時內須完成交易，若逾期超商代碼將失效，並自動取消訂單。
              .form-group.notice(v-if="form.user.payment === 'ATM'")
                h5
                  i.fas.fa-exclamation-circle.mr-3
                  | ATM付款
                ul
                  li 包含實體ATM轉帳，或是網路ATM線上轉帳。
                  li 在完成訂單的頁面，會顯示您此筆交易專屬的虛擬帳號，請記下這組帳號至鄰近的ATM或網路ATM進行轉帳。
                  li 繳費期限為訂單成立時間起24小時內須完成交易，若逾期虛擬帳號將失效，並自動取消訂單。
              .d-flex.justify-content-between
                button.btn(@click.prevent="goBack")
                  i.fas.fa-angle-double-left.mr-1
                  | 上一步
                button.btn(type="submit")
                  | 下一步
                  i.fas.fa-angle-double-right.ml-1
</template>

<script>
import HeaderPic from '@/components/HeaderPic.vue';
import OrderProgress from '@/components/front/OrderProgress.vue';

export default {
  name: 'BuyerInfo',
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          payment: 'COD',
        },
        message: '',
      },
      isLoading: false, // loading 圖示顯示狀態
      step: 2, // 變更階段樣式(OrderProgress)
    };
  },
  methods: {
    // 送出訂單
    createOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;

      vm.isLoading = true;
      // 送出時套件驗證
      vm.$validator.validate().then((valid) => {
        if (valid) {
          vm.$http.post(url, { data: order }).then((response) => {
            if (response.data.success) {
              vm.$router.push(`/order_info/${response.data.orderId}/${vm.form.user.payment}`);
            } else {
              vm.$bus.$emit('message:push', response.data.message, 'danger');
              vm.$router.push('/product_list');
            }
          });
        } else {
          vm.$bus.$emit('message:push', '請確認資料是否填寫完整', 'danger');
        }
        vm.isLoading = false;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  components: {
    HeaderPic,
    OrderProgress,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/sass/all.sass";

.buyerInfo
  padding-bottom: 60px
  button
    margin: 15px 0px
    @include button()
      background-color: $primary_lighten_color
      color: $black_color
      &:hover
        background-color: $primary_color
.marker
  padding-left: 2px
  font-size: 20px
  color: $primary_color
.notice
  margin-top: 30px
  padding: 15px
  padding-bottom: 0px
  color: $black_color
  border-top: 1px solid $primary_color
  h5
    color: $primary_darken_color
</style>
