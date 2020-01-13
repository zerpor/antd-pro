import React, { PureComponent } from 'react';
import { Card, Form } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, AnyAction } from 'redux';
import FormPlus, { Input, InputNumber, Select } from '@/components/FormPlus';
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

const genderDicts = [
  { dictCode: 'M', dictName: '女' },
  { dictCode: 'F', dictName: '男' },
];

class Principal extends PureComponent<IProps> {
  render() {
    const { form } = this.props;

    return (
      <Card title="校长简介">
        <FormPlus form={form} formId="schoolinfo" layoutConfig={layout}>
          <Input label="Name" formName="name" required maxLength={20} />
          <Select label="Gender" formName="gender" required dicts={genderDicts} />
          <InputNumber label="Age" formName="age" required />
          <Input label="Phone No" formName="phoneNo" />
          <Input
            label="Email"
            formName="email"
            rules={[
              {
                type: 'email',
                message: 'The email address you supplied is invalid.',
              },
            ]}
          />
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
        type: 'school/updatePrincipal',
        payload: {
          changedFields,
        },
      });
    }
  },
  mapPropsToFields(props) {
    const { principal } = props;

    return mapObjectToFields(principal, {
      name: (value: string | object) => value,
      gender: (value: string | object) => value,
      age: (value: string | object) => value,
      email: (value: string | object) => value,
      phoneNo: (value: string | object) => value,
      address: (value: string | object) => value,
    });
  },
})(Principal);

export default connect(({ form, school }) => ({
  principal: school?.schoolDetail?.principal,
  validating: form.validating,
}))(WrappedForm);
