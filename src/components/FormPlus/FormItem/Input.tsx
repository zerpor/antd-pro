import React from 'react';
import { Input } from 'antd';

export interface InputProps {
  disabled?: boolean;
  maxLength?: number;
  allowClear?: boolean;
}

class InputPlus extends React.PureComponent<InputProps> {
  render(): React.ReactNode {
    const { value } = this.props;

    return <Input {...this.props} title={value} />;
  }
}

InputPlus.defaultProps = {
  allowClear: true,
};

export default InputPlus;
