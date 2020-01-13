import { Reducer } from 'redux';
import { Effect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import lodash from 'lodash';

export interface Forms {
  [propName: string]: FormComponentProps['form'];
}

export interface FormModelState {
  formStore?: Forms;
  validating: boolean;
}

export interface FormModelType {
  namespace: 'form';
  state: FormModelState;
  effects: {
    validateFields: Effect;
  };
  reducers: {
    registerForm: Reducer<FormModelState>;
    unregisterForm: Reducer<FormModelState>;
    clearForm: Reducer<FormModelState>;
    updateValidating: Reducer<FormModelState>;
  };
}

const FormModel: FormModelType = {
  namespace: 'form',

  state: {
    formStore: null,
    validating: false,
  },

  effects: {
    *validateFields(_, { select, put, all }) {
      yield put({
        type: 'updateValidating',
        payload: true,
      });

      const { formStore } = yield select(state => state.form);
      const formArray = lodash.values(formStore).filter(item => !lodash.isEmpty(item));
      const totalErrors = [];
      const tasks = lodash.map(formArray, formItem => {
        formItem.validateFields(errors => {
          lodash.forEach(errors, value => {
            if (value.errors) {
              totalErrors.push(value.errors);
            }
          });
        });
      });

      yield all(tasks);

      yield put({
        type: 'updateValidating',
        payload: true,
      });

      return lodash.flatten(totalErrors);
    },
  },

  reducers: {
    registerForm(state, { payload }): FormModelState {
      const { formStore } = state;
      const { form, formId } = payload;
      const newFormStore = { ...formStore };
      if (!lodash.has(formStore, formId)) {
        newFormStore[formId] = form;
      }

      return {
        ...state,
        formStore: newFormStore,
      };
    },
    unregisterForm(state, { payload }): FormModelState {
      const { formStore } = state;
      const { formId } = payload;
      const newFormStore = { ...formStore };
      if (lodash.has(formStore, formId)) {
        delete newFormStore[formId];
      }

      return {
        ...state,
        formStore: newFormStore,
      };
    },
    clearForm(state): FormModelState {
      return {
        ...state,
        formStore: null,
        validating: false,
      };
    },
    updateValidating(state, { payload }): FormModelState {
      return {
        ...state,
        validating: payload,
      };
    },
  },
};

export default FormModel;
