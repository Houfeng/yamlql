import { action } from '../src';
const debug = require('debug')('mock');

const roles = [
  { name: '超级管理员', id: 0 },
  { name: '管理员', id: 1 },
  { name: '普通用户', id: 2 }
];

const users = [
  { name: '张三', age: 25, roles: [0, 1, 2] },
  { name: '李四', age: 26, roles: [1, 2] },
  { name: '王五', age: 27, roles: [1] },
  { name: '赵六', age: 28, roles: [2] }
];

export default class Demo {
  @action({
    summary: '查询用户列表',
    params: [{ name: 'keyword', summary: '查询关键词' }]
  })
  getUsers(keyword: string) {
    debug('getUsers', keyword);
    return users.filter(item => item.name.includes(keyword));
  }
  getUser(name: string) {
    debug('getUser', name);
    return users.find(item => item.name == name);
  }
  getRole(id: number) {
    debug('getRole', id);
    return roles.find(item => item.id == id);
  }
}