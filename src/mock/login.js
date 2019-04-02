// import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    code: 0,
    msg: '成功',
    data: {
      roles: ['admin'],
      admin: true,
      name: '测试',
      erp: 'mayongze',
      email: 'mayongze@jd.com',
      mobile: '157****5406',
      department: '京东集团-京东云事业部-产品研发部-中间件产品研发部-中间件SRE部',
      positionName: '运营支持工程师',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  },
  editor: {
    roles: ['editor'],
    admin: false,
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    if (userMap['admin']) {
      return userMap['admin']
    } else {
      return false
    }
  },
  logout: () => {
    return {
      code: 0,
      msg: '成功',
      data: {}
    }
  },
  getTicket: config => {
    return {
      code: 0,
      msg: '成功',
      data: { 'ticket': 'bbbbbbbbbbbbbbbbbbbbbbbbbb' }
    }
  }
}
