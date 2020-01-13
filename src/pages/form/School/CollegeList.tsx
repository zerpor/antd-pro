import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import uuidv4 from 'uuid-v4';
import { Button } from 'antd';
import { Dispatch, AnyAction } from 'redux';
import { COLLEGE } from '../utils/constant';
import CollegeListItem from './CollegeListItem';

export interface IProps {
  schoolId: string;
  collegeList: string[];
  dispatch: Dispatch<AnyAction>;
}

class CollegeList extends PureComponent<IProps> {
  handleAdd = () => {
    const { dispatch, collegeList, schoolId }: any = this.props;
    let collegeNo = 1;
    if (lodash.isArray(collegeList)) {
      collegeNo = collegeList.length + 1;
    }

    const addCollegeItem = {
      ...COLLEGE,
      id: uuidv4(),
      schoolId,
      collegeNo,
    };

    dispatch({
      type: 'school/addCollegeItem',
      payload: {
        addCollegeItem,
      },
    });
  };

  render() {
    const { collegeList } = this.props;

    return (
      <div>
        {lodash.isArray(collegeList) &&
          collegeList.map(item => (
            <CollegeListItem key={item} total={collegeList.length} collegeId={item} />
          ))}
        <Button onClick={this.handleAdd}>Add College</Button>
      </div>
    );
  }
}

export default connect(({ school }) => ({
  collegeList: school?.schoolDetail?.collegeList,
  schoolId: school?.schoolDetail?.id,
}))(CollegeList);
