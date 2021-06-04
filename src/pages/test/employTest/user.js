export const TEST_USER_KEY = 'test_user_key'
export const TEST_PRO_KEY = 'test_pro_key'

export const USER_LIST = [
  {
    name: '学生-甲',
    key: 'student-A',
    permission: ['apply', ],// todo 删除不应该把整个删掉。学生应该有的是撤回次数
  },
  {
    name: '老师-甲',
    key: 'teacher-A',
    permission: []
  },
  {
    name: '用工方',
    key: 'employer',
    permission: ['add', 'delete', 'employ']
  },
  {
    name: '处长',
    key: 'director',
    permission: ['add',]
  },
  {
    name: '管理员',
    key: 'admin',
    permission: []
  }
]
