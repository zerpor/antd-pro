import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import uuidv4 from 'uuid-v4';
import { Dispatch, AnyAction } from 'redux';
import { CLASSGRADE } from '../utils/constant';
import AddButton from './components/AddButton';
import ClassGradeListItem from './ClassGradeListItem';

export interface IProps {
  schoolId: string;
  collegeId: string;
  professionId: string;
  classGradeList: string[];
  dispatch: Dispatch<AnyAction>;
}

class ClassGradeList extends PureComponent<IProps> {
  handleAdd = () => {
    const { dispatch, professionId, collegeId, schoolId }: any = this.props;
    const addClassGradeItem = {
      ...CLASSGRADE,
      id: uuidv4(),
      schoolId,
      collegeId,
      professionId,
    };

    dispatch({
      type: 'school/addClassGradeItem',
      payload: {
        professionId,
        addClassGradeItem,
      },
    });
  };

  render() {
    const { classGradeList }: any = this.props;

    return (
      <>
        {lodash.isArray(classGradeList) &&
          classGradeList.map(item => (
            <ClassGradeListItem key={item} total={classGradeList.length} classId={item} />
          ))}
        <AddButton clickCallback={this.handleAdd} text="Class" />
      </>
    );
  }
}

export default connect()(ClassGradeList);
