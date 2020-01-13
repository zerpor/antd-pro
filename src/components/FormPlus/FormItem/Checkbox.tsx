import React from 'react';
import { Checkbox } from 'antd';

export interface CheckboxProps {
  disabled?: boolean;
}

class CheckboxPlus extends React.PureComponent<CheckboxProps> {
  render(): React.ReactNode {
    const { value, ...otherProps } = this.props;

    return <Checkbox {...otherProps} checked={value} />;
  }
}

export default CheckboxPlus;
