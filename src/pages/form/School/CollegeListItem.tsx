import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import CollegeListItemInfo from './CollegeListItemInfo';
import ProfessionList from './ProfessionList';

export interface IProps {
  schoolId: string;
  collegeId: string;
  professionList: string[];
  total: number;
}

class CollegeListItem extends PureComponent<IProps> {
  render() {
    const { schoolId, collegeId, professionList } = this.props;

    return (
      <Row type="flex" gutter={16}>
        <Col span={8}>
          <CollegeListItemInfo collegeId={collegeId} />
        </Col>
        <Col span={16}>
          <ProfessionList
            schoolId={schoolId}
            collegeId={collegeId}
            professionList={professionList}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(({ school }, { collegeId }) => ({
  schoolId: school?.entities?.collegeListMap[collegeId].schoolId,
  professionList: school?.entities?.collegeListMap[collegeId].professionList,
}))(CollegeListItem);
