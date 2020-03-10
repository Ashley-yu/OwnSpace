<template lang="pug">
  div
    nav.navbar.navbar-expand.fixed-top.d-flex.justify-content-center.align-items-center.navbar_top
      .container-fluid
        router-link.navbar-brand(to="/")
          i.fas.fa-seedling.mr-1.mr-sm-3
          span Own Space
        .collapse.navbar-collapse.ml-1.ml-sm-3#navbarContent
          ul.navbar-nav.mr-auto
            li.nav-item
              router-link.nav-link(to="/product_list")
                i.fas.fa-store-alt.mr-1
                span.shop 逛商店
          ul.navbar-nav
            li.nav-item.dropdown(:class="{'avoid': avoidClick}" @click.prevent="getFavorites")
              .nav-link.dropdown-toggle#favorDropdown(data-toggle='dropdown' aria-haspopup="true" aria-expanded="false")
                i.fas.fa-thumbs-up
                  span(v-if="favorLength > 0") {{ favorLength }}
              .dropdown-menu.dropdown-menu-right(aria-labelledby="favorDropdown")
                table.itemContent
                  tbody.d-flex.justify-content-start.align-items-center.flex-column
                    h3.itemTitle(v-if='favorLength === 0') 還沒有喜歡的商品嗎?
                    h3.itemTitle(v-else) 按讚好物
                    tr(v-for="item in favorites" :key="item.id")
                      td
                        i.fas.fa-cart-plus.cartIcon(@click.stop="addtoCart(item)" v-if="item.id !== status.loadingItem")
                        i.fas.fa-spinner.fa-spin.disabled(@click.stop="" v-else)
                      td.itemPicture
                        .picturewrap
                          img(:src="`${item.imageUrl}`", alt="")
                      td.itemName(@click="$router.push(`/product_detail/${item.id}`)") {{ item.title }}
                      td.itemDelete(@click.stop="removeFavorItem(item)")
                        span X
            li.nav-item.dropdown(:class="{'avoid': avoidClick}" @click.prevent="getCart")
              .nav-link.dropdown-toggle#cartDropdown(data-toggle='dropdown' aria-haspopup="true" aria-expanded="false")
                i.fas.fa-shopping-cart(:class="{'empty': cartLength === 0}")
                  span(v-if="cartLength > 0") {{ cartLength }}
              .dropdown-menu.dropdown-menu-right(aria-labelledby="cartDropdown")
                table.itemContent
                  tbody.d-flex.justify-content-start.align-items-center.flex-column
                    h3.itemTitle(v-if='cartLength === 0') 快將想要的商品丟進來!
                    h3.itemTitle(v-else) 購物車
                    tr(v-for="item in cart" :key="item.id")
                      td.itemPicture
                        .picturewrap
                          img(:src="`${item.imageUrl}`", alt="")
                      td.itemName(@click="$router.push(`/product_detail/${item.id}`)") {{ item.title }}
                      td x{{ item.qty }}
                      td {{ item.total | currency }}
                      td.itemDelete(@click.stop="removeCartItem(item.id)")
                        span X
                .totalInfo
                  div 小計
                  .itemTotal {{ total | currency }}
                  button.btn.checkOut(@click="$router.push('/product_list')" v-if="!cartLength || cartLength === 0") 購物去
                  button.btn.checkOut(@click="$router.push('/check_order')" v-else) 結帳去
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Navbar',
  data() {
    return {
      cart: {}, // 購物車資料(localstorage)
      cartLength: '', // 購物車商品筆數
      favorites: {}, // 喜歡商品資料
      favorLength: '', // 喜歡商品資料筆數
      status: {
        loadingItem: '', // 當筆點選商品 id
      },
      total: 0, // 小計金額
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
      // 重新整理 CheckOrder 購物車
      vm.$bus.$emit('checkCart:get');
      vm.getCart();
    },
    // 取得喜歡的商品
    getFavorites() {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      this.favorLength = this.favorites.length;
    },
    // 移除喜歡的商品
    removeFavorItem(product) {
      const index = this.favorites.indexOf(product);

      this.favorites.splice(index, 1);

      // 儲存至 localStorage
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      // 重新整理
      this.$bus.$emit('productFavor:get');
      this.getFavorites();
    },
    // 加入購物車，預設數量為 1
    addtoCart(product, qty = 1) {
      const vm = this;
      let productIndex = -1;

      vm.status.loadingItem = product.id;
      vm.getCart();
      if (vm.cart.length > 0) {
        vm.cart.forEach((item, index) => {
          if (item.id === product.id) {
            productIndex = index;
          }
        });
      }

      if (productIndex === -1) {
        const total = parseInt((product.price * qty), 10);
        // 不存在則加入陣列
        vm.$set(product, 'qty', qty);
        vm.$set(product, 'total', total);
        vm.cart.push(product);
      } else {
        // 存在則先計算數量
        const tempCart = Object.assign({}, vm.cart[productIndex]);
        tempCart.qty += qty;
        const total = parseInt((product.price * tempCart.qty), 10);
        tempCart.total = total;
        // 刪除該筆資料
        vm.cart.splice(productIndex, 1);
        // 將新資料存入陣列
        vm.cart.push(tempCart);
      }

      // 儲存至 localStorage
      localStorage.setItem('cart', JSON.stringify(vm.cart));
      // 重新整理
      vm.getCart();
      // 重新整理 CheckOrder 購物車
      vm.$bus.$emit('checkCart:get');
      vm.$bus.$emit('message:push', '商品已加入購物車', 'success');
      vm.status.loadingItem = '';
    },
  },
  watch: {
    // 若購物車無資料則開啟dropdown-menu
    cartLength(value) {
      if (value === 0) {
        $('#cartDropdown').dropdown('show');
      }
    },
  },
  computed: {
    // 結帳階段避免navbar購物車被異動
    avoidClick() {
      if (this.$route.path === '/check_order' || this.$route.path === '/buyer_info') {
        $('#cartDropdown').dropdown('hide');
        $('#favorDropdown').dropdown('hide');
        return true;
      }
      return false;
    },
  },
  created() {
    const vm = this;
    vm.getCart();
    vm.$bus.$on('cart:get', (status = 0) => vm.getCart(status));
    vm.getFavorites();
    vm.$bus.$on('favor:get', () => vm.getFavorites());
  },
  mounted() {
    // 監測滾輪滑動，離開最上方則移除 class navbar_top
    $(window).scroll(() => {
      if ($(window).scrollTop() > 0) {
        $('.navbar').removeClass('navbar_top');
      } else {
        $('.navbar').addClass('navbar_top');
      }
    });
  },
};
</script>
