import React, { PureComponent } from 'react';
import { Card, Form } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, AnyAction } from 'redux';
import FormPlus, { Input } from '@/components/FormPlus';
import DeleteButton from './components/DeleteButton';
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

class ClassGradeListItem extends PureComponent {
  handleDelete = () => {
    const { dispatch, classItem } = this.props;

    dispatch({
      type: 'school/removeClassGradeItem',
      payload: {
        professionId: classItem.professionId,
        classId: classItem.id,
      },
    });
  };

  render() {
    const { form, classItem } = this.props;

    return (
      <Card
        title="班级简介"
        extra={
          <div>
            <DeleteButton clickCallback={this.handleDelete} />
          </div>
        }
      >
        <FormPlus form={form} formId={classItem.id} layoutConfig={layout}>
          <Input label="Class Name" formName="name" required maxLength={20} />
          <Input label="Class Teacher" formName="classTeacher" required />
        </FormPlus>
      </Card>
    );
  }
}

const WrappedForm = Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating, classId } = props;

    if (shouldUpdateStore(validating, changedFields)) {
      dispatch({
        type: 'school/updateClassGradeItem',
        payload: {
          classId,
          changedFields,
        },
      });
    }
  },
  mapPropsToFields(props) {
    const { classItem } = props;

    return mapObjectToFields(classItem, {
      name: (value: string | object) => value,
      classTeacher: (value: string | object) => value,
    });
  },
})(ClassGradeListItem);

export default connect(({ form, school }, { classId }) => ({
  validating: form.validating,
  classItem: school?.entities?.classGradeListMap[classId],
}))(WrappedForm);
