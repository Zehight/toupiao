import axios from './'
namespace File {
  // 文件上传表单
  export interface FileReqForm {
    file: File;
  }
  // 上传成功后返回的token
  export interface FileResData {
    token: string;
  }
}
axios.service.interceptors.request.use((res:any) => {
  res.headers.common['Content-Type'] = 'multipart/form-data'
  return res;
});
// 文件上传
export const upload = (params: File.FileReqForm) => {
  // 返回的数据格式可以和服务端约定
  return axios.post<File.FileResData>('/file/add', params);
}