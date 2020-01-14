import moment from 'moment';

const compareCurrenthourTargethour = (currentTime, targetTime, granularity = 'day') => {
  if (currentTime && targetTime) {
    return moment(currentTime).isBefore(targetTime, granularity);
  }
  return false;
};

/**
 * 学院的创建时间不能早于学校的创建时间
 * @param foundingTime 学校的创建时间
 */
export const rule001 = (foundingTime: any) => (rule: any, value: any, callback: Function) => {
  if (compareCurrenthourTargethour(value, foundingTime)) {
    callback('学院的创建时间不能早于学校的创建时间');
  }
  callback();
};
