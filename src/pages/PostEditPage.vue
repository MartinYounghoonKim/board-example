<template>
  <div class="post-edit-page">
    <h1>게시물 수정</h1>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'PostEditPage',
    props: {
      // 라우터의 파라미터를 받아오기 위한 props를 선언해준다.
      postId: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapState([ 'post' ])
    }
  }
</script>
