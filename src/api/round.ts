import axios from './'
namespace Round {
  // 活动创建表单
  export interface RoundReqForm {
    name: string;
    projectId: string;
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
export const delRound = (id:string) => {
  return axios.post<Round.RoundResData>('/round/delInfo', {id});
}
export const getRoundList = (id: string) => {
  return axios.post<Round.RoundResData>('/round/getList', { id });
}
export const getRoundInfo = (id: string) => {
  return axios.post<Round.RoundResData>('/round/getInfo', { id });
}