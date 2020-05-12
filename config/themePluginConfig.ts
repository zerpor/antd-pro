export default {
  theme: [
    {
      fileName: 'dark.css',
      key: 'dark',
      modifyVars: {
        '@primary-color': '#fa8c16', // 全局主色
        '@link-color': '#fa8c16', // 链接色
        '@success-color': '#fa8c16', // 成功色
        '@warning-color': '#fa8c16', // 警告色
        '@error-color': '#fa8c16', // 错误色
        '@heading-color': '#ffffff', // 标题色
        '@text-color': '#ffffff', // 主文本色
        '@text-color-secondary': '#ffffff', // 次文本色
        '@disabled-color': '#ffffff', // 失效色
        '@border-color-base': '#ffffff', // 边框色
      },
    },
    {
      fileName: 'light.css',
      key: 'light',
      modifyVars: {
        '@primary-color': '#1890ff', // 全局主色
        '@link-color': '#1890ff', // 链接色
        '@success-color': '#1890ff', // 成功色
        '@warning-color': '#1890ff', // 警告色
        '@error-color': '#1890ff', // 错误色
        '@heading-color': '#000000', // 标题色
        '@text-color': '#000000', // 主文本色
        '@text-color-secondary': '#000000', // 次文本色
        '@disabled-color': '#000000', // 失效色
        '@border-color-base': '#000000', // 边框色
      },
    },
  ],
  // 是否压缩css
  min: true,
  // css module
  isModule: true,
  // 忽略 antd 的依赖
  ignoreAntd: false,
  // 忽略 pro-layout
  ignoreProLayout: false,
  // 不使用缓存
  cache: true,
};
