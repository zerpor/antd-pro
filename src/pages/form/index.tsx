import React, { PureComponent } from 'react';
import { Button, message } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, AnyAction } from 'redux';
import PageLoading from '@/components/PageLoading';
import SchoolInfo from './School/SchoolInfo';
import Principal from './School/Principal';
import CollegeList from './School/CollegeList';

export interface IProps {
  dispatch: Dispatch<AnyAction>;
  form: FormComponentProps['form'];
}

class Navigator extends PureComponent<IProps> {
  componentDidMount() {
    this.fetchTask();
  }

  fetchTask = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'school/getSchool',
      payload: {
        schoolId: '001',
      },
    });
  };

  submit = async () => {
    const { dispatch } = this.props;

    const response = await dispatch({
      type: 'school/submitSchool',
    });

    if (response && response.success) {
      message.success('Submit successfully');
    }
  };

  render() {
    const { loadingOfGetSchool } = this.props;

    return (
      <>
        {loadingOfGetSchool ? (
          <PageLoading />
        ) : (
          <div>
            <SchoolInfo />
            <Principal />
            <CollegeList />
            <Button onClick={this.submit}>提交</Button>
          </div>
        )}
      </>
    );
  }
}

export default connect(({ loading }) => ({
  loadingOfGetSchool: loading.effects['school/getSchool'],
}))(Navigator);
