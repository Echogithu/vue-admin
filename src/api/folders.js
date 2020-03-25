import service from "@/utils/request";

/**
 * ????
 */
export function DeleteFolder(data, id) {
  return service.request({
    method: "delete",
    url: `/upload/${id}`,
    data
  });
}
