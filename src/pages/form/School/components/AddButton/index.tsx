import React from 'react';
import { Button } from 'antd';

export interface IProps {
  clickCallback: (e: any) => void;
  text: string;
}
const AddButton: React.SFC<IProps> = ({ clickCallback, text }) => (
  <Button type="primary" icon="plus" onClick={clickCallback}>
    {text}
  </Button>
);

export default AddButton;
