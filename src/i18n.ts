import KiwiIntl from 'kiwi-intl';

import zhCN from './.kiwi/zh-CN';
import enUS from './.kiwi/en-US';

// NOTE: 约定从 localStorage 中去读取 siteLang
const siteLang = localStorage.getItem('siteLang') || 'zh-CN';

const kiwiIntl = KiwiIntl.init(siteLang, {
  'en-US': enUS,
  'zh-CN': zhCN,
});

export default kiwiIntl;
