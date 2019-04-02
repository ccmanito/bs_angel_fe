const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  usertype: state => state.user.usertype,
  roles: state => state.user.roles,
  userInfo: state => state.user,
  permission_routers: state => state.permission.routers,
  visitedViews: state => state.tagsView.visitedViews,
  addRouters: state => state.permission.addRouters
}

export default getters
