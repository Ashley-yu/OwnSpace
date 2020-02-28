<template lang="pug">
  .message-alert
    .alert.alert-dismissible(:class="item.status" v-for='(item, i) in messages' :key='i')
      i.fas.fa-tired.mr-3(v-if="item.status == 'danger'")
      i.fas.fa-grin.mr-3(v-else)
      | {{ item.message }}
      button.close(type='button' @click='removeMessage(i)' aria-label='Close')
        span(aria-hidden='true') &times;
</template>

<script>
export default {
  name: 'AlertMessage',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message, // 文字的內容
        status, // 樣式
        timestamp, // 類似 id
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    // 5秒後會自動移除訊息
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    const vm = this;
    // 自定義名稱 'messsage:push' message: 傳入參數 status: 樣式，預設值為 warning
    // 外層在 $bus 上透過 Vue 的 $on 掛載監聽事件 message:push 的方法
    // 內層透過 Vue 的 $emit 傳遞事件觸發 $on
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
};
</script>

<style scope lang="sass">
@import "@/assets/sass/all.sass";
.message-alert
  position: fixed
  max-width: 80%
  top: 45px
  right: 12%
  z-index: 1100
.alert
  i
    font-size: 22px
.close
  line-height: 20px
.success
  color: $white_color
  background-color: $title_color
.danger
  color: $white_color
  background-color: $primary_color
</style>
