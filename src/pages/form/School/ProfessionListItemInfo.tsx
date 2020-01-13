import React, { PureComponent } from 'react';
import { Card, Form, Button } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, AnyAction } from 'redux';
import FormPlus, { Input, InputNumber } from '@/components/FormPlus';
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

class ProfessionListItemInfo extends PureComponent {
  handleDelete = () => {
    const { dispatch, professionItem } = this.props;

    dispatch({
      type: 'school/removeProfessionItem',
      payload: {
        collegeId: professionItem.collegeId,
        professionId: professionItem.id,
      },
    });
  };

  render() {
    const { form, professionItem } = this.props;

    return (
      <Card
        title="专业简介"
        extra={
          <div>
            <Button size="small" shape="circle-outline" icon="close" onClick={this.handleDelete} />
          </div>
        }
      >
        <FormPlus form={form} formId={professionItem.id} layoutConfig={layout}>
          <Input label="Profession Name" formName="name" required maxLength={20} />
          <InputNumber label="Duration Of Study " formName="studyDuration" required />
        </FormPlus>
      </Card>
    );
  }
}

const WrappedForm = Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating, professionItem } = props;

    if (shouldUpdateStore(validating, changedFields)) {
      dispatch({
        type: 'school/updateProfessionItem',
        payload: {
          professionId: professionItem.id,
          changedFields,
        },
      });
    }
  },
  mapPropsToFields(props) {
    const { professionItem } = props;

    return mapObjectToFields(professionItem, {
      name: (value: string | object) => value,
      studyDuration: (value: string | object) => value,
    });
  },
})(ProfessionListItemInfo);

export default connect(({ form }) => ({
  validating: form.validating,
}))(WrappedForm);
