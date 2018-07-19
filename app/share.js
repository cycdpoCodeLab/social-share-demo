// global css
import './theme/share.scss';

import 'social-share.js/dist/js/social-share.min'

socialShare('#social-share', {
  sites: ['weibo', 'wechat'],
  wechatQrcodeHelper: '',
  wechatQrcodeSize: 80,
  weiboKey: '672079998',
});