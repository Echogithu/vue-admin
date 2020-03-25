/* 
过滤特殊字符：
*/
export function stripscript(str) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

/**
 * 验证邮箱
 */
export function validateEmail(value) {
  // eslint-disable-next-line no-useless-escape
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

  return !reg.test(value) ? true : false;
  // if (!reg.test(value)) {
  //   return true;
  // } else {
  //   return false;
  // }
}

/**
 * 验证密码 6-20位字母加数字
 */
export function validatePass(value) {
  //字母+数字
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return !reg.test(value) ? true : false;
}

/**
 * 验证验证码
 */
export function validateVCode(value) {
  // 字母 或 数字
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value) ? true : false;
}

/**
 * 验证手机号码
 */

export function validatePhone(value) {
  let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  return !reg.test(value) ? true : false;
}
