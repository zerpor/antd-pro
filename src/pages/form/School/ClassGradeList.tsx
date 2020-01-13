import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import uuidv4 from 'uuid-v4';
import { Button } from 'antd';
import { Dispatch, AnyAction } from 'redux';
import { CLASSGRADE } from '../utils/constant';
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
      <div>
        {lodash.isArray(classGradeList) &&
          classGradeList.map(item => (
            <ClassGradeListItem key={item} total={classGradeList.length} classId={item} />
          ))}
        <Button onClick={this.handleAdd}>Add Class</Button>
      </div>
    );
  }
}

export default connect()(ClassGradeList);
