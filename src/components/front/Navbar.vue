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
            li.nav-item.dropdown(@click.prevent="getFavorites")
              .nav-link.dropdown-toggle(data-toggle='dropdown' aria-haspopup="true" aria-expanded="false")
                i.fas.fa-thumbs-up
                  span(v-if="favorLength > 0") {{ favorLength }}
              .dropdown-menu.dropdown-menu-right
                table.itemContent
                  tbody.d-flex.justify-content-start.align-items-center.flex-column
                    h3.itemTitle(v-if='favorLength === 0') 還沒有喜歡的商品嗎?
                    h3.itemTitle(v-else) 按讚好物
                    tr(v-for="item in favorites" :key="item.id")
                      td
                        i.fas.fa-cart-plus.cartIcon(@click.stop="addtoCart(item.id)" v-if="item.id !== status.loadingItem")
                        i.fas.fa-spinner.fa-spin.disabled(@click.stop="" v-else)
                      td.itemPicture
                        .picturewrap
                          img(:src="`${item.imageUrl}`", alt="")
                      td.itemName(@click="$router.push(`/product_detail/${item.id}`)") {{ item.title }}
                      td.itemDelete(@click.stop="removeFavorItem(item)")
                        span X
            li.nav-item.dropdown(@click.prevent="getCart")
              .nav-link.dropdown-toggle#cartDropdown(data-toggle='dropdown' aria-haspopup="true" aria-expanded="false")
                i.fas.fa-shopping-cart(:class="{'empty': cartLength === 0}")
                  span(v-if="cartLength > 0") {{ cartLength }}
              .dropdown-menu.dropdown-menu-right(aria-labelledby="cartDropdown")
                table.itemContent
                  tbody.d-flex.justify-content-start.align-items-center.flex-column
                    h3.itemTitle(v-if='cartLength === 0') 快將想要的商品丟進來!
                    h3.itemTitle(v-else) 購物車
                    tr(v-for="item in cart.carts" :key="item.id")
                      td.itemPicture
                        .picturewrap
                          img(:src="`${item.product.imageUrl}`", alt="")
                      td.itemName(@click="$router.push(`/product_detail/${item.product_id}`)") {{ item.product.title }}
                      td x{{ item.qty }}
                      td {{ item.total | currency }}
                      td.itemDelete(@click.stop="removeCartItem(item.id)")
                        span X
                .totalInfo
                  div 小計
                  .itemTotal {{ cart.total | currency }}
                  button.btn.checkOut(@click="$router.push('/product_list')" v-if="!cartLength || cartLength === 0") 購物去
                  button.btn.checkOut(@click="$router.push('/check_order')" v-else) 結帳去
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Navbar',
  data() {
    return {
      cart: {}, // 購物車資料
      cartLength: '', // 購物車商品筆數
      favorites: {}, // 喜歡商品資料
      favorLength: '', // 喜歡商品資料筆數
      status: {
        loadingItem: '', // 當筆點選商品 id
      },
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
          // 若購物車無資料則開啟dropdown-menu
          if (vm.cartLength === 0) {
            $('#cartDropdown').dropdown('toggle');
          }
        }
      });
    },
    // 刪除購物車商品
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;

      vm.$http.delete(url).then((response) => {
        if (!response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        } else {
          // 重新整理 CheckOrder 購物車
          vm.$bus.$emit('checkCart:get');
          vm.getCart();
        }
      });
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
    addtoCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };

      vm.status.loadingItem = id;
      vm.$http.post(api, { data: cart }).then((response) => {
        vm.status.loadingItem = '';
        if (!response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        } else {
          vm.getCart();
          vm.$bus.$emit('checkCart:get');
          vm.$bus.$emit('message:push', response.data.message, 'success');
        }
      });
    },
  },
  created() {
    const vm = this;
    vm.getCart();
    vm.$bus.$on('cart:get', () => vm.getCart());
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/sass/all.sass";
@import "@/assets/sass/navbar.sass";

.itemContent
  tbody
    .itemName
      cursor: pointer
      &:hover
        color: $primary_color
.shop
  @include small
    display: none
.dropdown-menu
  max-width: 330px
  max-height: 360px
  overflow-y: auto
  .cartIcon
    font-size: 20px
    color: $secondary_color
    cursor: pointer
    &:hover
      color: $primary_color
.itemContent
  color: $black_color
  font-weight: 300
  @include small
    width: 270px
  tbody
    padding: 3px 10px
    @include small
      padding: 3px 5px
  td
    padding: 5px
  tr
    margin: 3px
    border-bottom: 1px solid $secondary_color
  .itemTitle
    text-align: center
    font-size: 18px
    font-weight: 300
    letter-spacing: 1px
    margin: 0
  .itemPicture
    .picturewrap
      min-width: 45px
      height: 70px
      img
        +size(100%,100%)
        object-fit: cover
        object-position: 50% 50%
  .itemName
    width: 50%
    font-size: 14px
  .itemDelete
    width: 5%
    font-weight: 500
    text-align: center
    span
      cursor: pointer
      &:hover
        color: $primary_darken_color
.totalInfo
  text-align: center
  margin-top: 15px
  div
    display: inline-block
    width: 45%
    font-size: 16px
    font-weight: 300
  .itemTotal
    padding-right: 18px
    text-align: right
  .checkOut
    width: 90%
    margin-top: 10px
    @include button()
      border: none
      background-color: $primary_lighten_color
      color: $black_color
      &:hover
        background-color: $primary_color
        animation: beat 0.5s
#cartDropdown
  i
    &.empty
      animation: wiggle 3s infinite
</style>
