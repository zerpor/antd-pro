import { Form } from 'antd';
import lodash from 'lodash';
import { ChangeedField } from '../models/form';

/**
 * 判断是否要同步更改到store中
 * @param validating 正在执行表单校验
 * @param changedFields 当前修改的fields
 */
export const shouldUpdateStore = (
  validating: boolean = false,
  changedFields: ChangeedField,
): boolean => {
  let fields = {};
  if (changedFields) {
    fields = changedFields;
  }
  const changedFieldsEntries = lodash.values(fields);
  if (lodash.isEmpty(changedFieldsEntries)) return true;
  if (validating) {
    return (
      lodash.findIndex(
        changedFieldsEntries,
        (item: any) => Array.isArray(item.errors) && !lodash.isEmpty(item.errors) && !item.dirty,
      ) !== -1
    );
  }

  return lodash.findIndex(changedFieldsEntries, (item: any) => !item.dirty) !== -1;
};

/**
 * 把对象的值mapping到表单域
 * @param object map的对象
 * @param transfers 对象中field值的转换
 */
export const mapObjectToFields = (object, transfers = {}) => {
  const result = {};

  if (lodash.isObject(object)) {
    const newObject = {};
    Object.keys(transfers).forEach(key => {
      newObject[key] = object[key];
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(newObject)) {
      // value可以是字段值，也可以是包含了验证信息的对象
      const realValue =
        lodash.has(value, 'validating') ||
        lodash.has(value, 'dirty') ||
        lodash.has(value, 'touched')
          ? { ...value }
          : { value };

      // store数据map到form时，数据转换
      if (lodash.isFunction(transfers[key])) {
        realValue.value = transfers[key](realValue.value);
      }

      result[key] = Form.createFormField({
        ...realValue,
      });
    }
  }
  return result;
};

const hasMeta = object =>
  lodash.has(object, 'name') &&
  lodash.has(object, 'value') &&
  (lodash.has(object, 'dirty') ||
    lodash.has(object, 'touched') ||
    lodash.has(object, 'errors') ||
    lodash.has(object, 'validating'));

const cleanMeta = object => {
  lodash.forEach(object, (value, key) => {
    if (typeof value === 'object' && lodash.isArray(value)) {
      lodash.forEach(value, item => {
        cleanMeta(item);
      });
    }
    if (typeof value === 'object' && !hasMeta(value)) {
      cleanMeta(value);
    }
    if (typeof value === 'object' && hasMeta(value)) {
      object[key] = value.value;
      // if (value['_isAMomentObject']) {
      // object[key] = moment(value.value).format();
      // }
    }
  });
};

export const cleanFieldsMeta = object => {
  const copyObject = lodash.cloneDeep(object);
  cleanMeta(copyObject);
  console.log('copyObject', copyObject);

  return copyObject;
};
