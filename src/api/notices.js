import service from "@/utils/request";
/**
 * 编辑课程
 */

/**
 * 获取公告
 */
export function GetNotice(id) {
  return service.request({
    method: "get",
    url: `/notices/${id}`
  });
}

/**
 * 添加公告
 */
export function AddNotice(data) {
  return service.request({
    method: "post",
    url: "/notices",
    data
  });
}

/*
 * 修改公告
 */
export function EditNotice(id, data) {
  return service.request({
    method: "put",
    url: `/notices/${id}`,
    data
  });
}

/*
 * 删除公告
 */
export function DeleteNotice(id) {
  return service.request({
    method: "delete",
    url: `/notices/${id}`
  });
}
