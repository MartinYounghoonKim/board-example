<template>
  <div class="post-view-page">
    <post-view v-if="post" :post="post"/>
    <p v-else>게시글 불러오는 중...</p>
    <router-link :to="{ name: 'PostEditPage', params: { postId } }">수정</router-link>
    <button @click="onDelete">삭제</button>
    <router-link :to="{ name: 'PostListPage' }">목록</router-link>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import PostView from '@/components/PostView'
  import api from '@/api'

  export default {
    name: 'PostViewPage',
    components: { PostView },
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
      onDelete () {
        const { id } = this.post
        api.delete(`/posts/${id}`)
          .then(res => {
            // 3. 게시글 삭제 성공시, 성공에 대한 메세지를 노출한다.
            alert('게시물이 성공적으로 삭제되었습니다.')
            // 4. 더이상 노출된 메세지가 없기 때문에 리스트 페이지로 이동시킨다.
            this.$router.push({ name: 'PostListPage' })
          })
          .catch(err => {
            if (err.response.status === 401) {
              // 1. HTTP 상태가 401인 경우 경고 메세지를 노출한다.
              alert('로그인이 필요합니다.')
              // 2. 메세지 노출 후 로그인 페이지로 보낸다.
              this.$router.push({ name: 'Signin' })
            } else {
              // HTTP 상태코드가 401이 아닌 경우 서버에서 내려준 메세지를 노출시켜준다.
              alert(err.response.data.msg)
            }
          })
      },
      ...mapActions([ 'fetchPost' ])
    }
  }
</script>
