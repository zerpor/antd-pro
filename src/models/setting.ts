import { Reducer } from 'redux';
import { LocalStorageEnum } from '@/enum';
import { updateTheme } from '@/utils/theme';
import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';

export interface SettingModelType {
  namespace: 'settings';
  state: DefaultSettings;
  reducers: {
    changeSetting: Reducer<DefaultSettings>;
    changeTheme: Reducer<DefaultSettings>;
  };
}

const updateColorWeak: (colorWeak: boolean) => void = colorWeak => {
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      const { colorWeak, contentWidth } = payload;

      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(!!colorWeak);
      return {
        ...state,
        ...payload,
      };
    },
    changeTheme(state = defaultSettings, { payload }) {
      const { customerTheme } = payload;
      if (customerTheme !== state.customerTheme) {
        localStorage.setItem(LocalStorageEnum.THEME, customerTheme);
        updateTheme(customerTheme);
      }

      return {
        ...state,
        ...payload,
        navTheme: customerTheme,
      };
    },
  },
};
export default SettingModel;
