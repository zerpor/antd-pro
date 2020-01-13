import React, { PureComponent } from 'react';
import { Form, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import lodash from 'lodash';
import Input from './FormItem/Input';
import InputNumber from './FormItem/InputNumber';
import Select from './FormItem/Select';
import Checkbox from './FormItem/Checkbox';
import DatePicker from './FormItem/DatePicker';

export const removeUndefined = obj => {
  const result = { ...obj };
  Object.keys(result).forEach(key => {
    if (result[key] === undefined) {
      delete result[key];
    }
  });
  return result;
};

interface FormProps {
  formId: string;
  layout?: string;
  dispatch: Dispatch<AnyAction>;
  form: FormComponentProps['form'];
}

class FormPlus extends PureComponent<Iprops> {
  componentDidMount = () => {
    const { formId } = this.props;
    if (formId) this.registeForm();
  };

  componentWillUnmount = () => {
    const { formId } = this.props;
    if (formId) this.unregisterForm();
  };

  registeForm = () => {
    const { dispatch, form, formId } = this.props;
    if (formId) {
      dispatch({
        type: 'form/registerForm',
        payload: {
          form,
          formId,
        },
      });
    }
  };

  unregisterForm = () => {
    const { dispatch, formId } = this.props;
    if (formId) {
      dispatch({
        type: 'form/unregisterForm',
        payload: {
          formId,
        },
      });
    }
  };

  splitProps = props => {
    const {
      formName,
      // Form.Item
      colon,
      extra,
      hasFeedback,
      help,
      htmlFor,
      label,
      labelCol,
      labelAlign,
      required,
      validateStatus,
      wrapperCol,
      // options
      getValueFromEvent,
      initialValue,
      normalize,
      preserve,
      rules,
      trigger,
      validateFirst,
      validateTrigger,
      valuePropName,
      // customer
      ...customerProps
    } = props;
    // 统一处理必填规则
    let newRules = [
      {
        required,
        message: 'Required',
      },
    ];
    if (!lodash.isEmpty(rules)) {
      newRules = [...newRules, ...rules];
    }

    const formItemProps = {
      colon,
      extra,
      hasFeedback,
      help,
      htmlFor,
      label,
      labelCol,
      labelAlign,
      validateStatus,
      wrapperCol,
    };

    const decoratorOptions = {
      getValueFromEvent,
      initialValue,
      normalize,
      preserve,
      rules: newRules,
      trigger,
      validateFirst,
      validateTrigger,
      valuePropName,
    };

    return {
      decoratorOptions: removeUndefined(decoratorOptions),
      formItemProps: removeUndefined(formItemProps),
      customerProps: removeUndefined(customerProps),
    };
  };

  renderFormItem = () => {
    const { form, layoutConfig, children } = this.props;
    let colProps = null;
    if (children === null || typeof children !== 'object') {
      return children;
    }

    return React.Children.map(children, node => {
      if (node === null || typeof node !== 'object' || !node.props) return node;
      const { formName, ...nodeProps } = node.props;
      const { formItemProps, decoratorOptions, customerProps } = this.splitProps(nodeProps);
      // 设置Col配置的值
      if (layoutConfig[formName]) {
        colProps = layoutConfig[formName];
      } else {
        colProps = layoutConfig.default;
      }

      return (
        <Col {...colProps}>
          <Form.Item {...formItemProps}>
            {form.getFieldDecorator(formName, decoratorOptions)({ ...node, props: customerProps })}
          </Form.Item>
        </Col>
      );
    });
  };

  render() {
    const { layout, layoutConfig } = this.props;
    const rowProps = layoutConfig.layout || { gutter: { xs: 8, sm: 16, md: 16 } };

    return (
      <Form layout={layout}>
        <Row {...rowProps}>{this.renderFormItem()}</Row>
      </Form>
    );
  }
}

FormPlus.defaultProps = {
  layout: 'vertical',
};

export default connect()(FormPlus);

export { Input, InputNumber, Select, Checkbox, DatePicker };
