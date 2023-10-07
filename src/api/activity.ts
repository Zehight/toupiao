import axios from './'
namespace Activity {
  // 活动创建表单
  export interface ActivityReqForm {
    name: string;
    startTime: string;
    endTime: string;
    frontImg: string;
    remark?: string;
  }
  // 创建成功后返回的token
  export interface ActivityResData {
    token: string;
  }
  export type ActivityList = Array<ActivityReqForm>
}
// 活动创建
export const create = (params: Activity.ActivityReqForm) => {
  return axios.post<Activity.ActivityResData>('/project/add', params);
}
export const delAct = (id:string) => {
  return axios.post<Activity.ActivityResData>('/project/delInfo', {id});
}
export const getActList = () => {
  return axios.post<Activity.ActivityList>('/project/getList');
}
export const getActInfo = (id: string) => {
  return axios.post<Activity.ActivityReqForm>('/project/getInfo',{id});
}