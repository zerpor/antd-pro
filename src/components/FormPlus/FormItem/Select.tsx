import React from 'react';
import { Select } from 'antd';
import lodash from 'lodash';

export interface SelectProps {
  allowClear?: boolean;
  disabled?: boolean;
  dictCode?: string;
  dictName?: string;
  showType?: string;
}

enum ShowType {
  Both = 'both',
  Code = 'code',
  Name = 'name',
}

function renderOptions(props) {
  const { item, dictCode, dictName, showType } = props;
  if (!item || !showType) return '';

  const showTypeMap = {
    [ShowType.Both]: `${item[dictCode]} - ${item[dictName]}`,
    [ShowType.Code]: item[dictCode],
    [ShowType.Name]: item[dictName],
  };

  return showTypeMap[showType];
}

class SelectPlus extends React.PureComponent<SelectProps> {
  render(): React.ReactNode {
    const { dicts, dictCode, dictName, showType, ...otherProps } = this.props;

    return (
      <Select {...otherProps}>
        {lodash.map(dicts, item => {
          const optionText = renderOptions({ item, dictCode, dictName, showType });
          return (
            <Select.Option key={item[dictCode]} value={item[dictCode]} title={optionText}>
              {optionText}
            </Select.Option>
          );
        })}
      </Select>
    );
  }
}

SelectPlus.defaultProps = {
  allowClear: true,
  showSearch: true,
  dictCode: 'dictCode',
  dictName: 'dictName',
  showType: 'name',
  dropdownMatchSelectWidth: false,
  filterOption: (input, option) =>
    String(option.props.children)
      .toLowerCase()
      .indexOf(String(input).toLowerCase()) >= 0,
};

export default SelectPlus;
