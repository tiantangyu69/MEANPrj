/**
 * Created by LIZHITAO on 2014/11/25.
 */
var crypto = require('crypto');

var CryptoUtil = function(){};

/**
 * 使用MD5对字符串进行加密
 * @param str 需要加密的字符串
 * @returns {*} 加密后的字符串
 */
CryptoUtil.md5 = function(str){
    var md5 = crypto.createHash('md5');
    md5.update(str);
    var encode = md5.digest('hex');
    return encode;
}

/**
 * 使用sha1对字符串进行加密
 * @param str 需要加密的字符串
 * @returns {*} 加密后的字符串
 */
CryptoUtil.sha1 = function(str){
    var shasum = crypto.createHash('sha1');
    shasum.update(str);
    var encode = shasum.digest('hex');
    return encode;
};

module.exports = CryptoUtil;
