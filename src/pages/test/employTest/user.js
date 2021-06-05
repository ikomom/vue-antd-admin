export const TEST_USER_KEY = 'test_user_key'
export const TEST_PRO_KEY = 'test_pro_key'
export const TEST_APPLY_KEY = 'test_apply_key'

// 角色
export const ROLES_MAP = {
  admin: {
    name: '管理员',
    key: 'admin',
    permission: []
  },
  director: {
    name: '处长',
    key: 'director',
    permission: ['work:add', 'work:delete', 'apply:employ']
  },
  employer: {
    name: '用工方',
    key: 'employer',
    permission: ['work:add', 'work:delete', 'apply:employ']
  },
  teacher: {
    name: '老师',
    key: 'teacher',
    permission: ['apply:apply', 'apply:delete']
  },
  student: {
    name: '学生',
    key: 'student',
    permission: ['apply:apply', 'apply:delete'],
  }
}
// 用户
export const USER_LIST = [
  {
    name: '小明',
    key: 'student-xiaoming',
    role: [ROLES_MAP.student]
  },
  {
    name: '小红',
    key: 'student-xiaohong',
    role: [ROLES_MAP.student]
  },
  {
    name: '杨老师',
    key: 'teacher-yang',
    role: [ROLES_MAP.teacher]
  },
  {
    name: '图书馆',
    key: 'employer-book',
    role: [ROLES_MAP.employer]
  },
  {
    name: '王处长',
    key: 'director-wang',
    role: [ROLES_MAP.director]
  },
  {
    name: '管理员',
    key: 'admin',
    role: [ROLES_MAP.admin]
  }
]

export const WORK_STATUS = [
  {title: '未录用', value: 0},
  {title: '在职', value: 1},
  {title: '离职', value: 2},
]

export const APPLY_STATUS = [
  {title: '用人单位审核', value: 0},
  {title: '通过', value: 1},
  {title: '已撤回', value: 2},
  {title: '未通过', value: 3},
]

export const TASK_STATUS = [
  {title: '开启', value: 0},
  {title: '关闭', value: 1},
]
