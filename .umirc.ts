import { defineConfig } from 'dumi';

export default defineConfig({
  title: '文档说明',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/react-hook-form-with-antd/' : '/',
  hash: true,
  // more config: https://d.umijs.org/config
});
