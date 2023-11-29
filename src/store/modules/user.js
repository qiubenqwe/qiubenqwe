import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'

// 定义模块状态
const state = {
  token: getToken(), // 从缓存中读取初始值
  userInfo: {} // 存储用户资料
}

// 定义模块mutations
const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken() {
    // 删除Vuex的token
    state.token = null
    removeToken()
  },
  /**
 * 设置用户信息
 * @param {object} state - 状态对象
 * @param {object} userInfo - 用户信息
 */
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

// 定义模块actions
const actions = {
  // context上下文，传入参数
  async login(context, data) {
    console.log(data)
    // todo: 调用登录接口
    const token = await login(data)
    // 返回一个token 123456
    context.commit('setToken', token)
  },
  // 异步获取用户信息
  async getUserInfo(context) {
    const userInfo = await getUserInfo() // 调用getUserInfo函数获取用户信息
    context.commit('setUserInfo', userInfo) // 使用context对象调用commit方法，将获取到的用户信息存储到状态中
  }
}

// 导出模块对象
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
