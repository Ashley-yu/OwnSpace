<template lang="pug">
  .login.d-flex.justify-content-center.align-items-center
    Alert
    .signBox
      form.form-signin.d-flex.justify-content-center.flex-column(@submit.prevent='signin')
        h3.mb-3.font-weight-normal
          i.fas.fa-user-cog.mr-1
          | 後台管理者登入
        .form-group
          input#inputEmail.form-control(type='email' placeholder='Email address' v-model='user.username' required='' autofocus='')
        .form-group
          input#inputPassword.form-control(type='password' v-model='user.password' placeholder='Password' required='')
        button.btn(type='submit') Sign in
</template>

<script>
import Alert from '@/components/AlertMessage.vue';

export default {
  name: 'Login',
  components: {
    Alert,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      // 登入的 API
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      const vm = this;
      vm.$http.post(api, vm.user).then((response) => {
        // 登入成功時回到首頁
        if (response.data.success) {
          vm.$router.push('/admin/products');
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        }
      });
    },
  },
};
</script>

<style scoped lang="sass">
@import "@/assets/sass/all.sass";

html,body
  height: 100%
.login
  height: 100vh
  background-color: $white_color
  .signBox
    +size(330px,330px)
    border-radius: 10px
    border: 3px solid $primary_color
    form
      height: 100%
      padding: $medium_space
      @include x-small()
        padding: $small_space
      h3
        color: $black_color
      #inputEmail,#inputPassword
        letter-spacing: 1px
        border: 1px solid $secondary_color
      button
        margin-top: $medium_space
        @include button()
          border: 1.5px solid rgba($primary_color, 0.7)
          &:hover
            background-color: rgba($primary_color, 0.7)
            color: $black_color
</style>
