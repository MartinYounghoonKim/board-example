import {
  FETCH_POST_LIST,
  FETCH_POST,
  SET_ACCESS_TOKEN,
} from './mutations-types'
import api from '@/api'

export default {
  [FETCH_POST_LIST] (state, posts) {
    state.posts = posts
  },
  [FETCH_POST] (state, post) {
    state.post = post
  },
  [SET_ACCESS_TOKEN] (state, accessToken) {
    console.log(accessToken)
  },
  [SET_ACCESS_TOKEN] (state, accessToken) {
    if (accessToken) {
      state.accessToken = accessToken
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }
  }
}
