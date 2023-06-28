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
}
// 活动创建
export const create = (params: Activity.ActivityReqForm) => {
  return axios.post<Activity.ActivityResData>('/project/add', params);
}
export const getActList = () => {
  return axios.post<Activity.ActivityResData>('/project/getList');
}