import { LocalStorageEnum } from '@/enum';

export const updateTheme = theme => {
  let styleLink = document.getElementById('theme-style');
  const body = document.getElementsByTagName('body')[0];
  if (styleLink) {
    // 假如存在id为theme-style 的link标签，直接修改其href
    if (theme === 'dark') {
      styleLink.href = '/theme/dark.css'; // 切换 antd 组件主题
      body.className = 'body-wrap-dark'; // 切换自定义组件的主题
    } else {
      styleLink.href = '/theme/light.css';
      body.className = 'body-wrap-light';
    }
  } else {
    // 不存在的话，则新建一个
    styleLink = document.createElement('link');
    styleLink.type = 'text/css';
    styleLink.rel = 'stylesheet';
    styleLink.id = 'theme-style';
    if (theme === 'dark') {
      styleLink.href = '/theme/dark.css';
      body.className = 'body-wrap-dark';
    } else {
      styleLink.href = '/theme/light.css';
      body.className = 'body-wrap-light';
    }
    document.body.append(styleLink);
  }
};

/**
 *
 * @param newTheme
 */
export const initTheme = async (newTheme: string | undefined) => {
  const theme = newTheme || localStorage.getItem(LocalStorageEnum.THEME) || 'dark';
  updateTheme(theme);
  localStorage.setItem(LocalStorageEnum.THEME, theme);
};
