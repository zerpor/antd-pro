import React from 'react';
import { Button } from 'antd';

export interface IProps {
  clickCallback: (e: any) => void;
}
const DeleteButton: React.SFC<IProps> = ({ clickCallback }) => (
  <Button type="primary" size="small" shape="circle-outline" icon="close" onClick={clickCallback} />
);

export default DeleteButton;
