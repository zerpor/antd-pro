import React, { PureComponent } from 'react';
import { Card, Form } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, AnyAction } from 'redux';
import FormPlus, { Input, InputNumber, DatePicker } from '@/components/FormPlus';
import DeleteButton from './components/DeleteButton';
import { shouldUpdateStore, mapObjectToFields, getFieldValue } from '../utils/formUtils';
import { rule001 } from '../validation/fieldValidation';
import { College } from '../models/school';
import styles from './index.less';

export interface IProps {
  dispatch: Dispatch<AnyAction>;
  form: FormComponentProps['form'];
  validating: boolean;
  collegeItem: College;
  foundingTime: any;
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
    const { form, collegeItem, foundingTime } = this.props;

    return (
      <div className={styles.school}>
        <Card
          title="学院简介"
          bordered={false}
          extra={
            <>
              <DeleteButton clickCallback={this.handleDelete} />
            </>
          }
        >
          <FormPlus form={form} formId={collegeItem.id} layoutConfig={layout}>
            <Input label="College Name" formName="name" required maxLength={20} />
            <Input label="Principal" formName="principal" />
            <DatePicker
              label="Founding Year"
              formName="foundingTime"
              required
              rules={[
                {
                  validator: rule001(foundingTime),
                },
              ]}
            />
            <InputNumber label="Profession Amount" formName="professionAmount" required />
          </FormPlus>
        </Card>
      </div>
    );
  }
}

const WrappedForm = Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating, collegeId } = props;

    if (shouldUpdateStore(validating, changedFields)) {
      dispatch({
        type: 'school/updateCollegeItem',
        payload: {
          collegeId,
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

export default connect(({ form, school }, { collegeId }) => ({
  validating: form.validating,
  foundingTime: getFieldValue(school?.schoolDetail?.foundingTime),
  collegeItem: school?.entities?.collegeListMap[collegeId],
}))(WrappedForm);
