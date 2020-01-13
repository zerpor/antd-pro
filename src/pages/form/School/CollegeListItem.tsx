import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import CollegeListItemInfo from './CollegeListItemInfo';
import ProfessionList from './ProfessionList';
import { College } from '../models/school';

export interface IProps {
  collegeId: string;
  collegeItem: College;
  total: number;
}

class CollegeListItem extends PureComponent<IProps> {
  render() {
    const { collegeItem } = this.props;

    return (
      <Row type="flex" gutter={16}>
        <Col span={8}>
          <CollegeListItemInfo collegeItem={collegeItem} />
        </Col>
        <Col span={16}>
          <ProfessionList
            schoolId={collegeItem.schoolId}
            collegeId={collegeItem.id}
            professionList={collegeItem.professionList}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(({ school }, { collegeId }) => ({
  collegeItem: school?.entities?.collegeListMap[collegeId],
}))(CollegeListItem);
