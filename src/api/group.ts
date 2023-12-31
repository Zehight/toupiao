import axios from './'
namespace Group {
  // 活动创建表单
  export interface GroupReqForm {
    name: string;
    roundId: string;
    voteNum: string;
    promotedNum: string;
  }
  // 创建成功后返回的token
  export interface GroupResData {
    token: string;
  }
}
// 活动创建
export const add = (params: Group.GroupReqForm) => {
  return axios.post<Group.GroupResData>('/group/add', params);
}
export const delGroup = (id:string) => {
  return axios.post<Group.GroupResData>('/group/delInfo', {id});
}
export const getGroupList = (id: string) => {
  return axios.post<Group.GroupResData>('/group/getList', { id });
}
export const addRoleToGroup = (groupId: string, roleId: string) => {
  return axios.post<Group.GroupResData>('/roleInGroup/add', { groupId, roleId });
}