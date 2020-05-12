import React, { PureComponent } from 'react';
import { Card, Form } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, AnyAction } from 'redux';
import FormPlus, { Input, InputNumber } from '@/components/FormPlus';
import DeleteButton from './components/DeleteButton';
import { shouldUpdateStore, mapObjectToFields } from '../utils/formUtils';
import styles from './index.less';

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
      <div className={styles.school}>
        <Card
          title="专业简介"
          bordered={false}
          extra={
            <>
              <DeleteButton clickCallback={this.handleDelete} />
            </>
          }
        >
          <FormPlus form={form} formId={professionItem.id} layoutConfig={layout}>
            <Input label="Profession Name" formName="name" required maxLength={20} />
            <InputNumber label="Duration Of Study " formName="studyDuration" required />
          </FormPlus>
        </Card>
      </div>
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
