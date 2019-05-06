<template>
  <div class="app-header">
    <h1>Community</h1>
    <div v-if="isAuthorized">
      <strong>
        <button @click="toggle">{{ me.name }}님 환영합니다.
          <i v-if="!isActiveBox" class="fas fa-sort-down"></i>
          <i v-else class="fas fa-sort-up"></i>
        </button>
      </strong>
      <ul v-if="isActiveBox">
        <li><button @click="onClickSignout">로그아웃</button></li>
      </ul>
    </div>
    <div v-else>
      <router-link :to="{ name: 'Signin' }">로그인</router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  export default {
    name: 'AppHeader',
    data () {
      return {
        isActiveBox: false
      }
    },
    computed: {
      ...mapGetters([ 'isAuthorized' ]),
      ...mapState([ 'me' ])
    },
    methods: {
      toggle () {
        this.isActiveBox = !this.isActiveBox
      },
      onClickSignout () {
        this.signout()
        this.$router.push({ name: 'BoardListPage' })
      },
      ...mapActions([ 'signout' ])
    }
  }
</script>
