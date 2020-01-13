import React, { PureComponent } from 'react';
import { Card, Form, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, AnyAction } from 'redux';
import FormPlus, { Input, InputNumber, DatePicker } from '@/components/FormPlus';
import { shouldUpdateStore, mapObjectToFields } from '../utils/formUtils';

export interface IProps {
  dispatch: Dispatch<AnyAction>;
  form: FormComponentProps['form'];
}

const layout = {
  default: {
    xs: { span: 12 },
    sm: { span: 12 },
    md: { span: 12 },
    lg: { span: 12 },
  },
};

class CollegeListItemInfo extends PureComponent {
  handleDelete = () => {
    const { dispatch, collegeItem } = this.props;

    dispatch({
      type: 'school/removeCollegeItem',
      payload: {
        collegeId: collegeItem.id,
      },
    });
  };

  render() {
    const { form, collegeItem } = this.props;

    return (
      <Card
        title="学院简介"
        extra={
          <div>
            <Button size="small" shape="circle-outline" icon="close" onClick={this.handleDelete} />
          </div>
        }
      >
        <FormPlus form={form} formId={collegeItem.id} layoutConfig={layout}>
          <Input label="College Name" formName="name" required maxLength={20} />
          <Input label="Principal" formName="principal" />
          <DatePicker label="Founding Year" formName="foundingTime" required />
          <InputNumber label="Profession Amount" formName="professionAmount" required />
        </FormPlus>
      </Card>
    );
  }
}

const WrappedForm = Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating, collegeItem } = props;

    if (shouldUpdateStore(validating, changedFields)) {
      dispatch({
        type: 'school/updateCollegeItem',
        payload: {
          collegeId: collegeItem.id,
          changedFields,
        },
      });
    }
  },
  mapPropsToFields(props) {
    const { collegeItem } = props;

    return mapObjectToFields(collegeItem, {
      name: (value: string | object) => value,
      foundingTime: (value: string | object) => (value ? moment(value) : null),
      principal: (value: string | object) => value,
      professionAmount: (value: string | object) => value,
    });
  },
})(CollegeListItemInfo);

export default connect(({ form }) => ({
  validating: form.validating,
}))(WrappedForm);
