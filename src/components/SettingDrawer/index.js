import React, { PureComponent } from 'react';
import { Drawer, Icon } from 'antd';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import ThemeColor from './ThemeColor';
import styles from './index.less';

@connect(({ settings }) => ({ settings }))
class SettingDrawer extends PureComponent {
  state = {
    collapse: false,
  };

  changeTheme = theme => {
    const { dispatch, settings } = this.props;
    const { customerTheme } = settings;
    if (customerTheme === theme) {
      return;
    }
    dispatch({
      type: 'settings/changeTheme',
      payload: { customerTheme: theme },
    });
  };

  togglerContent = () => {
    const { collapse } = this.state;
    this.setState({ collapse: !collapse });
  };

  render() {
    const { settings } = this.props;
    const { customerTheme } = settings;
    const { collapse } = this.state;
    return (
      <Drawer
        className={styles.drawer}
        visible={collapse}
        width={300}
        onClose={this.togglerContent}
        placement="right"
        handler={
          <div className={styles.handle}>
            <Icon
              type={collapse ? 'close' : 'setting'}
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            />
          </div>
        }
        onHandleClick={this.togglerContent}
        style={{
          zIndex: 999,
        }}
      >
        <div className={styles.content}>
          <ThemeColor
            title={formatMessage({ id: 'app.setting.themecolor' })}
            value={customerTheme}
            onChange={this.changeTheme}
          />
        </div>
      </Drawer>
    );
  }
}

export default SettingDrawer;
