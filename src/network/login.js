import { request } from 'network/request';
// 发送注册用验证码
export function sendverifycode(data) {
    console.log(data);
  return request({
    url: 'http://localhost:1000/api/sendverifycode',
    method: 'post',
    data
  })
}
// 条件注册信息
export function register(data) {
    console.log(data);
  return request({
    url: 'http://localhost:1000/api/register',
    method: 'post',
    data
  })
}
// 检查用户账号是否存在
export function checkUserIsHave(data) {
    console.log(data);
  return request({
    url: 'http://localhost:1000/api/checkuserishave',
    method: 'post',
    data
  })
}
// 发送用户使用的验证码
export function sendusercode(data) {
    console.log(data);
  return request({
    url: 'http://localhost:1000/api/sendusercode',
    method: 'post',
    data
  })
}
// 更新密码
export function updatepassworde(data) {
    console.log(data);
  return request({
    url: 'http://localhost:1000/api/updatepassword',
    method: 'post',
    data
  })
}
// 邮箱登录
export function emaillogin(data) {
    console.log(data);
  return request({
    url: 'api/emaillogin',
    method: 'post',
    data
  })
}
// 密码登录
export function pwlogin(data) {
    console.log(data);
  return request({
    url: 'api/pwlogin',
    method: 'post',
    data
  })
}
// 短信登录
export function iphonelogin(data) {
    console.log(data);
  return request({
    url: 'api/iphonelogin',
    method: 'post',
    data
  })
}
