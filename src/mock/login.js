import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    code: 0,
    data: {
      roles: ['admin'],
      token: 'admin',
      introduction: '我是超级管理员',
      name: 'Super Admin'
    }
  },
  editor: {
    code: 0,
    data: {
      roles: ['editor'],
      token: 'editor',
      introduction: '我是编辑',
      name: 'Normal Editor'
    }
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return {
      code: 0,
      data: { token: username }
    }
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      // console.log(token)
      return userMap[token]
    } else {
      return { code: 50008, message: '不存在该用户信息' }
    }
  },
  logout: () => {
    return { code: 0, message: 'success' }
  }
}
