import React, { PureComponent } from 'react';
import { Card, Form } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, AnyAction } from 'redux';
import moment from 'moment';
import FormPlus, { Input, InputNumber, Select, DatePicker } from '@/components/FormPlus';
import { shouldUpdateStore, mapObjectToFields } from '../utils/formUtils';

export interface IProps {
  dispatch: Dispatch<AnyAction>;
  form: FormComponentProps['form'];
}

const layout = {
  default: {
    xs: { span: 4 },
    sm: { span: 4 },
    md: { span: 4 },
    lg: { span: 4 },
  },
};

const degreeDicts = [
  { dictCode: 'C', dictName: '大学' },
  { dictCode: 'H', dictName: '高中' },
  { dictCode: 'J', dictName: '初中' },
  { dictCode: 'P', dictName: '小学' },
  { dictCode: 'K', dictName: '幼儿园' },
];

class SchoolInfo extends PureComponent<IProps> {
  validate001 = () => (rule: any, value: any, callback: Function) => {
    if (value === 'qq') {
      callback('错误');
    }
    callback();
  };

  render() {
    const { form } = this.props;

    return (
      <Card title="学校信息">
        <FormPlus form={form} formId="schoolinfo" layoutConfig={layout}>
          <Input label="School Name" formName="name" required maxLength={20} />
          <Select
            label="Degree Of Education"
            formName="degreeEducation"
            required
            dicts={degreeDicts}
          />
          <DatePicker label="Founding Year" formName="foundingTime" required />
          <InputNumber label="College Amount" formName="collegeAmount" required />
          <Input label="School Motto" formName="schoolMotto" />
          <Input label="Address" formName="address" maxLength={60} />
        </FormPlus>
      </Card>
    );
  }
}

const WrappedForm = Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;

    if (shouldUpdateStore(validating, changedFields)) {
      dispatch({
        type: 'school/updateSchool',
        payload: {
          changedFields,
        },
      });
    }
  },
  mapPropsToFields(props) {
    const { schoolDetail } = props;

    return mapObjectToFields(schoolDetail, {
      name: (value: string | object) => value,
      degreeEducation: (value: string | object) => value,
      address: (value: string | object) => value,
      schoolMotto: (value: string | object) => value,
      foundingTime: (value: string | object) => (value ? moment(value) : null),
      collegeAmount: (value: string | object) => value,
    });
  },
})(SchoolInfo);

export default connect(({ form, school }) => ({
  schoolDetail: school.schoolDetail,
  validating: form.validating,
}))(WrappedForm);
