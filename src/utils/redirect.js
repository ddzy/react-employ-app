/**
 * 根据用户信息, 返回跳转地址
 */

export default function getRedirectPath({ type, avatar }) {

  // user.type    /boss /genius
  // user.avator  /bossinfo  /geniusinfo

  let url = (type === 'boss') ? '/boss' : '/genius';
  if (!avatar) {
    url += 'info';
  }

  return url;
}