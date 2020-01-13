import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import ProfessionListItemInfo from './ProfessionListItemInfo';
import ClassGradeList from './ClassGradeList';
import { Profession } from '../models/school';

export interface IProps {
  professionId: string;
  professionItem: Profession;
  total: number;
}

class ProfessionListItem extends PureComponent<IProps> {
  render() {
    const { professionItem } = this.props;

    return (
      <Row type="flex" gutter={16}>
        <Col span={12}>
          <ProfessionListItemInfo professionItem={professionItem} />
        </Col>
        <Col span={12}>
          <ClassGradeList
            schoolId={professionItem.schoolId}
            collegeId={professionItem.collegeId}
            professionId={professionItem.id}
            classGradeList={professionItem.classGradeList}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(({ school }, { professionId }) => ({
  professionItem: school?.entities?.professionListMap[professionId],
}))(ProfessionListItem);
