<template lang="pug">
  .products
    <!-- isLoading： false-停用/ true-啟用 -->
    loading(loader="dots" color="#D1ACA6" :active.sync='isLoading')
    HeaderPic
      Category(:category='category' :currentOption='isCurrent' @get-category='changeCategory')
    .container-fluid
      .row
        .col-lg-3.col-md-4.col-sm-6.px-xl-3.px-2(v-for="item in filterProducts" :key="item.id")
          .productBox(:class="{'mask': !item.is_enabled}" @click="$router.push(`/product_detail/${item.id}`)")
            .soldOut(v-if="!item.is_enabled")
              h6 已售完
            .top
              img(:src="`${item.imageUrl}`", alt="")
              .tag(v-if="item.price !== item.origin_price") 特價中
            .bottom
              h3 {{ item.title }}
              .text.d-flex.justify-content-start.align-items-center
                .price NT {{ item.price | currency }}
                i.fas.fa-thumbs-up.like.liked(v-if="setliked(item)" @click.stop="changeFavorite(item)")
                i.fas.fa-thumbs-up.like(v-else @click.stop="changeFavorite(item)")
                i.fas.fa-cart-plus.cart(@click.stop="addtoCart(item.id)" v-if="item.id !== status.loadingItem")
                i.fas.fa-spinner.fa-spin(v-if="item.id === status.loadingItem")
    <!-- 頁碼 -->
    pagination(:pagination='pagination' @get-pagination='setPagination' v-if="pagination.total_pages > 1")
    ToTop
</template>

<script>
import HeaderPic from '@/components/HeaderPic.vue';
import Category from '@/components/front/Category.vue';
import Pagination from '@/components/Pagination.vue';
import ToTop from '@/components/ToTop.vue';

