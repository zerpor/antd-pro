import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import uuidv4 from 'uuid-v4';
import { Button } from 'antd';
import { Dispatch, AnyAction } from 'redux';
import { PROFESSION } from '../utils/constant';
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

    const addProfessionItem = {
      ...PROFESSION,
      id: uuidv4(),
      schoolId,
      collegeId,
      professionNo,
    };

    dispatch({
      type: 'school/addProfessionItem',
      payload: {
        collegeId,
        addProfessionItem,
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
        <Button onClick={this.handleAdd}>Add Profession</Button>
      </div>
    );
  }
}

export default connect()(ProfessionList);
