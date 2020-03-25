import service from "@/utils/request";
/**
 * 获取验证码
 */
export function GetSms(data) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data: data
  });
}

/**
 * 获取用户角色
 */

/**
 * 登录
 */
export function Login(data) {
  return service.request({
    method: "post",
    url: "/login",
    data
  });
}

/**
 * 注册
 */
export function Register(data) {
  return service.request({
    method: "post",
    url: "/register",
    data
  });
}

/**
 * 通过id获取用户信息
 */
export function GetUser(id) {
  return service.request({
    method: "get",
    url: `/user/${id}`
  });
}

/**
 * 编辑-通过id获取用户信息
 */
export function EditUser(id, data) {
  return service.request({
    method: "put",
    url: `/user/${id}`,
    data
  });
}
