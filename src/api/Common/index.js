import service from "../index";

//上传文件
export function getImages(data) {
  return service({
    url: "/images",
    method: "get",
    params: data
  });
}

//上传文件
export function UploadFn(data) {
  if (!data.file) {
    return Promise.reject("请选择文件");
  }
  const fd = new FormData();
  fd.append("file", data.file);
  return service({
    headers: {
      "Content-Type": "application/form-data;charset=UTF-8"
    },
    url: "/upload",
    method: "post",
    data: fd
  });
}
