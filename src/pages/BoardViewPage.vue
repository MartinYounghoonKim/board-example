<template>
  <div class="board-view-page">
    <board-view v-if="post" :post="post"/>
    <p v-else>게시글 불러오는 중...</p>
    <router-link :to="{ name: 'BoardListPage' }">목록</router-link>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import BoardView from '@/components/BoardView'

  export default {
    name: 'BoardViewPage',
    components: { BoardView },
    props: {
      postId: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapState([
        'post'
      ])
    },
    created () {
      this.fetchPost(this.postId)
        .catch(err => {
          alert(err.response.data.msg)
          this.$router.back()
        })
    },
    methods: {
      ...mapActions([ 'fetchPost' ])
    }
  }
</script>
