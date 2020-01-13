import React from 'react';
import { DatePicker } from 'antd';
// import { removeUndefined } from '../index';

export interface DatePickerProps {
  disabled?: boolean;
  mode?: string;
  format?: string;
}

const setDisabledDate = date => {
  const startDate = new Date('1900-01-01T00:00:00').getTime();
  return date.valueOf() > Date.now() || date.valueOf() < startDate;
};

class DatePickerPlus extends React.PureComponent<DatePickerProps> {
  render(): React.ReactNode {
    return <DatePicker {...this.props} style={{ width: '100%' }} />;
  }
}

DatePickerPlus.defaultProps = {
  format: 'YYYY-MM-DD',
  disabledDate: setDisabledDate,
};

export default DatePickerPlus;
