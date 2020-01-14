import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import uuidv4 from 'uuid-v4';
import { Dispatch, AnyAction } from 'redux';
import { COLLEGE, PROFESSION, CLASSGRADE } from '../utils/constant';
import AddButton from './components/AddButton';
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
    const collegeId = uuidv4();
    const professionId = uuidv4();
    const classId = uuidv4();

    const addClassGradeItem = {
      ...CLASSGRADE,
      id: classId,
      schoolId,
      collegeId,
      professionId,
    };

    const addProfessionItem = {
      ...PROFESSION,
      id: professionId,
      schoolId,
      collegeId,
      professionNo: 1,
      classGradeList: [classId],
    };

    const addCollegeItem = {
      ...COLLEGE,
      id: collegeId,
      schoolId,
      collegeNo,
      professionList: [professionId],
    };

    dispatch({
      type: 'school/addCollegeItem',
      payload: {
        addCollegeItem,
        addProfessionItem,
        addClassGradeItem,
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
        <AddButton clickCallback={this.handleAdd} text="College" />
      </div>
    );
  }
}

export default connect(({ school }) => ({
  collegeList: school?.schoolDetail?.collegeList,
  schoolId: school?.schoolDetail?.id,
}))(CollegeList);
