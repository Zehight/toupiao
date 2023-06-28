import axios from './'
namespace Role {
  // 角色上传表单
  export interface RoleReqForm {
    code: Uppercase<string>;
    zone: Uppercase<string>;
    name: string;
    official: [string] | [string, string];
    originalName?: string;
    frontImg: string;
  }
  // 上传成功后返回的token
  export interface RoleResData {
    token: string;
  }
}
// 角色上传
export const create = (params: Role.RoleReqForm) => {
  return axios.post<Role.RoleResData>('/role/add', params);
}
export const getActList = () => {
  return axios.post<Role.RoleResData>('/role/getList');
}
export const addRoleImg = (roleID: string, imgID: string) => {
  return axios.post<Role.RoleResData>('/roleFrontImg/add', { roleID, fileID: imgID });
}
export const getListRoleImg = (roleID: string) => {
  return axios.post<Role.RoleResData>('/roleFrontImg/getList', { roleID });
}