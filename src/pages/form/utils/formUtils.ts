import { Form } from 'antd';
import lodash from 'lodash';

export const shouldUpdateStore = (validating: boolean = false, changedFields: any) => {
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

/** store同步fields，只处理一层数据
 * @param {} obj 数据源，changedFiled
 * @param function transfers 对数据做转换
 * @return {} 返回的数据用于接口入参
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
