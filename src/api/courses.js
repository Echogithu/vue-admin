import service from "@/utils/request";
/**
 * 编辑课程
 */

/**
 * 获取课程列表
 */
export function GetCourses(userID) {
  return service.request({
    method: "get",
    url: "/courses",
    params: {
      userID
    }
  });
}

/**
 * 根据id获取课程列表
 */
export function GetCourse(id) {
  return service.request({
    method: "get",
    url: `/courses/${id}`
  });
}

/**
 * 添加课程
 */
export function AddCourse(data) {
  return service.request({
    method: "post",
    url: `/courses`,
    data
  });
}

/**
 * 编辑课程
 */
export function EditCourse(id, data) {
  return service.request({
    method: "put",
    url: `/courses/${id}`,
    data
  });
}

/**
 * 删除课程
 */
export function DeleteCourse(data) {
  return service.request({
    method: "delete",
    url: `/courses/${data}`
  });
}

/**
 * 根据班级id获取班级
 */
export function GetClass(id) {
  return service.request({
    method: "get",
    url: `/classes/${id}`
  });
}

/**
 * 通过user找班级
 * @param {} id
 * @param {*} classID
 */
export function GetClassesByUser(id) {
  return service.request({
    method: "get",
    url: `/user/classes/${id}`
  });
}

/**
 * 添加班级
 */
export function AddClass(data) {
  return service.request({
    method: "post",
    url: `/classes`,
    data
  });
}

/**
 * 编辑班级
 */
export function EditClass(id, data) {
  return service.request({
    method: "put",
    url: `/classes/${id}`,
    data
  });
}

/**
 * 删除班级
 */
export function DeleteClass(data) {
  return service.request({
    method: "delete",
    url: `/classes/${data}`
  });
}
