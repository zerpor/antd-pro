import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import uuidv4 from 'uuid-v4';
import { Dispatch, AnyAction } from 'redux';
import { PROFESSION, CLASSGRADE } from '../utils/constant';
import AddButton from './components/AddButton';
import ProfessionListItem from './ProfessionListItem';

export interface IProps {
  schoolId: string;
  collegeId: string;
  professionList: string[];
  dispatch: Dispatch<AnyAction>;
}

class ProfessionList extends PureComponent<IProps> {
  handleAdd = () => {
    const { dispatch, professionList, collegeId, schoolId }: any = this.props;
    let professionNo = 1;
    if (lodash.isArray(professionList)) {
      professionNo = professionList.length + 1;
    }
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
      professionNo,
      classGradeList: [classId],
    };

    dispatch({
      type: 'school/addProfessionItem',
      payload: {
        collegeId,
        addProfessionItem,
        addClassGradeItem,
      },
    });
  };

  render() {
    const { professionList }: any = this.props;

    return (
      <div>
        {lodash.isArray(professionList) &&
          professionList.map(item => (
            <ProfessionListItem key={item} total={professionList.length} professionId={item} />
          ))}
        <AddButton clickCallback={this.handleAdd} text="Profession" />
      </div>
    );
  }
}

export default connect()(ProfessionList);
