import KiwiIntl from 'kiwi-intl';

import zhCN from './locale/zh-CN';
import enUS from './locale/en-US';

// NOTE: 约定从 localStorage 中去读取 siteLang
let siteLang = 'zh-CN';

// NOTE: 适配 nextjs
if (typeof window !== 'undefined') {
  siteLang = localStorage.getItem('siteLang') || 'zh-CN';
}

const kiwiIntl = KiwiIntl.init(siteLang, {
  'en-US': enUS,
  'zh-CN': zhCN,
});

export default kiwiIntl;