export default {
  name: 'ProductList',
  components: {
    HeaderPic,
    Category,
    Pagination,
    ToTop,
  },
  data() {
    return {
      products: [], // 所有商品資料
      category: [], // 儲存類別
      isCurrent: '全部商品', // 目前選擇類別
      currentPageNum: 1, // 目前頁碼
      showPages: '', // 顯示頁數
      pagination: {
        total_pages: '',
        current_page: '',
        has_pre: false,
        has_next: true,
      },
      status: {
        loadingItem: '', // 當筆點選商品 id
      },
      isLoading: false, // loading 圖示顯示狀態
      favorites: [], // 存 localstorage 資料
    };
  },
  methods: {
    // 取得所有商品資料
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;

      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.isLoading = false;
        if (!response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
          vm.$router.push('/product_list');
        } else {
          // 儲存所有商品資料
          vm.products = response.data.products;

          // 取得商品類別
          vm.getCategory();

          // 初始頁數以所有資料計算(8筆資料為一頁，使用無條件進位)
          vm.showPages = Math.ceil(vm.products.length / 8);
        }
      });
    },
    // 取得類別項目
    getCategory() {
      const vm = this;
      const allCategory = [];
      vm.products.forEach(item => allCategory.push(item.category));
      // 篩選不重複的類別
      vm.category = allCategory.filter((element, index, array) => array.indexOf(element) === index);
      vm.category.unshift('全部商品');
    },
    // 頁碼變數處理 (pagination 呼叫)
    setPagination(page = 1) {
      // 儲存目前點擊頁碼
      this.currentPageNum = page;
      // 總頁數
      this.pagination.total_pages = this.showPages;
      // 目前頁數
      this.pagination.current_page = this.currentPageNum;
      // 判斷目前頁碼，若小於1，則前一頁按鈕無法點選
      if (this.currentPageNum <= 1) {
        this.pagination.has_pre = false;
      } else {
        this.pagination.has_pre = true;
      }
      // 判斷目前頁碼，若大於總頁數，則後一頁按鈕無法點選
      if (this.currentPageNum >= this.pagination.total_pages) {
        this.pagination.has_next = false;
      } else {
        this.pagination.has_next = true;
      }
    },
    // 處理畫面一頁顯示8筆資料
    setShowData(data) {
      // 8筆資料為一頁，使用無條件進位
      const pages = Math.ceil(data.length / 8);
      // 更新目前顯示頁數
      this.showPages = pages;
      // 更新頁碼
      this.setPagination(this.currentPageNum);
      // 計算要顯示的資料
      const startNum = (parseInt(this.currentPageNum, 10) - 1) * 8;
      const endNum = ((parseInt(this.currentPageNum, 10) - 1) * 8 + 8);
      return data.slice(startNum, endNum);
    },
    // 類別變動時，更新相關變數 (Category.vue 點擊呼叫)
    changeCategory(option = '全部商品') {
      // 目前點擊類別
      this.isCurrent = option;
      // 頁碼重設初始值
      this.currentPageNum = 1;
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
          // 重新整理 Navbar 購物車
          vm.$bus.$emit('cart:get');
          vm.$bus.$emit('message:push', response.data.message, 'success');
        }
      });
    },
    // 取得喜歡的商品
    getFavorites() {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      this.favorLength = this.favorites.length;
    },
    // 變更喜愛的商品資料(新增/移除)
    changeFavorite(product) {
      const vm = this;
      let delIndex = -1; // 儲存有在this.favorites中資料的index

      if (vm.favorites.length > 0) {
        vm.favorites.forEach((item, index) => {
          if (item.id === product.id) {
            delIndex = index;
          }
        });
      }

      if (delIndex === -1) {
        // 不存在則加入陣列
        vm.favorites.push(product);
      } else {
        // 存在則移除
        vm.favorites.splice(delIndex, 1);
      }

      // 儲存至 localStorage
      localStorage.setItem('favorites', JSON.stringify(vm.favorites));
      // 重新整理
      vm.getFavorites();
      vm.$bus.$emit('favor:get');
    },
    // 判斷顯示/隱藏關注樣式
    setliked(item) {
      const liked = this.favorites.filter(favor => favor.id === item.id);
      if (liked.length > 0) {
        return true;
      }
      return false;
    },
  },
  computed: {
    // 依類別篩選要顯示的商品資料
    filterProducts() {
      let tempProducts = this.products;
      if (this.isCurrent && this.isCurrent !== '全部商品') {
        tempProducts = this.products.filter(item => item.category === this.isCurrent);
      }

      return this.setShowData(tempProducts);
    },
  },
  created() {
    const vm = this;
    // 接類別變數
    if (vm.$route.params.category) {
      vm.isCurrent = vm.$route.params.category;
    }
    vm.getProducts();
    vm.getFavorites();
    vm.$bus.$on('productFavor:get', () => vm.getFavorites());
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/sass/all.sass";

.products
  padding: 0px 15px
  @include medium
    padding: 0px 10px
.productBox
  margin: 0px 3px 60px 3px
  box-shadow: 0px 0px 5px rgba(0,0,0,0.2)
  cursor: pointer
  .top
    position: relative
    height: 300px
    img
      +size(100%,100%)
      object-fit: cover
      object-position: 50% 50%
    .tag
      position: absolute
      top: 9px
      right: 9px
      padding: 3px 10px
      border-radius: 3px
      font-weight: 500
      font-size: 14px
      letter-spacing: 1px
      color: $white_color
      background-color: $title_color
  .bottom
    padding: 15px
    h3
      font-size: 18px
      font-weight: 400
    .price
      width: 80%
      letter-spacing: 1px
      color: $black_color
    i
      font-size: 20px
      color: $secondary_color
      margin: 0px 10px
      cursor: pointer
      &:hover
        animation: beat 0.5s
        color: $primary_color
      &.liked
        color: $primary_color
.productBox
  position: relative
  &.mask
    cursor: not-allowed
    pointer-events: none
  .soldOut
    position: absolute
    +size(100%, 100%)
    top: 0
    left: 0
    background-color: rgba(0,0,0,0.5)
    z-index: 1
    h6
      position: absolute
      top: 50%
      left: 50%
      transform: translateX(-50%) translateY(-50%)
      +size(50%, 45px)
      text-align: center
      font-size: 24
      line-height: 40px
      color: $white_color
      border: 2px solid $white_color
</style>
