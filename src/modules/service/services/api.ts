import axios from '@/modules/service/axios'

/* 示例 */
export const getCompanyList = (searchInfo: any) => axios.post('/company/getList', searchInfo)



