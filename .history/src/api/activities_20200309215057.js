/**
 * 全部活动
 */
import service from "@/utils/request";

/**
 * 通过班级id获取测验
 */
export function GetTests(id) {
  return service.request({
    method: "get",
    url: `/tests/${id}`
  });
}

/**
 * 通过id获取测验
 */
export function GetTest(id) {
  return service.request({
    method: "get",
    url: `/test/${id}`
  });
}

/**
 * 添加测验
 */
export function AddTest(data) {
  return service.request({
    method: "post",
    url: `/test`,
    data
  });
}

/**
 * 编辑测验
 */
export function EditTest(id, data) {
  return service.request({
    method: "put",
    url: `/test/${id}`,
    data
  });
}

/**
 * 删除测验
 */
export function DeleteTest(id) {
  return service.request({
    method: "delete",
    url: `/test/${id}`
  });
}

/**
 * 老师-创建测验记录
 */
export function AddTestRecord(data) {
  return service.request({
    method: "post",
    url: `/test/record`,
    data
  });
}

/**
 * 学生-获取所有测验记录
 */
export function GetTestRecords(id) {
  return service.request({
    method: "get",
    url: `/records/${id}`
  });
}

/**
 * 学生-加入测验
 */
export function StudentAddTestRecord(id, data) {
  return service.request({
    method: "post",
    url: `/test/record/student${id}`,
    data
  });
}

/**
 * 学生-开始测验
 */
export function GetTestRecord(studentData) {
  return service.request({
    method: "get",
    url: `/test/record/student`,
    params: studentData
  });
}

/**
 * 学生-提交测验
 */
export function PostTestRecord(id,data) {
  return service.request({
    method: "post",
    url: `/test/record/student/${id}`,
    data
  });
}

/**
 * 学生-获取测验成绩
 */
export function PostTestRecord(id,data) {
  return service.request({
    method: "post",
    url: `/test/record/student/${id}`,
    data
  });
}

