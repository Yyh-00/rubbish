const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  identity: state => state.user.identity, // 身份码
  // avatar: state => state.user.userInfo.staffPhoto0,
  // name: state => state.user.userInfo.username,
  // userId: state => state.user.userInfo.userId,
  userService: state => state.user.userService,
  userAccount: state => state.user.account
}
export default getters
