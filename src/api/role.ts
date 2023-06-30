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
  export interface RoleListData {
    list: Array<RoleReqForm>;
  }
  export type RoleImgList = Array<string>
}
// 角色上传
export const create = (params: Role.RoleReqForm) => {
  return axios.post<Role.RoleResData>('/role/add', params);
}
export const getRoleList = () => {
  return axios.post<Role.RoleListData>('/role/getList');
}
export const getRoleInfo = (id: string) => {
  return axios.post<Role.RoleReqForm>('/role/getInfo',{id});
}
export const addRoleImg = (roleId: string, imgId: string) => {
  return axios.post<Role.RoleResData>('/roleFrontImg/add', { roleId, fileId: imgId });
}
export const getRoleImgList = (roleId: string) => {
  return axios.post<Role.RoleImgList>('/roleFrontImg/getList', { roleId });
}