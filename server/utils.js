const utility = require('utility');


/**
 * 随机数
 * @param { min: number, max: number }
 * @returns num: number
 */
function random(min, max) {
  return ~~(Math.random()*(max-min)+min);
}


/**
 * 加密
 * @param pwd: string   
 * @returns md5Pwd: string  
 */
function md5Pwd(pwd) {
  // const wordlist = [
  //   '1', '2', '3', '4', '5',
  //   '6', '7', '8', '9', '10',
  //   'a', 'b', 'c', 'd', 'e',
  //   'f', 'g', 'h', 'i', 'j',
  //   'k', 'l', 'm', 'n', 'o',
  //   'p', 'q', 'r', 's', 't',
  //   'u', 'v', 'w', 'x', 'y',
  //   'z', '0', '_', '*', '#'
  // ];

  // let save = '';
  // let i = 0;
  // while (i < random(5, 10)) {
  //   save += wordlist[random(0, wordlist.length - 1)];
  //   i ++;
  // }
  // const final = save + pwd;
  const salt = 'iloveprogrammer';
  const final = salt + pwd;

  return utility.md5(utility.md5(final));
}



module.exports = {
  md5Pwd,
  random,
};