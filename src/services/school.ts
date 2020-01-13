import request from '@/utils/request';

export interface ParamsType {
  schoolId: string;
}

export async function getSchool(params: ParamsType) {
  return request('/api/form/school/getSchool', {
    method: 'POST',
    data: params,
  });
}

export async function submitSchool(params: ParamsType) {
  return request('/api/form/school/submitSchool', {
    method: 'POST',
    data: params,
  });
}
