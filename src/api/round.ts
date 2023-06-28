import axios from './'
namespace Round {
  // 活动创建表单
  export interface RoundReqForm {
    name: string;
    showTime: string;
    startVoteTime: string;
    endVoteTime: string;
    frontImg?: string;
    remark?: string;
  }
  // 创建成功后返回的token
  export interface RoundResData {
    token: string;
  }
}
// 活动创建
export const create = (params: Round.RoundReqForm) => {
  return axios.post<Round.RoundResData>('/round/add', params);
}
export const getRoundList = () => {
  return axios.post<Round.RoundResData>('/round/getList');
}