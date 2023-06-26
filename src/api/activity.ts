import axios from './'
namespace Activity {
  // 活动创建表单
  export interface ActivityReqForm {
    name: string;
    startTime: string;
    endTime: string;
    frontImg: number;
    remark: string;
  }
  // 登录成功后返回的token
  export interface ActivityResData {
    token: string;
  }
}
// 用户登录
export const create = (params: Activity.ActivityReqForm) => {
  // 返回的数据格式可以和服务端约定
  return axios.post<Activity.ActivityResData>('/project/add', params);
}