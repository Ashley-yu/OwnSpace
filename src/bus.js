import Vue from 'vue';

// 將 EventBus (可以自訂名稱)掛載在 Vue 的原型下，才能被所有元件所取得
// $的功能是要提醒使用者：它是一個全域變數
Vue.prototype.$bus = new Vue();

// EventBus 可以跨元件呼叫
// Message
// this.$bus.$emit('message:push', message, status);
// message(String): 訊息內容
// status(String): Alert 的樣式

// 更新 Navbar 購物車
// this.$bus.$emit('cart:get');
// 更新 CheckOrder 購物車
// this.$bus.$emit('checkCart:get');
