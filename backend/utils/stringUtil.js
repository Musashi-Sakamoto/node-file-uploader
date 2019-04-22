const bcrypt = require('bcrypt');

const randomString = (length) => {
  var str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&=~/*-+';

  // ランダムな文字列の生成
  var result = '';
  for (let i = 0; i < length; i += 1) {
    result += str.charAt(Math.floor(Math.random() * str.length));
  }
  return result;
};

const hashString = string => bcrypt.hash(string, 12);

module.exports = {
  randomString,
  hashString
};
