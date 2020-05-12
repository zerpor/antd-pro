import React from 'react';
import { formatMessage } from 'umi/locale';
import classnames from 'classnames';

import styles from './ThemeColor.less';

const ThemeOption = ({ check, title, ...rest }) => (
  <div {...rest} className={classnames(styles.themeItem, { [styles.check]: check })}>
    <h3 className={styles.option}>{title}</h3>
  </div>
);

const ThemeColor = ({ colors, title, value, onChange }) => {
  let colorList = colors;
  if (!colors) {
    colorList = [
      {
        key: 'dark',
      },
      {
        key: 'light',
      },
    ];
  }
  return (
    <div className={styles.themeColor}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>
        {colorList.map(({ key }) => (
          <ThemeOption
            key={key}
            title={formatMessage({ id: `app.setting.themecolor.${key}` })}
            onClick={() => onChange(key)}
            check={value === key}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeColor;
