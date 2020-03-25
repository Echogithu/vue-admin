import service from "@/utils/request";

/**
 * 获取班级学生信息
 * @param  classID
 */
export function GetClassStudents(classID) {
  return service.request({
    method: "get",
    url: "/students",
    params: {
      classID
    }
  });
}

/**
 * 删除班级中某个学生
 * @param {*} id
 * @param {*} classID
 */
export function DeleteClassStudent(id, classID) {
  return service.request({
    method: "delete",
    url: `/classes/student/${id}`,
    params: {
      classID,
      id
    }
  });
}

/**
 * 通过班级暗号查找班级
 * @param {} id
 * @param {*} classID
 */
export function findClassByCode(code) {
  return service.request({
    method: "get",
    url: `/class/${code}`
  });
}

/**
 * 通过班级暗号添加学生
 * @param {} id
 * @param {*} classID
 */
export function addClassStudent(data) {
  return service.request({
    method: "post",
    url: `/classes/student`,
    data
  });
}
