import {
  getToken,
  setToken,
  removeToken,
  getIdentity,
  setIdentity,
  removeIdentity,
  getUserService,
  setUserService,
  removeUserService,
  getUserAccount,
  removeUserAccount
} from '@/utils/auth.js'
// import { login, getInfo, getBaseInfo } from '@/api/user'
import { login } from '@/api/user'

// 状态
const state = {
  token: getToken(), // 设置token为共享状态 初始化vuex时 就先从缓存中读取
  identity: getIdentity(),
  account: getUserAccount(),
  userService: JSON.parse(getUserService())
}

// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 将vuex的数据清空
    removeToken()
  },
  setIdentity(state, identity) {
    state.identity = identity // 将数据设置给vuex
    // 同步给缓存
    setIdentity(identity)
  },
  removeIdentity(state) {
    state.identity = null // 将vuex的数据清空
    removeIdentity()
  },
  setUserService(state, userService) {
    state.userService = userService
    setUserService(JSON.stringify(state.userService))
  },
  removeUserService(state) {
    state.userService = null // 将vuex的数据清空
    removeUserService()
  },
  removeUserAccount(state) {
    state.account = null // 将vuex的数据清空
    removeUserAccount()
  }
}

// 异步任务
const actions = {
  async login(context, data) {
    // 调用api接口
    const { data: res } = await login(data)
    context.commit('setUserService', res.data)
    context.commit('setToken', res.token)
    context.commit('setIdentity', res.identity)
  },
  logout(context) {
    context.commit('removeToken')
    context.commit('removeIdentity')
    context.commit('removeUserService')
    context.commit('removeUserAccount')
    // context.commit(' removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
