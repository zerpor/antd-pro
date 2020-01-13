import React from 'react';
import { InputNumber } from 'antd';

function formatterFn(value) {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function parserFn(value) {
  return value.replace(/\$\s?|(,*)/g, '');
}

export interface InputNumberProps {
  disabled?: boolean;
  max?: number;
  min?: number;
}

class InputNumberPlus extends React.PureComponent<InputNumberProps> {
  render(): React.ReactNode {
    return <InputNumber {...this.props} style={{ width: '100%' }} />;
  }
}

InputNumberPlus.defaultProps = {
  min: 0,
  formatter: formatterFn,
  parser: parserFn,
};

export default InputNumberPlus;
