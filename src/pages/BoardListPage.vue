<template>
  <div class="board-list-page">
    <h1>포스트 게시글</h1>
    <board-list :posts="posts"/>
  </div>
</template>

<script>
  import BoardList from '@/components/BoardList'
  import api from '@/api'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'BoardListPage',
    components: { BoardList },
    computed: {
      ...mapState([ 'posts' ])
    },
    created () {
      this.fetchPostList()
    },
    methods: {
      ...mapActions(['fetchPostList'])
    }
  }
</script>
